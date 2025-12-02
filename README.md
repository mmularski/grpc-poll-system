# gRPC Poll System

A hands-on playground for learning gRPC concepts through building a real-time polling application.

## Overview

This project demonstrates core gRPC patterns:
- **Unary RPC** - CreatePoll, Vote, GetResults
- **Server Streaming** - StreamResults (real-time updates)
- **Protocol Buffers** - Type-safe API contracts
- **Cross-language communication** - Go server ↔ TypeScript client

## Tech Stack

| Component | Technology |
|-----------|------------|
| Server | Go 1.25+ with `google.golang.org/grpc` |
| Client | TypeScript with `@grpc/grpc-js` |
| Protocol | Protocol Buffers (proto3) |
| Package Manager | pnpm |

## Project Structure

```
src/
├── proto/           # Protocol Buffer definitions
│   └── poll.proto
├── server/          # Go gRPC server
│   ├── main.go
│   ├── service.go
│   ├── store.go
│   └── generated/   # Generated Go code
└── client/          # TypeScript gRPC client
    ├── main.ts
    ├── grpcClient.ts
    ├── pollService.ts
    └── generated/   # Generated TS types
```

## Quick Start

### 1. Run Server

```bash
cd src/server
go build -o server .
./server
# Server listening on :50051
```

### 2. Run Client

```bash
cd src/client
pnpm install
pnpm start
```

### Regenerating Proto Code (optional)

Generated code is already committed, but if you modify `poll.proto`:

```bash
make proto
```

## API

### PollService

| Method | Type | Description |
|--------|------|-------------|
| `CreatePoll` | Unary | Create a new poll with question and options |
| `Vote` | Unary | Cast a vote for an option |
| `GetResults` | Unary | Get current poll results |
| `StreamResults` | Server Stream | Subscribe to real-time result updates |

## Testing with grpcurl

```bash
# List services
grpcurl -plaintext localhost:50051 list

# Create poll
grpcurl -plaintext -d '{"question": "Favorite language?", "options": ["Go", "TypeScript", "Rust"]}' \
  localhost:50051 poll.PollService/CreatePoll

# Vote
grpcurl -plaintext -d '{"poll_id": "<POLL_ID>", "option_id": "<OPTION_ID>"}' \
  localhost:50051 poll.PollService/Vote

# Stream results
grpcurl -plaintext -d '{"poll_id": "<POLL_ID>"}' \
  localhost:50051 poll.PollService/StreamResults
```

## Learning Goals

- [x] Protocol Buffer schema design
- [x] Go gRPC server implementation
- [x] TypeScript gRPC client with type safety
- [x] Server streaming with pub/sub pattern
- [ ] (optional) REST vs gRPC comparison
- [ ] (optional) Load testing & benchmarking
