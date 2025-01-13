import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ 
  onFileSelect, 
  label, 
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif']
  },
  maxSize = 5242880, // 5MB
  preview = null,
  error
}) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.[0]) {
      onFileSelect(acceptedFiles[0]);
    }
    
    // Handle rejected files
    if (rejectedFiles?.length > 0) {
      const rejection = rejectedFiles[0];
      rejection.errors.forEach(err => {
        if (err.code === 'file-invalid-type') {
          console.error('Invalid file type. Please upload an image file.');
        } else if (err.code === 'file-too-large') {
          console.error(`File is too large. Max size is ${maxSize / 1024 / 1024}MB`);
        }
      });
    }
  }, [onFileSelect, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  });

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-500' : ''}
        `}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full aspect-video">
            <img
              src={typeof preview === 'string' ? preview : URL.createObjectURL(preview)}
              alt="Preview"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="space-y-2 py-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>
                  Drag and drop an image here, or{' '}
                  <span className="text-blue-500">browse</span>
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSize / 1024 / 1024}MB
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
