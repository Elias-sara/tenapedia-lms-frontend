const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const getMediaUrl = (url, type = 'image') => {
  if (!url) {
    return getPlaceholderUrl(type);
  }

  // Handle external URLs (including YouTube, Vimeo, etc.)
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }

  // Handle backend uploads
  if (url.startsWith('/uploads/')) {
    return `${BACKEND_URL}${url}`;
  }

  // Handle relative paths from backend
  if (url.startsWith('uploads/')) {
    return `${BACKEND_URL}/${url}`;
  }

  return url;
};

export const getPlaceholderUrl = (type) => {
  switch (type) {
    case 'instructor':
      return '/images/placeholders/instructor.jpg';
    case 'course':
      return '/images/placeholders/course.jpg';
    case 'lesson':
      return '/images/placeholders/lesson.jpg';
    case 'video':
      return '/images/placeholders/video-thumbnail.jpg';
    default:
      return '/images/placeholders/default.jpg';
  }
};

export const isExternalVideo = (url) => {
  if (!url) return false;
  return (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com') ||
    url.includes('wistia.com')
  );
};

export const getVideoEmbedUrl = (url) => {
  if (!url) return null;
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtube.com') 
      ? url.split('v=')[1]?.split('&')[0]
      : url.split('youtu.be/')[1]?.split('?')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  }

  // If it's a direct video file from backend
  if (url.includes('/uploads/') || url.startsWith('uploads/')) {
    return getMediaUrl(url, 'video');
  }

  return url;
};
