# Deploying AllHandsMarket to Vercel

This guide provides instructions for deploying the AllHandsMarket application to Vercel, both manually and through automated CI/CD.

## Manual Deployment

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database
3. An [OpenAI](https://platform.openai.com) account for the LLM chat functionality

### Steps for Manual Deployment

1. **Push your code to GitHub**:
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: .next

3. **Configure Environment Variables**:
   In the Vercel project settings, add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXTAUTH_SECRET`: A random string for NextAuth.js (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

## Automated Deployment with GitHub Actions

You can automate deployments using GitHub Actions and the Vercel GitHub Integration.

### Setup Vercel GitHub Integration

1. Go to your Vercel dashboard
2. Navigate to your team settings (or personal account settings)
3. Select "Integrations" > "GitHub" > "Add"
4. Authorize Vercel to access your GitHub repositories

### Create GitHub Actions Workflow

Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          vercel-args: '--prod'
```

### Set up GitHub Secrets

In your GitHub repository:
1. Go to Settings > Secrets and variables > Actions
2. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel API token (get from Vercel account settings)
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

You can get the `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` by running:
```bash
npx vercel link
```

## Using Our Deployment Scripts

We've created several scripts to make deployment easier:

1. **Set up environment variables**:
   ```bash
   npm run setup:env
   ```
   This script will guide you through setting up all required environment variables in Vercel.

2. **Deploy to production**:
   ```bash
   npm run deploy
   ```
   This script runs tests, builds the application, and deploys to Vercel production.

3. **Deploy a preview**:
   ```bash
   npm run deploy:preview
   ```
   This creates a preview deployment without affecting production.

## Using Vercel CLI Directly

You can also use the Vercel CLI for deployment:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Automating Deployments with Vercel Git Integration

The simplest way to automate deployments is to use Vercel's built-in Git integration:

1. Connect your GitHub repository to Vercel as described in the manual deployment section
2. Vercel will automatically deploy:
   - Production deployments when you push to the main branch
   - Preview deployments for pull requests
   - You can configure this behavior in your Vercel project settings

## Monitoring and Logs

After deployment:
1. Monitor your application in the Vercel dashboard
2. Check deployment logs for any issues
3. Set up monitoring and analytics in Vercel's "Analytics" tab

## Database Considerations

1. Ensure your MongoDB Atlas cluster is properly configured:
   - IP whitelist is set to allow connections from anywhere (0.0.0.0/0)
   - Database user has appropriate permissions
   - Connection string includes database name

2. For production, consider:
   - Setting up a dedicated MongoDB Atlas cluster
   - Configuring backups
   - Setting up monitoring and alerts

## Custom Domain Setup

1. In your Vercel project, go to "Settings" > "Domains"
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Vercel will automatically provision an SSL certificate

## Troubleshooting

If you encounter deployment issues:

1. Check the build logs in Vercel
2. Verify environment variables are correctly set
3. Ensure your MongoDB connection is working
4. Check for any Next.js build errors
5. Verify your OpenAI API key is valid

For more help, refer to [Vercel documentation](https://vercel.com/docs) or [contact Vercel support](https://vercel.com/support).