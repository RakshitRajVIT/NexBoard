// Cloudinary Upload Utility for NexBoard
// =======================================
// IMPORTANT: Replace the placeholder values below with your Cloudinary credentials
// Get these from: Cloudinary Dashboard > Settings

// TODO: Replace with your Cloudinary cloud name
const CLOUD_NAME = "dbjkah1xj";

// TODO: Replace with your unsigned upload preset
// Create one at: Cloudinary > Settings > Upload > Upload presets > Add upload preset (set to Unsigned)
const UPLOAD_PRESET = "nexboard_uploads";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

export async function uploadToCloudinary(file, onProgress) {
  // Check if Cloudinary is configured
  if (CLOUD_NAME === "YOUR_CLOUD_NAME" || UPLOAD_PRESET === "YOUR_UPLOAD_PRESET") {
    console.warn('Cloudinary not configured. Using demo mode.');
    // Return a demo URL after a fake delay
    await new Promise(r => setTimeout(r, 1500));
    return {
      success: true,
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
      demo: true
    };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'nexboard');

  try {
    const response = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => reject(new Error('Network error')));
      xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

      xhr.open('POST', CLOUDINARY_URL);
      xhr.send(formData);
    });

    return {
      success: true,
      url: response.secure_url,
      publicId: response.public_id,
      format: response.format,
      width: response.width,
      height: response.height
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Check if Cloudinary is properly configured
export function isCloudinaryConfigured() {
  return CLOUD_NAME !== "YOUR_CLOUD_NAME" && UPLOAD_PRESET !== "YOUR_UPLOAD_PRESET";
}
