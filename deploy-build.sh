#!/bin/bash

# NexBoard Deployment Script
# This script builds and prepares your project for deployment

echo "===================================="
echo "  NexBoard - Deployment Builder"
echo "===================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ ERROR: Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "🔨 Building for production..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "===================================="
    echo "  ✅ Build Complete!"
    echo "===================================="
    echo ""
    echo "Your production build is ready in the 'dist' folder."
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub:"
    echo "   git add ."
    echo "   git commit -m 'Ready for deployment'"
    echo "   git push origin main"
    echo ""
    echo "2. Deploy to Vercel:"
    echo "   - Go to https://vercel.com"
    echo "   - Click 'Add New Project'"
    echo "   - Import your repository"
    echo "   - Click 'Deploy'"
    echo ""
    echo "Or use Vercel CLI:"
    echo "   npm install -g vercel"
    echo "   vercel --prod"
    echo ""
else
    echo ""
    echo "❌ ERROR: Build failed"
    echo "Please check the error messages above"
    exit 1
fi
