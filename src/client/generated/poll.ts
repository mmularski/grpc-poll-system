import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CreatePollRequest as _poll_CreatePollRequest, CreatePollRequest__Output as _poll_CreatePollRequest__Output } from './poll/CreatePollRequest';
import type { CreatePollResponse as _poll_CreatePollResponse, CreatePollResponse__Output as _poll_CreatePollResponse__Output } from './poll/CreatePollResponse';
import type { GetResultsRequest as _poll_GetResultsRequest, GetResultsRequest__Output as _poll_GetResultsRequest__Output } from './poll/GetResultsRequest';
import type { GetResultsResponse as _poll_GetResultsResponse, GetResultsResponse__Output as _poll_GetResultsResponse__Output } from './poll/GetResultsResponse';
import type { Poll as _poll_Poll, Poll__Output as _poll_Poll__Output } from './poll/Poll';
import type { PollOption as _poll_PollOption, PollOption__Output as _poll_PollOption__Output } from './poll/PollOption';
import type { PollServiceClient as _poll_PollServiceClient, PollServiceDefinition as _poll_PollServiceDefinition } from './poll/PollService';
import type { StreamResultsRequest as _poll_StreamResultsRequest, StreamResultsRequest__Output as _poll_StreamResultsRequest__Output } from './poll/StreamResultsRequest';
import type { StreamResultsResponse as _poll_StreamResultsResponse, StreamResultsResponse__Output as _poll_StreamResultsResponse__Output } from './poll/StreamResultsResponse';
import type { VoteRequest as _poll_VoteRequest, VoteRequest__Output as _poll_VoteRequest__Output } from './poll/VoteRequest';
import type { VoteResponse as _poll_VoteResponse, VoteResponse__Output as _poll_VoteResponse__Output } from './poll/VoteResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  poll: {
    CreatePollRequest: MessageTypeDefinition<_poll_CreatePollRequest, _poll_CreatePollRequest__Output>
    CreatePollResponse: MessageTypeDefinition<_poll_CreatePollResponse, _poll_CreatePollResponse__Output>
    GetResultsRequest: MessageTypeDefinition<_poll_GetResultsRequest, _poll_GetResultsRequest__Output>
    GetResultsResponse: MessageTypeDefinition<_poll_GetResultsResponse, _poll_GetResultsResponse__Output>
    Poll: MessageTypeDefinition<_poll_Poll, _poll_Poll__Output>
    PollOption: MessageTypeDefinition<_poll_PollOption, _poll_PollOption__Output>
    PollService: SubtypeConstructor<typeof grpc.Client, _poll_PollServiceClient> & { service: _poll_PollServiceDefinition }
    StreamResultsRequest: MessageTypeDefinition<_poll_StreamResultsRequest, _poll_StreamResultsRequest__Output>
    StreamResultsResponse: MessageTypeDefinition<_poll_StreamResultsResponse, _poll_StreamResultsResponse__Output>
    VoteRequest: MessageTypeDefinition<_poll_VoteRequest, _poll_VoteRequest__Output>
    VoteResponse: MessageTypeDefinition<_poll_VoteResponse, _poll_VoteResponse__Output>
  }
}

