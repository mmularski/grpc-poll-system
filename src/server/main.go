package main

import (
	"log"
	"net"

	"google.golang.org/grpc"

	"google.golang.org/grpc/reflection"

	pb "grpc-poll-system/server/generated/poll"
)

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()

	store := NewPollStore()
	pollService := NewPollServiceServer(store)

	pb.RegisterPollServiceServer(grpcServer, pollService)

	// Allow reflection
	reflection.Register(grpcServer)

	log.Printf("gRPC server listening on :50051")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
