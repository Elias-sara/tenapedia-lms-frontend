import axios from '@/utils/axiosInstance';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await axios.get('/api/courses/available', {
      headers: { Authorization: `Bearer ${token}` }
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