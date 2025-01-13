import axios from 'axios';

/**
 * Log module-course ID mismatch to backend for tracking and potential reconciliation
 * @param {Object} mismatchData - Details of the course ID mismatch
 */
export const logModuleCourseIdMismatch = async (mismatchData) => {
  try {
    await axios.post('/api/logs/module-course-mismatch', mismatchData);
  } catch (error) {
    console.error('Failed to log module-course ID mismatch', error);
  }
};
