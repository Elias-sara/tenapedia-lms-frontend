// import axios from 'axios';

// export default async function handler(req, res) {
//   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/instructors`;

//   // GET: Fetch all instructors
//   if (req.method === 'GET') {
//     try {
//       const response = await axios.get(apiUrl);
//       const instructors = response.data;
//       res.status(200).json(instructors);
//     } catch (error) {
//       console.error('Error fetching instructors:', error.message);
//       res.status(500).json({
//         message: 'Failed to fetch instructors from the backend',
//         error: error.message,
//       });
//     }
//   } 

//   // POST: Create a new instructor
//   else if (req.method === 'POST') {
//     const { name, bio, image } = req.body;
//     if (!name || !bio || !image) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//       const response = await axios.post(apiUrl, { name, bio, image });
//       res.status(201).json(response.data);
//     } catch (error) {
//       console.error('Error creating instructor:', error.message);
//       res.status(500).json({
//         message: 'Failed to create instructor',
//         error: error.message,
//       });
//     }
//   } 

//   // DELETE: Delete an instructor
//   else if (req.method === 'DELETE') {
//     const { id } = req.query;
//     if (!id) {
//       return res.status(400).json({ message: 'Instructor ID is required' });
//     }

//     try {
//       await axios.delete(`${apiUrl}/${id}`);
//       res.status(200).json({ message: 'Instructor deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting instructor:', error.message);
//       res.status(500).json({
//         message: 'Failed to delete instructor',
//         error: error.message,
//       });
//     }
//   }
// }
