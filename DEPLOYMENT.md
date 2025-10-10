# Vercel Deployment Guide for AutoNex AI

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Set custom domain** (after initial deployment):
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Domains
   - Add `autonex-ai.vercel.app`

## Configuration Files Created

- `vercel.json`: Vercel deployment configuration
- Updated `package.json`: Added `vercel-build` script
- Updated `vite.config.ts`: Optimized build settings

## Build Configuration

- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

## Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# API Configuration
VITE_API_URL=https://autonex-ai.vercel.app

# Database Configuration (if using database features)
# DATABASE_URL=your_database_connection_string_here

# Node Environment
NODE_ENV=production

# Port (for local development)
PORT=5000
```

### Required Variables:

1. **VITE_API_URL**: The base URL for your API endpoints
   - For Vercel deployment: `https://autonex-ai.vercel.app`
   - This is used by the contact form to send emails

2. **DATABASE_URL** (Optional): Database connection string
   - Only needed if you're using database features
   - Format: `postgresql://username:password@host:port/database`

### Vercel Environment Variables:

In your Vercel dashboard, add these environment variables:
- `VITE_API_URL` = `https://autonex-ai.vercel.app`
- `NODE_ENV` = `production`

## Routes

The application uses client-side routing with the following paths:
- `/` - Home page
- `/products` - Products page
- `/data-services` - Data Services page
- `/about` - About page
- `/contact` - Contact page

All routes are handled by the SPA router and will redirect to `index.html`.
