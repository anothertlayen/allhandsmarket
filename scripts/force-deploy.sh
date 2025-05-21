#!/bin/bash

# This script forces a deployment on Vercel by creating a dummy commit
# Usage: ./scripts/force-deploy.sh "Your commit message"

# Check if a commit message was provided
if [ -z "$1" ]; then
  COMMIT_MESSAGE="Force deployment: $(date)"
else
  COMMIT_MESSAGE="$1"
fi

# Create a dummy change to trigger deployment
echo "// Last updated: $(date)" > .vercel-trigger
git add .vercel-trigger
git commit -m "$COMMIT_MESSAGE"
git push origin $(git branch --show-current)

echo "Deployment triggered with commit: $COMMIT_MESSAGE"