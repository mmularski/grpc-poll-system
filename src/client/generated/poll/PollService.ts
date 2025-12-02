// Original file: ../proto/poll.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreatePollRequest as _poll_CreatePollRequest, CreatePollRequest__Output as _poll_CreatePollRequest__Output } from '../poll/CreatePollRequest';
import type { CreatePollResponse as _poll_CreatePollResponse, CreatePollResponse__Output as _poll_CreatePollResponse__Output } from '../poll/CreatePollResponse';
import type { GetResultsRequest as _poll_GetResultsRequest, GetResultsRequest__Output as _poll_GetResultsRequest__Output } from '../poll/GetResultsRequest';
import type { GetResultsResponse as _poll_GetResultsResponse, GetResultsResponse__Output as _poll_GetResultsResponse__Output } from '../poll/GetResultsResponse';
import type { StreamResultsRequest as _poll_StreamResultsRequest, StreamResultsRequest__Output as _poll_StreamResultsRequest__Output } from '../poll/StreamResultsRequest';
import type { StreamResultsResponse as _poll_StreamResultsResponse, StreamResultsResponse__Output as _poll_StreamResultsResponse__Output } from '../poll/StreamResultsResponse';
import type { VoteRequest as _poll_VoteRequest, VoteRequest__Output as _poll_VoteRequest__Output } from '../poll/VoteRequest';
import type { VoteResponse as _poll_VoteResponse, VoteResponse__Output as _poll_VoteResponse__Output } from '../poll/VoteResponse';

export interface PollServiceClient extends grpc.Client {
  CreatePoll(argument: _poll_CreatePollRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  CreatePoll(argument: _poll_CreatePollRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  CreatePoll(argument: _poll_CreatePollRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  CreatePoll(argument: _poll_CreatePollRequest, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  createPoll(argument: _poll_CreatePollRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  createPoll(argument: _poll_CreatePollRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  createPoll(argument: _poll_CreatePollRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  createPoll(argument: _poll_CreatePollRequest, callback: grpc.requestCallback<_poll_CreatePollResponse__Output>): grpc.ClientUnaryCall;
  
  GetResults(argument: _poll_GetResultsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  GetResults(argument: _poll_GetResultsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  GetResults(argument: _poll_GetResultsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  GetResults(argument: _poll_GetResultsRequest, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  getResults(argument: _poll_GetResultsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  getResults(argument: _poll_GetResultsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  getResults(argument: _poll_GetResultsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  getResults(argument: _poll_GetResultsRequest, callback: grpc.requestCallback<_poll_GetResultsResponse__Output>): grpc.ClientUnaryCall;
  
  StreamResults(argument: _poll_StreamResultsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_poll_StreamResultsResponse__Output>;
  StreamResults(argument: _poll_StreamResultsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_poll_StreamResultsResponse__Output>;
  streamResults(argument: _poll_StreamResultsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_poll_StreamResultsResponse__Output>;
  streamResults(argument: _poll_StreamResultsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_poll_StreamResultsResponse__Output>;
  
  Vote(argument: _poll_VoteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  Vote(argument: _poll_VoteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  Vote(argument: _poll_VoteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  Vote(argument: _poll_VoteRequest, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  vote(argument: _poll_VoteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  vote(argument: _poll_VoteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  vote(argument: _poll_VoteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  vote(argument: _poll_VoteRequest, callback: grpc.requestCallback<_poll_VoteResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PollServiceHandlers extends grpc.UntypedServiceImplementation {
  CreatePoll: grpc.handleUnaryCall<_poll_CreatePollRequest__Output, _poll_CreatePollResponse>;
  
  GetResults: grpc.handleUnaryCall<_poll_GetResultsRequest__Output, _poll_GetResultsResponse>;
  
  StreamResults: grpc.handleServerStreamingCall<_poll_StreamResultsRequest__Output, _poll_StreamResultsResponse>;
  
  Vote: grpc.handleUnaryCall<_poll_VoteRequest__Output, _poll_VoteResponse>;
  
}

export interface PollServiceDefinition extends grpc.ServiceDefinition {
  CreatePoll: MethodDefinition<_poll_CreatePollRequest, _poll_CreatePollResponse, _poll_CreatePollRequest__Output, _poll_CreatePollResponse__Output>
  GetResults: MethodDefinition<_poll_GetResultsRequest, _poll_GetResultsResponse, _poll_GetResultsRequest__Output, _poll_GetResultsResponse__Output>
  StreamResults: MethodDefinition<_poll_StreamResultsRequest, _poll_StreamResultsResponse, _poll_StreamResultsRequest__Output, _poll_StreamResultsResponse__Output>
  Vote: MethodDefinition<_poll_VoteRequest, _poll_VoteResponse, _poll_VoteRequest__Output, _poll_VoteResponse__Output>
}
