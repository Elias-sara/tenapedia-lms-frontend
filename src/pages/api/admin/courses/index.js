import axios from 'axios';
import { formidable } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No authorization token' });
    }

    // Parse form data
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Create a new FormData instance
    const formData = new FormData();
    
    // Append all text fields
    Object.keys(fields).forEach(key => {
      formData.append(key, fields[key][0]); // formidable returns arrays for fields
    });

    // Append files directly as streams
    if (files.courseImage) {
      const file = files.courseImage[0]; // formidable returns arrays for files
      formData.append('courseImage', fs.createReadStream(file.filepath));
    }
    if (files.instructorImage) {
      const file = files.instructorImage[0];
      formData.append('instructorImage', fs.createReadStream(file.filepath));
    }

    // Handle lesson images
    Object.keys(files).forEach(key => {
      if (key.startsWith('lessonImage-')) {
        const file = files[key][0];
        formData.append(key, fs.createReadStream(file.filepath));
      }
    });

    // Log the form data for debugging
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`,
      formData,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return res.status(201).json(response.data);
  } catch (error) {
    console.error('Error in course creation:', error);
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Internal server error'
    });
  }
}
