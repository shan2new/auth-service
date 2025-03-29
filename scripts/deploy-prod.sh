#!/bin/bash

# Variables - adjust these as needed
KEY=~/Downloads/web-app-server.pem
USER=ubuntu
HOST=3.6.126.138
REMOTE_DIR=/home/ubuntu/deploy

# Files and directories to copy
FILES="dist package.json package-lock.json .env"

echo "Deploying files to ${USER}@${HOST}:${REMOTE_DIR}..."

# Use -r for recursive copy (needed for the build directory)
scp -i "$KEY" -r $FILES ${USER}@${HOST}:${REMOTE_DIR}

if [ $? -eq 0 ]; then
  echo "Deployment complete."
else
  echo "Deployment failed."
fi