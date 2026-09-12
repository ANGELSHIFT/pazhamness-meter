# PAZHAMNESS METER — DEPLOYMENT GUIDE

This guide provides the complete, step-by-step process to deploy the full-stack Pazhamness Meter application to production.

---

## 1. Push Your Code to GitHub

First, initialize Git and push the project to a GitHub repository:

```bash
# In the Pazham folder:
git init
git add .
git commit -m "Initial commit: Pazhamness Meter full-stack app"
git branch -M main
```

Create a new repository on [GitHub](https://github.com/new) (e.g., `pazhamness-meter`), then link and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/pazhamness-meter.git
git push -u origin main
```

---

## 2. Option A: Deploy on Render (Recommended — Free & Easiest)

Render is the best platform for this project because it runs both the Express backend API and serves the compiled React frontend from a single web service.

1. Sign up / log in to [Render.com](https://render.com) using your GitHub account.
2. Click the **"New +"** button at the top and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and select your `pazhamness-meter` repository.
4. Fill in the settings:
   - **Name**: `pazhamness-meter`
   - **Region**: Choose the closest region (e.g., Singapore / Oregon / Frankfurt)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **"Create Web Service"**.
6. Render will automatically:
   - Install server and client packages
   - Build the React production bundle
   - Start the Express server on `PORT`
   - Provide a free live HTTPS URL (e.g., `https://pazhamness-meter.onrender.com`).

---

## 3. Option B: Deploy on Railway (Fast 1-Click)

1. Sign up / log in to [Railway.app](https://railway.app).
2. Click **"New Project"** &rarr; **"Deploy from GitHub repo"**.
3. Select your `pazhamness-meter` repository.
4. Railway will automatically detect Node.js, run `npm run build`, and launch with `npm start`.
5. In the service settings, navigate to **Settings** &rarr; **Networking** &rarr; **Generate Domain** to get a public URL.

---

## 4. Option C: Self-Hosted VPS (Ubuntu / Debian with PM2 + Nginx)

If deploying to a VPS:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/pazhamness-meter.git
cd pazhamness-meter

# Build the project
npm run build

# Install PM2 process manager
sudo npm install -g pm2

# Start the application
pm2 start server/index.js --name "pazhamness"
pm2 save
pm2 startup
```

Configure Nginx reverse proxy to forward traffic on port 80/443 to `http://127.0.0.1:5000`.

---

## Local Verification Commands

Before deploying, you can test the production build locally:

```bash
# 1. Build client bundle
npm run build

# 2. Start the unified server
npm start
```
Visit `http://localhost:5000` to verify that the app is running smoothly.
