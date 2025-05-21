# Vercel Deployment Troubleshooting

This guide provides solutions for common issues encountered when deploying the AllHandsMarket application to Vercel.

## Common Issues and Solutions

### 1. Vercel Not Using Latest Commit

**Issue**: Vercel is not using the latest commit for deployment.

**Solutions**:

1. **Check Ignored Build Step**:
   - Go to the Vercel project settings
   - Navigate to the "Git" tab
   - Under "Ignored Build Step", make sure it's set to `node -e "process.exit(0)"`

2. **Force a New Deployment**:
   - Use the `npm run deploy:force` command to trigger a new deployment
   - This will create a dummy commit and push it to the repository
   - Vercel should detect the new commit and trigger a deployment

3. **Use Deploy Hook**:
   - Create a Deploy Hook in the Vercel dashboard
   - Update the `vercel-deploy-hook.js` file with your Deploy Hook URL
   - Run `npm run deploy:hook` to trigger a deployment

### 2. Build Fails with TypeScript or ESLint Errors

**Issue**: The build fails with TypeScript or ESLint errors.

**Solutions**:

1. **Update Environment Variables**:
   - Make sure the `NEXT_PUBLIC_SKIP_TYPE_CHECK` and `NEXT_PUBLIC_SKIP_LINT` environment variables are set to "true"
   - These can be set in the Vercel dashboard under "Environment Variables"

2. **Use Custom Build Command**:
   - In the Vercel dashboard, go to "Settings" > "General"
   - Under "Build & Development Settings", set the build command to `npm run vercel-build`

3. **Update vercel.json**:
   - Make sure the `vercel.json` file is properly configured
   - It should include the `buildCommand` set to `npm run vercel-build`
   - It should also include the `ignoreCommand` set to `node -e "process.exit(0)"`

### 3. Missing Environment Variables

**Issue**: The application fails to run due to missing environment variables.

**Solutions**:

1. **Check Environment Variables**:
   - Go to the Vercel dashboard
   - Navigate to "Settings" > "Environment Variables"
   - Make sure all required environment variables are set:
     - `MONGODB_URI`
     - `OPENAI_API_KEY`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`
     - `NEXT_PUBLIC_SKIP_TYPE_CHECK`
     - `NEXT_PUBLIC_SKIP_LINT`

2. **Use Setup Script**:
   - Run `npm run setup:env` to set up the environment variables
   - This will create a `.env.local` file with the required environment variables
   - You can then copy these values to the Vercel dashboard

### 4. Database Connection Issues

**Issue**: The application fails to connect to the MongoDB database.

**Solutions**:

1. **Check MongoDB URI**:
   - Make sure the `MONGODB_URI` environment variable is set correctly
   - It should be in the format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`

2. **Check Network Access**:
   - In the MongoDB Atlas dashboard, go to "Network Access"
   - Make sure the IP address of the Vercel deployment is allowed
   - You can add `0.0.0.0/0` to allow access from anywhere (not recommended for production)

3. **Check Database User**:
   - In the MongoDB Atlas dashboard, go to "Database Access"
   - Make sure the user has the correct permissions
   - The user should have read and write access to the database

### 5. OpenAI API Issues

**Issue**: The application fails to connect to the OpenAI API.

**Solutions**:

1. **Check OpenAI API Key**:
   - Make sure the `OPENAI_API_KEY` environment variable is set correctly
   - It should start with `sk-`

2. **Check OpenAI API Usage**:
   - Go to the OpenAI dashboard
   - Check your API usage and make sure you have enough credits
   - If you're on a free tier, you may have limited usage

3. **Check OpenAI API Status**:
   - Go to the OpenAI status page: https://status.openai.com/
   - Check if there are any ongoing issues with the API

## Advanced Troubleshooting

### Debugging Vercel Builds

To debug Vercel builds, you can use the following steps:

1. **Enable Debug Mode**:
   - In the Vercel dashboard, go to "Settings" > "General"
   - Under "Build & Development Settings", enable "Debug"
   - This will provide more detailed logs during the build process

2. **Check Build Logs**:
   - In the Vercel dashboard, go to "Deployments"
   - Click on the deployment you want to debug
   - Click on "View Build Logs"
   - Look for any errors or warnings

3. **Local Testing**:
   - Run `npm run build` locally to see if the build succeeds
   - If it fails, fix the issues locally before deploying to Vercel

### Contacting Vercel Support

If you've tried all the troubleshooting steps and still can't resolve the issue, you can contact Vercel support:

1. Go to the Vercel dashboard
2. Click on your profile picture in the top-right corner
3. Select "Help & Support"
4. Click on "Contact Support"
5. Fill out the form with details about your issue