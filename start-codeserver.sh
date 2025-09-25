#!/bin/bash

# Code Server startup script
# This script starts Code Server with the project workspace

PROJECT_DIR="/home/zallu/Documents/projects"
CONFIG_DIR="/home/zallu/.config/code-server"
# Prefer system-installed code-server; fall back to bundled entry
BIN_DIR="/home/zallu/Documents/my-app/tools/code-server-4.104.1-linux-amd64"
BIN_PATH_SYSTEM="code-server"
BIN_PATH_BUNDLED="$BIN_DIR/bin/code-server"
USER_DATA_DIR="/home/zallu/.local/share/code-server"
EXTENSIONS_DIR="/home/zallu/.local/share/code-server/extensions"

echo "Code Server Startup Options:"
echo "1. Local installation"
echo "2. Docker container"
echo "3. Docker Compose"
echo ""

read -p "Choose option (1-3): " choice

case $choice in
  1)
    echo "Starting Code Server locally (bundled binary)..."
    echo "Access at: http://127.0.0.1:8080/code/"
    echo "Password: mypassword123"
    echo ""
    mkdir -p "$CONFIG_DIR" "$USER_DATA_DIR" "$EXTENSIONS_DIR"
    # Use bundled code-server (which has complete VS Code components)
    if [ -f "$BIN_PATH_BUNDLED" ]; then
      $BIN_PATH_BUNDLED \
        --bind-addr 127.0.0.1:8080 \
        --auth password \
        --disable-telemetry \
        --user-data-dir "$USER_DATA_DIR" \
        --extensions-dir "$EXTENSIONS_DIR" \
        --config "$CONFIG_DIR/config.yaml" \
        "$PROJECT_DIR"
    else
      # Fallback to system code-server if bundled version not found
      $BIN_PATH_SYSTEM \
        --bind-addr 127.0.0.1:8080 \
        --auth password \
        --disable-telemetry \
        --user-data-dir "$USER_DATA_DIR" \
        --extensions-dir "$EXTENSIONS_DIR" \
        --config "$CONFIG_DIR/config.yaml" \
        "$PROJECT_DIR"
    fi
    ;;
  2)
    echo "Starting Code Server with Docker..."
    docker run -it --rm \
      -p 8080:8080 \
      -v "$PROJECT_DIR:/home/coder/projects" \
      -e PASSWORD=mypassword123 \
      codercom/code-server:latest \
      --bind-addr 0.0.0.0:8080 \
      --auth password \
      --disable-telemetry \
      /home/coder/projects
    ;;
  3)
    echo "Starting Code Server with Docker Compose..."
    docker-compose up -d
    echo "Code Server started in background"
    echo "Access at: http://localhost:8080"
    echo "Password: mypassword123"
    echo "To stop: docker-compose down"
    ;;
  *)
    echo "Invalid option. Starting locally (bundled binary)..."
    mkdir -p "$CONFIG_DIR" "$USER_DATA_DIR" "$EXTENSIONS_DIR"
    # Use bundled code-server (which has complete VS Code components)
    if [ -f "$BIN_PATH_BUNDLED" ]; then
      $BIN_PATH_BUNDLED \
        --bind-addr 127.0.0.1:8080 \
        --auth password \
        --disable-telemetry \
        --user-data-dir "$USER_DATA_DIR" \
        --extensions-dir "$EXTENSIONS_DIR" \
        --config "$CONFIG_DIR/config.yaml" \
        "$PROJECT_DIR"
    else
      # Fallback to system code-server if bundled version not found
      $BIN_PATH_SYSTEM \
        --bind-addr 127.0.0.1:8080 \
        --auth password \
        --disable-telemetry \
        --user-data-dir "$USER_DATA_DIR" \
        --extensions-dir "$EXTENSIONS_DIR" \
        --config "$CONFIG_DIR/config.yaml" \
        "$PROJECT_DIR"
    fi
    ;;
esac
