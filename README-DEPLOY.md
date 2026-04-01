# Quick Start - Deploy to Vercel

## 🚀 Quick Deploy (3 Steps)

### Step 1: Build Your Project
Run this in your terminal:
```bash
npm install
npm run build
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3: Deploy on Vercel
1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub
2. Click **"Add New Project"**
3. Select your **NexBoard** repository
4. Click **"Deploy"** (Vercel auto-detects Vite settings)

**That's it!** Your site will be live in ~2 minutes at `https://your-project.vercel.app`

---

## ⚡ Even Faster: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (one command!)
vercel --prod
```

---

## 🔧 Configuration Files Added

I've created these files to make deployment seamless:

- **`vercel.json`** - Vercel configuration (SPA routing, build settings)
- **`.vercelignore`** - Files to exclude from deployment
- **`DEPLOYMENT.md`** - Detailed deployment guide
- **`deploy-build.bat`** - Windows script to build and prepare for deployment

---

## 📝 Important: Environment Variables

If you're using Firebase or other services, add environment variables in Vercel:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add variables like:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - etc.

---

## ✅ Deployment Checklist

- [ ] Run `npm run build` locally to test
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables (if needed)
- [ ] Test the deployed site
- [ ] Set up custom domain (optional)

---

## 🛠️ What I've Done

1. ✅ Created **vercel.json** with optimal Vite configuration
2. ✅ Created **.vercelignore** to optimize deployment size
3. ✅ Added comprehensive **DEPLOYMENT.md** guide
4. ✅ Created **deploy-build.bat** script for Windows
5. ✅ Set up SPA routing (fixes 404 on page refresh)

Everything is ready for deployment! Just follow Step 1-3 above. 🎉
