#!/bin/bash
set -e

export PATH="${SERVER_BIN_PATH}:$PATH"
DEPLOY_DIR=~/deploys
SITE_DIR=~/htdocs/betterlaspinas.org

if [ -n "$1" ]; then
  if ! [[ "$1" =~ ^[a-f0-9]{1,40}$ ]]; then
    echo "Error: Invalid commit SHA format."
    exit 1
  fi
  TARGET="$DEPLOY_DIR/$1/artifact"
else
  TARGET=$(ls -dt $DEPLOY_DIR/*/ | sed -n '2p')
  TARGET="${TARGET}artifact"
fi

if [ ! -d "$TARGET" ]; then
  echo "Error: Target directory does not exist at $TARGET"
  exit 1
fi

ln -sfn "$TARGET" "$SITE_DIR/current"
pm2 reload betterlaspinas
echo "Success: Rolled back to $TARGET"
