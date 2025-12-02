// Original file: ../proto/poll.proto

import type { Poll as _poll_Poll, Poll__Output as _poll_Poll__Output } from '../poll/Poll';

export interface StreamResultsResponse {
  'poll'?: (_poll_Poll | null);
  'updateNumber'?: (number);
}

export interface StreamResultsResponse__Output {
  'poll': (_poll_Poll__Output | null);
  'updateNumber': (number);
}
