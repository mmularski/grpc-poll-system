// Original file: ../proto/poll.proto

import type { PollOption as _poll_PollOption, PollOption__Output as _poll_PollOption__Output } from '../poll/PollOption';

export interface Poll {
  'id'?: (string);
  'question'?: (string);
  'options'?: (_poll_PollOption)[];
}

export interface Poll__Output {
  'id': (string);
  'question': (string);
  'options': (_poll_PollOption__Output)[];
}
