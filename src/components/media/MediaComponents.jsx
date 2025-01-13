import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { getMediaUrl, getVideoEmbedUrl, isExternalVideo } from '../../utils/mediaUtils';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const CourseImage = ({ src, alt, sx = {}, ...props }) => (
  <Box
    component="img"
    src={src ? `${BACKEND_URL}/${src.replace(/^\//, '')}` : '/images/placeholders/course.jpg'}
    alt={alt}
    sx={{
      width: '100%',
      height: 200,
      objectFit: 'cover',
      borderRadius: 1,
      ...sx
    }}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/images/placeholders/course.jpg';
    }}
    {...props}
  />
);

export const InstructorAvatar = ({ src, alt, sx = {}, ...props }) => (
  <Avatar
    src={src ? `${BACKEND_URL}/${src.replace(/^\//, '')}` : '/images/placeholders/instructor.jpg'}
    alt={alt}
    sx={{
      width: 40,
      height: 40,
      ...sx
    }}
    {...props}
  />
);

export const LessonImage = ({ src, alt, sx = {}, ...props }) => (
  <Box
    component="img"
    src={src ? `${BACKEND_URL}/${src.replace(/^\//, '')}` : '/images/placeholders/lesson.jpg'}
    alt={alt}
    sx={{
      width: '100%',
      maxHeight: 300,
      objectFit: 'cover',
      borderRadius: 1,
      ...sx
    }}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/images/placeholders/lesson.jpg';
    }}
    {...props}
  />
);

export const VideoPlayer = ({ url, title, sx = {}, ...props }) => {
  if (!url) return null;

  const getVideoUrl = (url) => {
    // Handle YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtube.com') 
        ? url.split('v=')[1]?.split('&')[0]
        : url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Handle backend videos
    if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
      return `${BACKEND_URL}/${url.replace(/^\//, '')}`;
    }
    
    return url;
  };

  const videoUrl = getVideoUrl(url);
  const isExternal = url.includes('youtube.com') || url.includes('vimeo.com');

  if (!videoUrl) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography component="div" color="error">
          Video URL is invalid or unsupported
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio
        ...sx
      }}
    >
      {isExternal ? (
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px'
          }}
          {...props}
        />
      ) : (
        <video
          src={videoUrl}
          title={title}
          controls
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px'
          }}
          {...props}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </Box>
  );
};
