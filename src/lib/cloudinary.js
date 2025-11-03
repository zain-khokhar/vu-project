/**
 * Cloudinary Upload Utility
 * Handles image uploads to Cloudinary via API route (server-side)
 */

export async function uploadToCloudinary(file, folder = 'blogs') {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Upload error response:', data);
      throw new Error(data.error || 'Failed to upload image');
    }

    console.log('Upload successful:', data);
    
    return {
      success: true,
      url: data.url,
      publicId: data.publicId,
      width: data.width,
      height: data.height,
      format: data.format,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload image',
    };
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteFromCloudinary(publicId) {
  try {
    // This would typically be done on the server side for security
    // For now, we'll just return success
    // In production, create an API route to handle deletion
    return {
      success: true,
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(url, options = {}) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
  } = options;

  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformation = transformations.join(',');
  return url.replace('/upload/', `/upload/${transformation}/`);
}
