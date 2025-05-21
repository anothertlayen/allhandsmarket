#!/bin/bash

# Script to set up Vercel environment variables
# This script helps you set up environment variables for your Vercel project

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

# Link to Vercel project if not already linked
if [ ! -f ".vercel/project.json" ]; then
    echo -e "${YELLOW}Linking to Vercel project...${NC}"
    vercel link
fi

echo -e "${GREEN}Setting up environment variables for Vercel...${NC}"

# Read environment variables from .env.local
if [ -f ".env.local" ]; then
    echo -e "${GREEN}Found .env.local file. Reading variables...${NC}"
    
    # MongoDB URI
    MONGODB_URI=$(grep MONGODB_URI .env.local | cut -d '=' -f2)
    if [ -n "$MONGODB_URI" ]; then
        echo -e "${GREEN}Setting MONGODB_URI...${NC}"
        vercel env add MONGODB_URI production
    else
        echo -e "${YELLOW}MONGODB_URI not found in .env.local${NC}"
        echo -e "${YELLOW}Please enter your MongoDB URI:${NC}"
        read -r MONGODB_URI
        vercel env add MONGODB_URI production
    fi
    
    # OpenAI API Key
    OPENAI_API_KEY=$(grep OPENAI_API_KEY .env.local | cut -d '=' -f2)
    if [ -n "$OPENAI_API_KEY" ]; then
        echo -e "${GREEN}Setting OPENAI_API_KEY...${NC}"
        vercel env add OPENAI_API_KEY production
    else
        echo -e "${YELLOW}OPENAI_API_KEY not found in .env.local${NC}"
        echo -e "${YELLOW}Please enter your OpenAI API Key:${NC}"
        read -r OPENAI_API_KEY
        vercel env add OPENAI_API_KEY production
    fi
    
    # NextAuth Secret
    NEXTAUTH_SECRET=$(grep NEXTAUTH_SECRET .env.local | cut -d '=' -f2)
    if [ -n "$NEXTAUTH_SECRET" ]; then
        echo -e "${GREEN}Setting NEXTAUTH_SECRET...${NC}"
        vercel env add NEXTAUTH_SECRET production
    else
        echo -e "${YELLOW}NEXTAUTH_SECRET not found in .env.local${NC}"
        echo -e "${YELLOW}Generating a random NEXTAUTH_SECRET...${NC}"
        NEXTAUTH_SECRET=$(openssl rand -base64 32)
        vercel env add NEXTAUTH_SECRET production
    fi
    
    # Ask for the production URL
    echo -e "${YELLOW}Please enter your production URL (e.g., https://your-app.vercel.app):${NC}"
    read -r NEXTAUTH_URL
    vercel env add NEXTAUTH_URL production
    
else
    echo -e "${YELLOW}.env.local file not found. Let's set up the environment variables manually.${NC}"
    
    # MongoDB URI
    echo -e "${YELLOW}Please enter your MongoDB URI:${NC}"
    read -r MONGODB_URI
    vercel env add MONGODB_URI production
    
    # OpenAI API Key
    echo -e "${YELLOW}Please enter your OpenAI API Key:${NC}"
    read -r OPENAI_API_KEY
    vercel env add OPENAI_API_KEY production
    
    # NextAuth Secret
    echo -e "${YELLOW}Generating a random NEXTAUTH_SECRET...${NC}"
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    vercel env add NEXTAUTH_SECRET production
    
    # Production URL
    echo -e "${YELLOW}Please enter your production URL (e.g., https://your-app.vercel.app):${NC}"
    read -r NEXTAUTH_URL
    vercel env add NEXTAUTH_URL production
fi

echo -e "${GREEN}Environment variables have been set up successfully!${NC}"
echo -e "${GREEN}You can now deploy your application with:${NC}"
echo -e "${YELLOW}npm run deploy${NC}"

exit 0