// Helper function to process image URLs
export const getImageUrl = (type, id, baseUrl = process.env.NEXT_PUBLIC_API_URL) => {
  if (!id) {
    return `${baseUrl}/api/courses/defaults/${type}`;
  }
  return `${baseUrl}/api/courses/${id}/image`;
};
