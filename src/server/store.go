package main

import (
	"sync"

	pb "grpc-poll-system/server/generated/poll"
)

type PollStore struct {
	mu    sync.RWMutex
	polls map[string]*pb.Poll

	subsMu sync.RWMutex
	subs   map[string][]chan *pb.Poll
}

func NewPollStore() *PollStore {
	return &PollStore{
		polls: make(map[string]*pb.Poll),
		subs:  make(map[string][]chan *pb.Poll),
	}
}

func (s *PollStore) Subscribe(pollId string) chan *pb.Poll {
	s.subsMu.Lock()
	defer s.subsMu.Unlock()

	ch := make(chan *pb.Poll, 10)
	s.subs[pollId] = append(s.subs[pollId], ch)

	return ch
}

func (s *PollStore) Unsubscribe(pollId string, ch chan *pb.Poll) {
	s.subsMu.Lock()
	defer s.subsMu.Unlock()

	channels := s.subs[pollId]
	for i, c := range channels {
		if c == ch {
			s.subs[pollId] = append(channels[:i], channels[i+1:]...)
			close(ch)
			return
		}
	}
}

func (s *PollStore) notifySubscribers(poll *pb.Poll) {
	s.subsMu.RLock()
	defer s.subsMu.RUnlock()

	for _, ch := range s.subs[poll.Id] {
		select {
		case ch <- poll:
		default:
		}
	}
}

func (s *PollStore) Save(poll *pb.Poll) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.polls[poll.Id] = poll
}

func (s *PollStore) Get(id string) (*pb.Poll, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	poll, exists := s.polls[id]

	return poll, exists
}

func (s *PollStore) Vote(pollId, optionId string) (*pb.Poll, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	poll, exists := s.polls[pollId]
	if !exists {
		return nil, false
	}

	for _, option := range poll.Options {
		if option.Id == optionId {
			option.Votes++
			s.notifySubscribers(poll)
			return poll, true
		}
	}

	return nil, false
}
