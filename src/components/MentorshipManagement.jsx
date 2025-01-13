// // src/components/MentorshipManagement.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function MentorshipManagement() {
//     const [mentees, setMentees] = useState([]);

//     useEffect(() => {
//         const fetchMentees = async () => {
//             const res = await axios.get("/api/instructor/mentees");
//             setMentees(res.data);
//         };
//         fetchMentees();
//     }, []);

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Mentorship Management</h1>
//             <div>
//                 <h2>Your Mentees</h2>
//                 <ul>
//                     {mentees.map(mentee => (
//                         <li key={mentee.id}>
//                             <p>{mentee.name}</p>
//                             <button>Schedule Session</button>
//                             <button>View Progress</button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default MentorshipManagement;
