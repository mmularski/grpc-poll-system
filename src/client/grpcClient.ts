import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import type { ProtoGrpcType } from './generated/poll';
import type { PollServiceClient } from './generated/poll/PollService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROTO_PATH = join(__dirname, '../proto/poll.proto');

export default function grpcClient(): PollServiceClient & Disposable {
  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const pollProto = loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

  const client: PollServiceClient = new pollProto.poll.PollService(
    'localhost:50051',
    credentials.createInsecure(),
  );

  return Object.assign(client, {
    [Symbol.dispose]() {
      client.close();
      console.log('gRPC Client disconnected');
    }
  });
}
