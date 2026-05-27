#!/bin/bash
set -e

# Resolve the project root from this script location so startup works from any directory.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

# Console colors for readable startup messages without printing secrets.
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m"

log_info() {
  echo -e "${BLUE}[info]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[ok]${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}[warn]${NC} $1"
}

log_error() {
  echo -e "${RED}[error]${NC} $1"
}

# Ensure runtime directories exist before processes write logs.
RUNTIME_DIR="$ROOT_DIR/runtime"
LOG_DIR="$RUNTIME_DIR/logs"
mkdir -p "$LOG_DIR"

BACKEND_LOG="$LOG_DIR/backend.log"
FRONTEND_LOG="$LOG_DIR/frontend.log"
BACKEND_DIR="$ROOT_DIR/Propease-BE"
FRONTEND_DIR="$ROOT_DIR/propease-FE"

# Verify required system commands before starting either service.
for command in java mvn node npm lsof; do
  if ! command -v "$command" >/dev/null 2>&1; then
    log_error "Missing required command: $command"
    exit 1
  fi
done

# Load environment variables from the root .env without echoing values.
if [ ! -f "$ROOT_DIR/.env" ]; then
  log_error "Missing .env at project root. Copy .env.example to .env and fill in local values."
  exit 1
fi

set -a
source .env
set +a

# Resolve local URLs
BACKEND_URL="http://localhost:${SERVER_PORT}"
FRONTEND_URL="http://localhost:${FRONTEND_PORT}"

# Validate required environment variable names without logging their values.
REQUIRED_ENV_VARS=(
  SPRING_APPLICATION_NAME
  SERVER_PORT
  CORS_ALLOWED_ORIGINS
  SPRING_DATASOURCE_DRIVER_CLASS_NAME
  SPRING_DATASOURCE_URL
  SPRING_DATASOURCE_USERNAME
  SPRING_DATASOURCE_PASSWORD
  SPRING_JPA_HIBERNATE_DDL_AUTO
  SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE
  SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE
  FRONTEND_PORT
  REACT_APP_API_BASE_URL
  REACT_APP_ENABLE_PAYMENTS
  REACT_APP_MAP_TILE_URL
  REACT_APP_WHATSAPP_BASE_URL
  REACT_APP_PROPERTY_PLACEHOLDER_IMAGE_URL
  REACT_APP_PROFILE_AVATAR_URL
  REACT_APP_FONT_CSS_URL
  REACT_APP_BOOTSTRAP_CSS_URL
  REACT_APP_BOOTSTRAP_JS_URL
)

for var_name in "${REQUIRED_ENV_VARS[@]}"; do
  if [ -z "${!var_name}" ]; then
    log_error "Missing required environment variable: $var_name"
    exit 1
  fi
done

# Kill any existing processes using backend/frontend ports.
clear_port() {
  local port=$1
  local service_name=$2

  PID=$(lsof -ti tcp:"$port" || true)

  if [ -n "$PID" ]; then
    log_warn "$service_name port $port is in use. Killing process..."
    kill -9 $PID >/dev/null 2>&1 || true
    log_success "Cleared port $port"
  else
    log_info "$service_name port $port is free."
  fi
}

clear_port "$SERVER_PORT" "Backend"
clear_port "$FRONTEND_PORT" "Frontend"

# Install frontend dependencies automatically if node_modules is missing.
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  log_warn "Frontend dependencies not found. Running npm install..."

  (
    cd "$FRONTEND_DIR"
    npm install
  )

  log_success "Frontend dependencies installed successfully."
fi

BACKEND_PID=""
FRONTEND_PID=""

# Stop all child processes cleanly when the user presses Ctrl+C or the script exits.
cleanup() {
  trap - INT TERM EXIT
  log_warn "Stopping services..."

  if [ -n "$BACKEND_PID" ]; then
    kill "$BACKEND_PID" >/dev/null 2>&1 || true
  fi

  if [ -n "$FRONTEND_PID" ]; then
    kill "$FRONTEND_PID" >/dev/null 2>&1 || true
  fi

  wait "$BACKEND_PID" >/dev/null 2>&1 || true
  wait "$FRONTEND_PID" >/dev/null 2>&1 || true

  log_success "All services stopped."
}

trap cleanup INT TERM EXIT

# Start backend in the background and write only process logs to runtime/logs/backend.log.
log_info "Starting backend on configured SERVER_PORT..."
(
  cd "$BACKEND_DIR"
  mvn spring-boot:run
) >"$BACKEND_LOG" 2>&1 &
BACKEND_PID=$!

# Start frontend in the background and write only process logs to runtime/logs/frontend.log.
log_info "Starting frontend on configured FRONTEND_PORT..."
(
  cd "$FRONTEND_DIR"
  BROWSER=none PORT="$FRONTEND_PORT" npm start
) >"$FRONTEND_LOG" 2>&1 &
FRONTEND_PID=$!

log_success "Backend PID: $BACKEND_PID"
log_success "Frontend PID: $FRONTEND_PID"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Propease Development Environment${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Frontend:${NC} $FRONTEND_URL"
echo -e "${BLUE}Backend:${NC}  $BACKEND_URL"
echo ""
echo -e "${BLUE}Frontend Logs:${NC} $FRONTEND_LOG"
echo -e "${BLUE}Backend Logs:${NC}  $BACKEND_LOG"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both services.${NC}"
echo ""

# Monitor both processes and stop the remaining service if either one exits.
while true; do
  if ! kill -0 "$BACKEND_PID" >/dev/null 2>&1; then
    log_error "Backend process exited. Check $BACKEND_LOG"
    exit 1
  fi

  if ! kill -0 "$FRONTEND_PID" >/dev/null 2>&1; then
    log_error "Frontend process exited. Check $FRONTEND_LOG"
    exit 1
  fi

  sleep 2
done