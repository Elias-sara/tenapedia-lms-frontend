import axios from '@/utils/axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await axios.get(`${baseURL}/api/students/courses`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error browsing courses:', error);
    return res.status(500).json({ 
      message: 'Error browsing courses',
      error: error.message 
    });
  }
}