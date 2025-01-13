export const fetchCourses = async () => {
  try {
    const response = await fetch('/api/courses');
    if (!response.ok) {
      throw new Error('Error fetching courses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const saveCourse = async (courseData) => {
  try {
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      throw new Error('Error saving course');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};
