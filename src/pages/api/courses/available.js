import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import axiosInstance from '../../../utils/axiosConfig';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const response = await axiosInstance.get('/api/courses/available', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching available courses:', error);
    return res.status(500).json({ 
      message: 'Error fetching available courses',
      error: error.message 
    });
  }
} 