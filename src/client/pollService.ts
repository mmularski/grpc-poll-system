import type { PollServiceClient } from './generated/poll/PollService';
import type { CreatePollResponse } from './generated/poll/CreatePollResponse';
import type { VoteResponse } from './generated/poll/VoteResponse';
import type { GetResultsResponse } from './generated/poll/GetResultsResponse';

export function createPoll(
  client: PollServiceClient,
  question: string,
  options: string[]
): Promise<CreatePollResponse> {
  return new Promise((resolve, reject) => {
    client.createPoll({ question, options }, (err, response) => {
      if (err) reject(err);
      else resolve(response!);
    });
  });
}

export function vote(
  client: PollServiceClient,
  pollId: string,
  optionId: string
): Promise<VoteResponse> {
  return new Promise((resolve, reject) => {
    client.vote({ pollId, optionId }, (err, response) => {
      if (err) reject(err);
      else resolve(response!);
    });
  });
}

export function getResults(
  client: PollServiceClient,
  pollId: string
): Promise<GetResultsResponse> {
  return new Promise((resolve, reject) => {
    client.getResults({ pollId }, (err, response) => {
      if (err) reject(err);
      else resolve(response!);
    });
  });
}

export function subscribeToResults(
  client: PollServiceClient,
  pollId: string,
  onUpdate: (response: GetResultsResponse) => void,
  onError: (error: Error) => void
) {
  const call = client.streamResults({ pollId })
    .on('data', (response: GetResultsResponse) => {
      onUpdate(response);
    })
    .on('error', (err: Error) => {
      onError(err);
    })
    .on('end', () => {
      console.log('Stream ended');
    });

  return call;
};
