# Vercel Deployment Guide

This guide provides detailed instructions for deploying the AllHandsMarket application to Vercel.

## Prerequisites

1. A Vercel account
2. A GitHub account with access to the repository
3. MongoDB Atlas account for database hosting
4. OpenAI API key for LLM chat functionality

## Deployment Steps

### 1. Connect to GitHub Repository

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Select the GitHub repository "anothertlayen/allhandsmarket"
4. Click "Import"

### 2. Configure Project Settings

1. **Project Name**: Enter a name for your project (e.g., "allhandsmarket")
2. **Framework Preset**: Select "Next.js"
3. **Root Directory**: Leave as default (/)
4. **Build Command**: Override with `npm run vercel-build`
5. **Output Directory**: Leave as default (.next)
6. **Install Command**: Leave as default (npm install)

### 3. Environment Variables

Add the following environment variables:

- `MONGODB_URI`: Your MongoDB connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `NEXTAUTH_SECRET`: A secure random string (generated with crypto.randomBytes)
- `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://allhandsmarket.vercel.app)
- `NEXT_PUBLIC_SKIP_TYPE_CHECK`: Set to "true"
- `NEXT_PUBLIC_SKIP_LINT`: Set to "true"

### 4. Deploy

1. Click "Deploy"
2. Wait for the deployment to complete

## Troubleshooting

### Deployment Fails with TypeScript or ESLint Errors

If the deployment fails with TypeScript or ESLint errors, try the following:

1. Make sure the `NEXT_PUBLIC_SKIP_TYPE_CHECK` and `NEXT_PUBLIC_SKIP_LINT` environment variables are set to "true"
2. Check that the build command is set to `npm run vercel-build`
3. Verify that the `vercel.json` file is properly configured
4. Try redeploying by pushing a new commit to the repository

### Vercel Not Using Latest Commit

If Vercel is not using the latest commit for deployment:

1. Go to the Vercel project settings
2. Navigate to the "Git" tab
3. Under "Ignored Build Step", make sure it's set to "node -e \"process.exit(0)\""
4. Try redeploying by pushing a new commit to the repository

### Force a New Deployment

To force a new deployment:

1. Create a new file or update an existing file in the repository
2. Commit and push the changes to the repository
3. Go to the Vercel project dashboard
4. Click on the "Deployments" tab
5. Click on the "..." menu next to the latest deployment
6. Select "Redeploy" from the dropdown menu

## Next Steps After Deployment

1. Set up your MongoDB database with initial data
2. Test the application functionality
3. Set up a custom domain (optional)
4. Configure analytics and monitoring (optional)