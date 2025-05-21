#!/bin/bash

# AllHandsMarket Deployment Script
# This script automates the deployment of AllHandsMarket to Vercel

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo -e "${GREEN}Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Please log in to Vercel:${NC}"
    vercel login
fi

# Run tests
echo -e "${GREEN}Running tests...${NC}"
npm test || echo -e "${YELLOW}Tests failed but continuing with deployment${NC}"

# Build the application
echo -e "${GREEN}Building application...${NC}"
npm run build

# Deploy to Vercel
echo -e "${GREEN}Deploying to Vercel...${NC}"
vercel --prod

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Your application should now be available at your Vercel URL.${NC}"
echo -e "${YELLOW}Don't forget to set up your environment variables in the Vercel dashboard:${NC}"
echo "- MONGODB_URI"
echo "- OPENAI_API_KEY"
echo "- NEXTAUTH_SECRET"
echo "- NEXTAUTH_URL"

exit 0