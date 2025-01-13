// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer token' format
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Authorization token is missing" });
//     }

//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     const courses = response.data;
//     res.status(200).json(courses);
//   } catch (error) {
//     if (error.response) {
//       console.error(
//         "Error fetching courses:",
//         error.response.data || error.message
//       );
//       return res.status(error.response.status || 500).json({
//         message: "Failed to fetch courses from the backend",
//         error: error.response.data || error.message,
//       });
//     }
//     console.error("Error:", error.message);
//     res.status(500).json({
//       message: "An error occurred while processing the request",
//       error: error.message,
//     });
//   }
// }
//frontend/pages/api/course.jsx
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer token' format
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const courses = response.data;
    res.status(200).json(courses);
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching courses:",
        error.response.data || error.message
      );
      return res.status(error.response.status || 500).json({
        message: "Failed to fetch courses from the backend",
        error: error.response.data || error.message,
      });
    }
    console.error("Error:", error.message);
    res.status(500).json({
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
}
