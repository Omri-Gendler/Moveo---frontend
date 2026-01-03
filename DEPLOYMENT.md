# Render.com Deployment Guide

## Overview
This project is configured to deploy to Render.com with separate Production and Development environments.

## Prerequisites
1. GitHub/GitLab repository with your code
2. Render.com account (free tier available)
3. Push your code to your repository

## Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push
   ```

2. **Connect to Render**
   - Go to https://dashboard.render.com
   - Click "New" → "Blueprint"
   - Connect your GitHub/GitLab repository
   - Select the repository containing this project
   - Render will automatically detect the `render.yaml` file
   - Click "Apply" to create both environments

### Option 2: Manual Setup

#### Production Environment
1. Go to Render Dashboard
2. Click "New" → "Static Site"
3. Configure:
   - **Name**: `moveo-frontend-prod`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `VITE_API_URL`: `https://your-production-api.onrender.com`

#### Development Environment
1. Repeat the above steps with:
   - **Name**: `moveo-frontend-dev`
   - **Environment Variables**:
     - `NODE_ENV`: `development`
     - `VITE_API_URL`: `https://your-dev-api.onrender.com`

## Environment Variables

Update the `.env.production` and `.env.development` files with your actual API URLs before deploying.

### Production (.env.production)
```
VITE_API_URL=https://your-production-api.onrender.com
VITE_ENV=production
```

### Development (.env.development)
```
VITE_API_URL=https://your-dev-api.onrender.com
VITE_ENV=development
```

## Auto-Deploy Configuration

Render will automatically redeploy when you:
- **Production**: Push to `main` or `master` branch
- **Development**: Push to `dev` or `develop` branch

You can configure branch settings in Render Dashboard for each service.

## Custom Domains (Optional)

1. Go to your service settings in Render
2. Navigate to "Custom Domain" section
3. Add your domain and follow DNS configuration instructions

## Monitoring

- Access deployment logs in Render Dashboard
- Each service has its own URL: `https://moveo-frontend-prod.onrender.com`
- Monitor build times and performance in the dashboard

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Review build logs in Render Dashboard

### Routes Not Working (404 on refresh)
- Ensure rewrite rules are configured in `render.yaml`
- Verify `staticPublishPath` points to `dist` directory

### Environment Variables Not Loading
- Vite requires variables to be prefixed with `VITE_`
- Rebuild after changing environment variables
- Access with `import.meta.env.VITE_VARIABLE_NAME`

## Costs

- Static sites on Render are free for:
  - 100 GB bandwidth/month
  - Automatic SSL certificates
  - Global CDN
  - Continuous deployment

## Support

- Render Documentation: https://render.com/docs
- Community Forum: https://community.render.com
