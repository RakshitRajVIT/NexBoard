@echo off
echo ====================================
echo   NexBoard - Deployment Builder
echo ====================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building for production...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo ====================================
echo   Build Complete!
echo ====================================
echo.
echo Your production build is ready in the 'dist' folder.
echo.
echo Next steps:
echo 1. Push your code to GitHub
echo 2. Go to https://vercel.com
echo 3. Click "Add New Project"
echo 4. Import your repository
echo 5. Click "Deploy"
echo.
echo Or use Vercel CLI:
echo   npm install -g vercel
echo   vercel --prod
echo.
pause
