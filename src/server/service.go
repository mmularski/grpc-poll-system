package main

import (
	"context"

	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	pb "grpc-poll-system/server/generated/poll"
)

type PollServiceServer struct {
	pb.UnimplementedPollServiceServer
	store *PollStore
}

func NewPollServiceServer(store *PollStore) *PollServiceServer {
	return &PollServiceServer{store: store}
}

func (s *PollServiceServer) CreatePoll(ctx context.Context, req *pb.CreatePollRequest) (*pb.CreatePollResponse, error) {
	if req.Question == "" {
		return nil, status.Errorf(codes.InvalidArgument, "question is required")
	}

	if len(req.Options) < 1 {
		return nil, status.Errorf(codes.InvalidArgument, "at least 1 option required")
	}

	options := make([]*pb.PollOption, len(req.Options)+1)
	for i, text := range req.Options {
		options[i] = &pb.PollOption{
			Id:    uuid.New().String(),
			Text:  text,
			Votes: 0,
		}
	}

	options[len(req.Options)] = &pb.PollOption{
		Id:    uuid.New().String(),
		Text:  "Other",
		Votes: 0,
	}

	poll := &pb.Poll{
		Id:       uuid.New().String(),
		Question: req.Question,
		Options:  options,
	}

	s.store.Save(poll)

	return &pb.CreatePollResponse{Poll: poll}, nil
}

func (s *PollServiceServer) Vote(ctx context.Context, req *pb.VoteRequest) (*pb.VoteResponse, error) {
	if req.PollId == "" || req.OptionId == "" {
		return nil, status.Errorf(codes.InvalidArgument, "poll_id and option_id are required")
	}

	poll, success := s.store.Vote(req.PollId, req.OptionId)
	if poll == nil {
		return nil, status.Errorf(codes.NotFound, "poll not found")
	}
	if !success {
		return nil, status.Errorf(codes.NotFound, "option not found")
	}

	return &pb.VoteResponse{Success: true, Poll: poll}, nil
}

func (s *PollServiceServer) GetResults(ctx context.Context, req *pb.GetResultsRequest) (*pb.GetResultsResponse, error) {
	if req.PollId == "" {
		return nil, status.Errorf(codes.InvalidArgument, "poll_id is required")
	}

	poll, exists := s.store.Get(req.PollId)
	if !exists {
		return nil, status.Errorf(codes.NotFound, "poll not found")
	}

	return &pb.GetResultsResponse{Poll: poll}, nil
}

func (s *PollServiceServer) StreamResults(req *pb.StreamResultsRequest, stream pb.PollService_StreamResultsServer) error {
	if req.PollId == "" {
		return status.Errorf(codes.InvalidArgument, "poll_id is required")
	}

	poll, exists := s.store.Get(req.PollId)
	if !exists {
		return status.Errorf(codes.NotFound, "poll not found")
	}

	updateNumber := int32(0)

	if err := stream.Send(&pb.StreamResultsResponse{Poll: poll, UpdateNumber: updateNumber}); err != nil {
		return err
	}

	updateCh := s.store.Subscribe(req.PollId)
	defer s.store.Unsubscribe(req.PollId, updateCh)

	for {
		select {
		case <-stream.Context().Done():
			return nil
		case updatedPoll := <-updateCh:
			updateNumber++

			if err := stream.Send(&pb.StreamResultsResponse{Poll: updatedPoll, UpdateNumber: updateNumber}); err != nil {
				return err
			}
		}
	}
}
