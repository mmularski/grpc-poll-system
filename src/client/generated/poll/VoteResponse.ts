// Original file: ../proto/poll.proto

import type { Poll as _poll_Poll, Poll__Output as _poll_Poll__Output } from '../poll/Poll';

export interface VoteResponse {
  'success'?: (boolean);
  'poll'?: (_poll_Poll | null);
}

export interface VoteResponse__Output {
  'success': (boolean);
  'poll': (_poll_Poll__Output | null);
}
