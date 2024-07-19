#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_DIR="$ROOT_DIR/web"
ADDR="${1:-}"
if [[ -z "$ADDR" ]]; then
  echo "Usage: $0 <factory_address>" >&2
  exit 1
fi
mkdir -p "$WEB_DIR"
ENV_FILE="$WEB_DIR/.env.local"
touch "$ENV_FILE"
grep -q '^NEXT_PUBLIC_FACTORY_ADDRESS=' "$ENV_FILE" && \
  sed -i '' "s#^NEXT_PUBLIC_FACTORY_ADDRESS=.*#NEXT_PUBLIC_FACTORY_ADDRESS=$ADDR#" "$ENV_FILE" || \
  echo "NEXT_PUBLIC_FACTORY_ADDRESS=$ADDR" >> "$ENV_FILE"
echo "Wrote NEXT_PUBLIC_FACTORY_ADDRESS to $ENV_FILE"


