.PHONY: proto server client install install-go install-node clean help

# Directories
PROTO_DIR := src/proto
SERVER_DIR := src/server
CLIENT_DIR := src/client
GENERATED_DIR := $(SERVER_DIR)/generated/poll

# Proto generation
proto:
	@echo "Generating Go code from proto files..."
	@mkdir -p $(GENERATED_DIR)
	protoc --go_out=$(GENERATED_DIR) --go_opt=paths=source_relative \
	       --go-grpc_out=$(GENERATED_DIR) --go-grpc_opt=paths=source_relative \
	       -I=$(PROTO_DIR) $(PROTO_DIR)/*.proto
	@echo "Done!"

# Run server
server:
	@echo "Starting gRPC server..."
	cd $(SERVER_DIR) && go run .

# Run client
client:
	@echo "Running gRPC client..."
	cd $(CLIENT_DIR) && node grpc-client.js

# Install all dependencies
install: install-go install-node

install-go:
	@echo "Installing Go dependencies..."
	cd $(SERVER_DIR) && go mod tidy

install-node:
	@echo "Installing Node.js dependencies..."
	cd $(CLIENT_DIR) && pnpm install

# Clean generated files
clean:
	@echo "Cleaning generated files..."
	rm -rf $(GENERATED_DIR)/*

# Help
help:
	@echo "Available targets:"
	@echo "  make proto       - Generate Go code from .proto files"
	@echo "  make server      - Run the gRPC server"
	@echo "  make client      - Run the gRPC client"
	@echo "  make install     - Install all dependencies"
	@echo "  make install-go  - Install Go dependencies"
	@echo "  make install-node - Install Node.js dependencies"
	@echo "  make clean       - Remove generated files"
	@echo "  make help        - Show this help"
