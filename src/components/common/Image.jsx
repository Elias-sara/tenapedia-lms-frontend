import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

const Image = ({ src, alt, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Function to handle image loading
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Function to handle image error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Construct the full URL if it's a relative path
  const imageUrl = src.startsWith('http') ? src : `${apiUrl}${src}`;

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          className={className}
          style={style}
        />
      )}
      <img
        src={hasError ? `${apiUrl}/images/default-course.jpg` : imageUrl}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        style={{
          ...style,
          display: isLoading ? 'none' : 'block',
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};

export default Image;
