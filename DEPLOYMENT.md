# NexBoard - Deployment Guide

## Deployment to Vercel

### Prerequisites
- A [Vercel account](https://vercel.com) (free tier available)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your Git repository:**
   - Select your GitHub account
   - Find and import your NexBoard repository

5. **Configure the project:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables** (if you have Firebase or other secrets):
   - Go to Settings → Environment Variables
   - Add your Firebase config variables:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - etc.

7. **Click "Deploy"**

8. Your site will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts. For production deployment:
   ```bash
   vercel --prod
   ```

### Method 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

---

## Alternative Deployment Options

### Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### GitHub Pages
Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```
Then use `gh-pages` package or GitHub Actions.

---

## Important Notes

### Environment Variables
- Make sure all environment variables are prefixed with `VITE_` to be accessible in your React app
- Never commit `.env` files to Git
- Set all environment variables in your deployment platform's dashboard

### Firebase Configuration
If you're using Firebase, ensure your Firebase config is properly set up:
```js
// firebase.js should use environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other config
};
```

### Build Verification
Before deploying, always test the build locally:
```bash
npm run build
npx vite preview
```

---

## Troubleshooting

### Build fails
- Check `package.json` for correct dependencies
- Run `npm install` to ensure all packages are installed
- Check for TypeScript or linting errors

### 404 on page refresh
- Vercel should handle this automatically with the `vercel.json` configuration
- The rewrites rule ensures all routes go to `index.html`

### Environment variables not working
- Ensure they're prefixed with `VITE_`
- Restart dev server after adding new variables
- In Vercel, make sure they're added in Settings → Environment Variables

---

## Post-Deployment Checklist

- [ ] Test all routes and features
- [ ] Verify Firebase connection works
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Enable automatic deployments for your main branch
- [ ] Set up preview deployments for pull requests

---

## Support

For issues:
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/
- Firebase Docs: https://firebase.google.com/docs

Good luck with your deployment! 🚀
