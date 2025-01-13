// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const Course = require('./models/Course');
// const Module = require('./models/Module');
// const Lesson = require('./models/Lesson');
// const Quiz = require('./models/Quiz');
// const User = require('./models/User');
// const dotenv = require('dotenv');
// const path = require('path');

// // Explicitly load .env file
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// console.log('Current working directory:', process.cwd());
// console.log('MONGO_URI:', process.env.MONGO_URI);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch((err) => console.error('MongoDB connection error:', err));

// async function seed() {
//   try {
//     // Clear existing data
//     await User.deleteMany({});
//     await Course.deleteMany({});
//     await Module.deleteMany({});
//     await Lesson.deleteMany({});
//     await Quiz.deleteMany({});

//     // Create Students
//     const students = await User.create([
//       {
//         firstName: 'Sarah',
//         lastName: 'Johnson',
//         email: 'sarah.johnson@nursing.edu',
//         password: await bcrypt.hash('StudentNCLEX2025!', 10),
//         role: 'student',
//         phone: '+1 (650) 123-4567',
//         profile: {
//           bio: 'Aspiring cardiovascular nurse passionate about patient care.',
//           avatar: '/images/students/sarah-johnson.jpg'
//         },
//         enrolledCourses: [], 
//         progress: {
//           completedLessons: [],
//           completedModules: [],
//           completedQuizzes: [],
//           courseProgress: []
//         },
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         firstName: 'Michael',
//         lastName: 'Chen',
//         email: 'michael.chen@nursing.edu',
//         password: await bcrypt.hash('NCLEXPrep2025!', 10),
//         role: 'student',
//         phone: '+1 (408) 987-6543',
//         profile: {
//           bio: 'Dedicated nursing student focusing on cardiovascular specialization.',
//           avatar: '/images/students/michael-chen.jpg'
//         },
//         enrolledCourses: [], 
//         progress: {
//           completedLessons: [],
//           completedModules: [],
//           completedQuizzes: [],
//           courseProgress: []
//         },
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     // Create Instructor
//     const instructor = await User.create({
//       firstName: 'Emily',
//       lastName: 'Rodriguez',
//       email: 'emily.rodriguez@nursingacademy.edu',
//       password: await bcrypt.hash('NCLEXMaster2025!', 10),
//       role: 'instructor',
//       phone: '+1 (415) 555-NURSE',
//       profile: {
//         bio: 'Advanced Practice Cardiovascular Nurse Practitioner with 20 years of clinical and academic experience.',
//         avatar: '/images/instructors/emily-rodriguez.jpg'
//       },
//       enrolledCourses: [], 
//       progress: {
//         completedLessons: [],
//         completedModules: [],
//         completedQuizzes: [],
//         courseProgress: []
//       },
//       isActive: true,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     });

//     // Create Courses
//     const courses = await Course.create([
//       {
//         title: 'NCLEX Cardiovascular Nursing Mastery',
//         description: 'Comprehensive NCLEX preparation course focusing on cardiovascular nursing concepts and advanced clinical reasoning skills for cardiovascular patient care.',
//         category: 'Nursing Certification',
//         image: '/images/courses/nclex-cardiovascular-mastery.jpg',
//         instructor: {
//           name: `${instructor.firstName} ${instructor.lastName}`,
//           bio: instructor.profile.bio,
//           image: instructor.profile.avatar
//         },
//         modules: [], 
//         studentsEnrolled: [], 
//         status: 'published',
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         title: 'Advanced Cardiovascular Nursing',
//         description: 'Comprehensive course covering advanced cardiovascular nursing techniques, patient care, and critical interventions.',
//         instructor: {
//           name: `${instructor.firstName} ${instructor.lastName}`,
//           bio: instructor.profile.bio,
//           image: instructor.profile.avatar
//         },
//         category: 'Nursing Specialization',
//         level: 'Advanced',
//         price: 299.99,
//         duration: '12 weeks',
//         thumbnail: '/images/courses/cardiovascular-nursing.jpg',
//         modules: [],
//         isPublished: true,
//         requirements: [
//           'RN License',
//           'Minimum 2 years clinical experience',
//           'Basic understanding of cardiovascular systems'
//         ]
//       },
//       {
//         title: 'Pediatric Emergency Nursing',
//         description: 'Specialized training in emergency nursing techniques for pediatric patients, covering critical care, trauma response, and child-specific interventions.',
//         instructor: {
//           name: `${instructor.firstName} ${instructor.lastName}`,
//           bio: instructor.profile.bio,
//           image: instructor.profile.avatar
//         },
//         category: 'Emergency Nursing',
//         level: 'Intermediate',
//         price: 249.99,
//         duration: '10 weeks',
//         thumbnail: '/images/courses/pediatric-emergency.jpg',
//         modules: [],
//         isPublished: true,
//         requirements: [
//           'RN License',
//           'Pediatric nursing experience preferred',
//           'Strong communication skills'
//         ]
//       },
//       {
//         title: 'Mental Health Nursing and Psychiatric Care',
//         description: 'Comprehensive course on mental health nursing, covering assessment, intervention strategies, patient communication, and therapeutic techniques.',
//         instructor: {
//           name: `${instructor.firstName} ${instructor.lastName}`,
//           bio: instructor.profile.bio,
//           image: instructor.profile.avatar
//         },
//         category: 'Psychiatric Nursing',
//         level: 'Advanced',
//         price: 279.99,
//         duration: '12 weeks',
//         thumbnail: '/images/courses/mental-health-nursing.jpg',
//         modules: [],
//         isPublished: true,
//         requirements: [
//           'RN License',
//           'Basic psychology understanding',
//           'Empathy and strong interpersonal skills'
//         ]
//       }
//     ]);

//     // Create Modules
//     const modules = await Module.create([
//       {
//         courseId: courses[0]._id,
//         title: 'Cardiovascular Anatomy and Physiology',
//         description: 'Comprehensive study of cardiac structure, function, and physiological mechanisms.',
//         order: 1,
//         lessons: [], 
//         quizzes: [], 
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[0]._id,
//         title: 'Cardiovascular Patient Assessment',
//         description: 'Advanced techniques for comprehensive cardiovascular patient evaluation and diagnostic reasoning.',
//         order: 2,
//         lessons: [], 
//         quizzes: [], 
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[0]._id,
//         title: 'Cardiovascular Pathophysiology',
//         description: 'In-depth exploration of cardiovascular diseases, their mechanisms, and clinical manifestations.',
//         order: 3,
//         lessons: [], 
//         quizzes: [], 
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[0]._id,
//         title: 'Cardiovascular Pharmacology',
//         description: 'Comprehensive study of cardiovascular medications, their mechanisms of action, and clinical applications.',
//         order: 4,
//         lessons: [], 
//         quizzes: [], 
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[0]._id,
//         title: 'Advanced Cardiovascular Nursing Interventions',
//         description: 'Advanced nursing care strategies for patients with complex cardiovascular conditions.',
//         order: 5,
//         lessons: [], 
//         quizzes: [], 
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     // Create Lessons and Quizzes for each module
//     const lessonsData = [
//       // Module 1: Cardiovascular Anatomy and Physiology
//       [
//         {
//           moduleId: modules[0]._id,
//           title: 'Cardiac Anatomy Fundamentals',
//           title2: 'Understanding Heart Structure',
//           subtitle: 'A Comprehensive Overview of Cardiac Anatomy',
//           description: 'Detailed exploration of heart structure and components, focusing on anatomical intricacies.',
//           content: 'In-depth analysis of heart chambers, valves, and circulatory system. Understanding the anatomical structure is crucial for comprehensive cardiovascular nursing.',
//           note: 'Pay special attention to the intricate details of cardiac anatomy.',
//           note1: 'Understand the functional significance of each heart chamber.',
//           note2: 'Compare and contrast the structure of arteries and veins.',
//           note3: 'Explore the unique characteristics of cardiac muscle tissue.',
//           videoUrl: '/videos/cardiac-anatomy.mp4',
//           videoTitle: 'Cardiac Anatomy: A Detailed Exploration',
//           links: 'Additional resources for in-depth cardiac anatomy study',
//           resources: [
//             '/pdfs/cardiac-anatomy-guide.pdf',
//             '/images/heart-cross-section.jpg',
//             '/interactive/3d-heart-model.html'
//           ],
//           image: '/images/cardiac-anatomy-illustration.jpg',
//           duration: 90,
//           order: 1,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           moduleId: modules[0]._id,
//           title: 'Cardiovascular Physiology',
//           title2: 'Functional Dynamics of the Cardiovascular System',
//           subtitle: 'Understanding Cardiac Function and Blood Circulation',
//           description: 'Comprehensive exploration of cardiovascular physiological processes and mechanisms.',
//           content: 'Detailed analysis of heart function, blood flow, electrical conduction, and hemodynamic principles.',
//           note: 'Focus on the intricate physiological mechanisms of the cardiovascular system.',
//           note1: 'Understand cardiac cycle and electrical conduction.',
//           note2: 'Explore blood pressure regulation mechanisms.',
//           note3: 'Analyze oxygen and nutrient transport processes.',
//           videoUrl: '/videos/cardiovascular-physiology.mp4',
//           videoTitle: 'Cardiovascular Physiology: Functional Mechanisms',
//           links: 'Supplementary resources for cardiovascular physiological understanding',
//           resources: [
//             '/pdfs/cardiovascular-physiology-guide.pdf',
//             '/images/cardiac-cycle-diagram.jpg',
//             '/interactive/physiology-simulator.html'
//           ],
//           image: '/images/cardiovascular-physiology.jpg',
//           duration: 120,
//           order: 2,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       // Module 2: Cardiovascular Patient Assessment
//       [
//         {
//           moduleId: modules[1]._id,
//           title: 'Cardiovascular Physical Assessment',
//           title2: 'Advanced Patient Evaluation Techniques',
//           subtitle: 'Comprehensive Cardiovascular Examination Skills',
//           description: 'Comprehensive techniques for cardiovascular patient evaluation and advanced diagnostic reasoning.',
//           content: 'Systematic approach to cardiovascular assessment and diagnostic interpretation. Learn critical skills for thorough patient examination.',
//           note: 'Master the art of comprehensive cardiovascular patient assessment.',
//           note1: 'Develop advanced auscultation techniques.',
//           note2: 'Understand the significance of different heart sounds.',
//           note3: 'Learn to interpret physical signs of cardiovascular conditions.',
//           videoUrl: '/videos/cardiovascular-assessment.mp4',
//           videoTitle: 'Advanced Cardiovascular Physical Assessment',
//           links: 'Supplementary materials for cardiovascular assessment techniques',
//           resources: [
//             '/pdfs/cardiovascular-assessment-checklist.pdf',
//             '/images/heart-sound-chart.jpg',
//             '/interactive/assessment-simulator.html'
//           ],
//           image: '/images/cardiovascular-assessment.jpg',
//           duration: 120,
//           order: 1,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           moduleId: modules[1]._id,
//           title: 'Diagnostic Testing in Cardiovascular Care',
//           title2: 'Advanced Diagnostic Techniques',
//           subtitle: 'Interpreting Cardiovascular Diagnostic Tests',
//           description: 'Comprehensive understanding of diagnostic tests used in cardiovascular patient evaluation.',
//           content: 'In-depth exploration of ECG, echocardiography, stress tests, and other cardiovascular diagnostic procedures.',
//           note: 'Develop advanced skills in interpreting cardiovascular diagnostic tests.',
//           note1: 'Master ECG interpretation techniques.',
//           note2: 'Understand echocardiography principles.',
//           note3: 'Analyze stress test results and clinical implications.',
//           videoUrl: '/videos/cardiovascular-diagnostics.mp4',
//           videoTitle: 'Cardiovascular Diagnostic Testing Techniques',
//           links: 'Resources for advanced cardiovascular diagnostic interpretation',
//           resources: [
//             '/pdfs/diagnostic-testing-guide.pdf',
//             '/images/ecg-interpretation-chart.jpg',
//             '/interactive/diagnostic-simulator.html'
//           ],
//           image: '/images/cardiovascular-diagnostics.jpg',
//           duration: 90,
//           order: 2,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ]
//       // Add more lessons for other modules similarly...
//     ];

//     // Create lessons
//     const lessons = [];
//     for (const moduleGroup of lessonsData) {
//       lessons.push(...await Lesson.create(moduleGroup));
//     }

//     // Create Quizzes for each module
//     const quizzesData = [
//       // Module 1: Cardiovascular Anatomy and Physiology Quizzes
//       [
//         {
//           moduleId: modules[0]._id,
//           title: 'Cardiac Anatomy Comprehensive Quiz',
//           description: 'Detailed assessment of cardiovascular structural knowledge and anatomical understanding.',
//           duration: 45,
//           questions: [
//             {
//               question: 'What is the primary function of the heart\'s left ventricle?',
//               options: [
//                 'Receiving deoxygenated blood',
//                 'Pumping oxygenated blood to the body',
//                 'Regulating heart rate',
//                 'Producing blood cells'
//               ],
//               correctAnswer: 'Pumping oxygenated blood to the body',
//               explanation: 'The left ventricle is responsible for pumping oxygenated blood to the systemic circulation, supplying oxygen and nutrients to the entire body.',
//               points: 2
//             },
//             {
//               question: 'Describe the structural components of a heart valve.',
//               options: [
//                 'Single membrane',
//                 'Complex mechanism with leaflets and chordae tendineae',
//                 'Rigid cartilage-like structure',
//                 'Simple elastic flap'
//               ],
//               correctAnswer: 'Complex mechanism with leaflets and chordae tendineae',
//               explanation: 'Heart valves are intricate structures with leaflets and chordae tendineae that ensure unidirectional blood flow and prevent backflow.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 45,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           moduleId: modules[0]._id,
//           title: 'Cardiovascular Physiology Advanced Quiz',
//           description: 'In-depth assessment of cardiovascular physiological mechanisms and principles.',
//           duration: 60,
//           questions: [
//             {
//               question: 'What mechanism regulates cardiac output?',
//               options: [
//                 'Frank-Starling mechanism',
//                 'Sympathetic nervous system',
//                 'Hormonal regulation',
//                 'Respiratory cycle'
//               ],
//               correctAnswer: 'Frank-Starling mechanism',
//               explanation: 'The Frank-Starling mechanism describes how the heart adjusts stroke volume based on the volume of blood in the ventricles, ensuring efficient cardiac output.',
//               points: 3
//             },
//             {
//               question: 'Explain the role of the sinoatrial (SA) node in cardiac electrical conduction.',
//               options: [
//                 'Generates action potentials',
//                 'Blocks electrical signals',
//                 'Pumps blood through chambers',
//                 'Regulates blood pressure'
//               ],
//               correctAnswer: 'Generates action potentials',
//               explanation: 'The SA node is the heart\'s natural pacemaker, generating electrical impulses that initiate each heartbeat and control heart rate.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 60,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       // Module 2: Cardiovascular Patient Assessment Quizzes
//       [
//         {
//           moduleId: modules[1]._id,
//           title: 'Cardiovascular Assessment Clinical Reasoning Quiz',
//           description: 'Advanced quiz testing cardiovascular patient evaluation skills and clinical reasoning capabilities.',
//           duration: 60,
//           questions: [
//             {
//               question: 'Which assessment technique is crucial for detecting heart murmurs?',
//               options: [
//                 'Percussion',
//                 'Auscultation',
//                 'Palpation',
//                 'Inspection'
//               ],
//               correctAnswer: 'Auscultation',
//               explanation: 'Auscultation using a stethoscope is the primary method for detecting and characterizing heart murmurs, providing critical diagnostic information.',
//               points: 2
//             },
//             {
//               question: 'Interpret the clinical significance of jugular venous distension.',
//               options: [
//                 'Normal physiological condition',
//                 'Potential indicator of right-sided heart failure',
//                 'Sign of muscular tension',
//                 'Irrelevant clinical finding'
//               ],
//               correctAnswer: 'Potential indicator of right-sided heart failure',
//               explanation: 'Jugular venous distension can be a key clinical sign of right-sided heart failure, indicating increased central venous pressure.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 60,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           moduleId: modules[1]._id,
//           title: 'Diagnostic Testing Interpretation Quiz',
//           description: 'Comprehensive assessment of cardiovascular diagnostic test interpretation skills.',
//           duration: 75,
//           questions: [
//             {
//               question: 'What does an elevated ST segment in an ECG typically indicate?',
//               options: [
//                 'Normal heart rhythm',
//                 'Myocardial ischemia',
//                 'Electrolyte imbalance',
//                 'Respiratory distress'
//               ],
//               correctAnswer: 'Myocardial ischemia',
//               explanation: 'An elevated ST segment is often a sign of myocardial ischemia or ongoing myocardial infarction, indicating reduced blood flow to the heart muscle.',
//               points: 3
//             },
//             {
//               question: 'In a stress test, what finding suggests potential coronary artery disease?',
//               options: [
//                 'Consistent heart rate',
//                 'ST segment depression during exercise',
//                 'Increased respiratory rate',
//                 'Stable blood pressure'
//               ],
//               correctAnswer: 'ST segment depression during exercise',
//               explanation: 'ST segment depression during a stress test can indicate reduced blood flow to the heart, suggesting potential coronary artery disease.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 75,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       // Module 3: Cardiovascular Pathophysiology Quizzes
//       [
//         {
//           moduleId: modules[2]._id,
//           title: 'Cardiovascular Disease Mechanisms Quiz',
//           description: 'In-depth assessment of pathophysiological mechanisms in cardiovascular diseases.',
//           duration: 60,
//           questions: [
//             {
//               question: 'What is the primary pathophysiological mechanism in atherosclerosis?',
//               options: [
//                 'Viral infection',
//                 'Endothelial dysfunction and plaque formation',
//                 'Bacterial inflammation',
//                 'Genetic mutation'
//               ],
//               correctAnswer: 'Endothelial dysfunction and plaque formation',
//               explanation: 'Atherosclerosis involves endothelial damage, lipid accumulation, and progressive plaque formation leading to arterial narrowing and reduced blood flow.',
//               points: 3
//             },
//             {
//               question: 'Describe the pathophysiological changes in heart failure.',
//               options: [
//                 'Increased cardiac muscle strength',
//                 'Reduced cardiac output and compensatory mechanisms',
//                 'Complete heart muscle regeneration',
//                 'Spontaneous cardiac tissue repair'
//               ],
//               correctAnswer: 'Reduced cardiac output and compensatory mechanisms',
//               explanation: 'Heart failure involves decreased cardiac output, leading to neurohormonal compensatory mechanisms like increased sympathetic activity and renin-angiotensin-aldosterone system activation.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 60,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           moduleId: modules[2]._id,
//           title: 'Advanced Cardiovascular Pathology Clinical Reasoning Quiz',
//           description: 'Complex clinical reasoning quiz on cardiovascular disease progression and complications.',
//           duration: 75,
//           questions: [
//             {
//               question: 'What cascading effects occur in chronic hypertension?',
//               options: [
//                 'Improved cardiovascular elasticity',
//                 'Vascular remodeling and organ damage',
//                 'Enhanced blood cell production',
//                 'Increased metabolic efficiency'
//               ],
//               correctAnswer: 'Vascular remodeling and organ damage',
//               explanation: 'Chronic hypertension leads to vascular remodeling, endothelial dysfunction, and potential damage to organs like the heart, kidneys, and brain.',
//               points: 3
//             },
//             {
//               question: 'Explain the progression of coronary artery disease.',
//               options: [
//                 'Spontaneous vessel healing',
//                 'Gradual plaque accumulation and potential thrombosis',
//                 'Immediate complete vessel blockage',
//                 'Random vessel expansion'
//               ],
//               correctAnswer: 'Gradual plaque accumulation and potential thrombosis',
//               explanation: 'Coronary artery disease progresses through gradual atherosclerotic plaque accumulation, potentially leading to vessel narrowing, reduced blood flow, and risk of thrombosis.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 75,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       // Module 4: Cardiovascular Pharmacology Quizzes
//       [
//         {
//           moduleId: modules[3]._id,
//           title: 'Cardiovascular Medication Mechanisms Quiz',
//           description: 'Comprehensive assessment of cardiovascular medication pharmacological mechanisms.',
//           duration: 60,
//           questions: [
//             {
//               question: 'How do ACE inhibitors work to manage hypertension?',
//               options: [
//                 'Directly constricting blood vessels',
//                 'Blocking angiotensin II conversion',
//                 'Increasing sodium retention',
//                 'Stimulating heart rate'
//               ],
//               correctAnswer: 'Blocking angiotensin II conversion',
//               explanation: 'ACE inhibitors block the conversion of angiotensin I to angiotensin II, reducing vasoconstriction and aldosterone secretion, thus lowering blood pressure.',
//               points: 3
//             },
//             {
//               question: 'Describe the primary mechanism of beta-blockers in cardiovascular treatment.',
//               options: [
//                 'Increasing heart rate',
//                 'Blocking sympathetic nervous system effects',
//                 'Dilating coronary arteries',
//                 'Increasing blood volume'
//               ],
//               correctAnswer: 'Blocking sympathetic nervous system effects',
//               explanation: 'Beta-blockers reduce heart rate, contractility, and blood pressure by blocking sympathetic nervous system effects on beta-adrenergic receptors.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 60,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           moduleId: modules[3]._id,
//           title: 'Advanced Cardiovascular Pharmacotherapy Quiz',
//           description: 'Complex clinical reasoning quiz on cardiovascular medication management and interactions.',
//           duration: 75,
//           questions: [
//             {
//               question: 'What potential interaction exists between statins and grapefruit juice?',
//               options: [
//                 'Enhanced medication absorption',
//                 'Increased risk of muscle toxicity',
//                 'Improved cardiovascular outcomes',
//                 'No significant interaction'
//               ],
//               correctAnswer: 'Increased risk of muscle toxicity',
//               explanation: 'Grapefruit juice can inhibit CYP3A4 enzymes, leading to increased statin blood levels and potentially increasing the risk of muscle-related side effects.',
//               points: 3
//             },
//             {
//               question: 'Explain the rationale for combination therapy in hypertension management.',
//               options: [
//                 'Increasing medication side effects',
//                 'Targeting multiple physiological mechanisms',
//                 'Reducing medication costs',
//                 'Simplifying patient treatment'
//               ],
//               correctAnswer: 'Targeting multiple physiological mechanisms',
//               explanation: 'Combination therapy in hypertension allows targeting different physiological mechanisms, potentially achieving better blood pressure control with lower individual medication doses.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 75,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ],
//       // Module 5: Advanced Cardiovascular Nursing Interventions Quizzes
//       [
//         {
//           moduleId: modules[4]._id,
//           title: 'Advanced Cardiovascular Nursing Care Strategies Quiz',
//           description: 'Comprehensive assessment of advanced nursing interventions in cardiovascular care.',
//           duration: 60,
//           questions: [
//             {
//               question: 'What is a critical nursing intervention for a patient with acute myocardial infarction?',
//               options: [
//                 'Immediate bed rest',
//                 'Rapid assessment and pain management',
//                 'Delaying medical intervention',
//                 'Minimal patient monitoring'
//               ],
//               correctAnswer: 'Rapid assessment and pain management',
//               explanation: 'In acute myocardial infarction, rapid assessment, pain management, oxygen administration, and preparing for potential interventions are crucial nursing priorities.',
//               points: 3
//             },
//             {
//               question: 'Describe the nurse\'s role in preventing post-operative cardiovascular complications.',
//               options: [
//                 'Minimal patient movement',
//                 'Early mobilization and respiratory exercises',
//                 'Prolonged bed rest',
//                 'Avoiding patient assessment'
//               ],
//               correctAnswer: 'Early mobilization and respiratory exercises',
//               explanation: 'Nurses play a critical role in preventing post-operative complications through early mobilization, deep breathing exercises, and comprehensive patient monitoring.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 60,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         {
//           moduleId: modules[4]._id,
//           title: 'Complex Cardiovascular Patient Management Quiz',
//           description: 'Advanced clinical reasoning quiz on comprehensive cardiovascular patient care.',
//           duration: 75,
//           questions: [
//             {
//               question: 'What comprehensive approach is essential in managing a patient with chronic heart failure?',
//               options: [
//                 'Medication management only',
//                 'Holistic care including lifestyle modifications',
//                 'Surgical intervention',
//                 'Minimal patient education'
//               ],
//               correctAnswer: 'Holistic care including lifestyle modifications',
//               explanation: 'Comprehensive heart failure management involves medication, dietary modifications, exercise recommendations, psychological support, and ongoing patient education.',
//               points: 3
//             },
//             {
//               question: 'Describe the nurse\'s role in managing a patient with complex cardiovascular risk factors.',
//               options: [
//                 'Isolated medical treatment',
//                 'Comprehensive risk assessment and multidisciplinary approach',
//                 'Focusing on single risk factor',
//                 'Minimal patient interaction'
//               ],
//               correctAnswer: 'Comprehensive risk assessment and multidisciplinary approach',
//               explanation: 'Effective cardiovascular risk management requires comprehensive assessment, addressing multiple risk factors, patient education, and collaboration with a multidisciplinary healthcare team.',
//               points: 3
//             }
//           ],
//           passingScore: 70,
//           maxAttempts: 3,
//           showExplanation: true,
//           timeLimit: 75,
//           isPublished: true,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       ]
//     ];

//     // Create quizzes
//     const quizzes = [];
//     for (const moduleGroup of quizzesData) {
//       quizzes.push(...await Quiz.create(moduleGroup));
//     }

//     // Update modules with lessons and quizzes
//     for (let i = 0; i < modules.length; i++) {
//       await Module.findByIdAndUpdate(modules[i]._id, { 
//         lessons: lessons.filter(l => l.moduleId.equals(modules[i]._id)).map(l => l._id),
//         quizzes: quizzes.filter(q => q.moduleId.equals(modules[i]._id)).map(q => q._id)
//       });
//     }

//     // Update course with modules and students
//     await Course.findByIdAndUpdate(courses[0]._id, {
//       modules: modules.map(module => module._id),
//       studentsEnrolled: students.map(student => student._id)
//     });

//     // Update students with enrolled course and progress
//     for (const student of students) {
//       await User.findByIdAndUpdate(student._id, {
//         enrolledCourses: [courses[0]._id],
//         progress: {
//           completedLessons: [],
//           completedModules: [],
//           completedQuizzes: [],
//           courseProgress: [{
//             courseId: courses[0]._id,
//             completedLessons: [],
//             completedModules: [],
//             completedQuizzes: [],
//             lastAccessed: new Date()
//           }]
//         }
//       });
//     }

//     // Pediatric Emergency Nursing - Enhanced Modules and Lessons
//     const pedEmergencyModules = await Module.create([
//       {
//         courseId: courses[2]._id,
//         title: 'Pediatric Emergency Assessment',
//         description: 'Comprehensive and nuanced approach to assessing and triaging pediatric emergency patients, focusing on age-specific diagnostic techniques and critical decision-making',
//         learningObjectives: [
//           'Develop advanced pediatric triage skills',
//           'Master age-specific emergency assessment techniques',
//           'Understand developmental variations in pediatric emergencies',
//           'Implement rapid and accurate diagnostic reasoning',
//           'Recognize subtle signs of critical pediatric conditions'
//         ],
//         order: 1,
//         difficulty: 'Advanced',
//         estimatedCompletionTime: '2 weeks',
//         prerequisites: [
//           'Basic pediatric nursing knowledge',
//           'Understanding of child development stages',
//           'Basic emergency nursing principles'
//         ],
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[2]._id,
//         title: 'Pediatric Trauma Management',
//         description: 'Advanced comprehensive module on managing pediatric trauma cases, covering complex intervention strategies, psychological support, and multidisciplinary approach to pediatric trauma care',
//         learningObjectives: [
//           'Develop advanced pediatric trauma assessment skills',
//           'Master complex trauma intervention techniques',
//           'Understand psychological impact of trauma on children',
//           'Implement comprehensive trauma care protocols',
//           'Coordinate multidisciplinary trauma response'
//         ],
//         order: 2,
//         difficulty: 'Advanced',
//         estimatedCompletionTime: '2.5 weeks',
//         prerequisites: [
//           'Advanced pediatric nursing skills',
//           'Basic trauma care knowledge',
//           'Understanding of pediatric psychology'
//         ],
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[2]._id,
//         title: 'Pediatric Emergency Pharmacology',
//         description: 'Comprehensive module on medication management, precise dosage calculations, and advanced pharmacological interventions specific to pediatric emergency settings',
//         learningObjectives: [
//           'Master pediatric medication dosage calculations',
//           'Understand age-specific pharmacological responses',
//           'Develop skills in emergency medication administration',
//           'Recognize potential medication interactions and side effects',
//           'Implement safe medication protocols in emergency scenarios'
//         ],
//         order: 3,
//         difficulty: 'Advanced',
//         estimatedCompletionTime: '2 weeks',
//         prerequisites: [
//           'Basic pharmacology knowledge',
//           'Understanding of pediatric physiology',
//           'Basic medication administration skills'
//         ],
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     const pedEmergencyLessons = await Lesson.create([
//       {
//         moduleId: pedEmergencyModules[0]._id,
//         title: 'Pediatric Triage Techniques',
//         content: 'Advanced lesson on comprehensive pediatric triage methodologies, focusing on rapid assessment, age-specific diagnostic techniques, and critical decision-making in emergency settings.',
//         detailedDescription: 'An in-depth exploration of pediatric triage, covering:\n- Advanced pediatric assessment frameworks\n- Age-specific vital sign interpretation\n- Rapid diagnostic reasoning\n- Recognizing subtle signs of critical conditions\n- Psychological considerations in pediatric emergency assessment',
//         videoUrl: '/videos/pediatric/triage-techniques.mp4',
//         supplementaryMaterials: [
//           '/documents/pediatric/triage-assessment-guide.pdf',
//           '/videos/pediatric/triage-simulation-scenarios.mp4',
//           '/audio/pediatric/communication-techniques.mp3'
//         ],
//         practicalAssignment: {
//           title: 'Pediatric Emergency Triage Simulation',
//           description: 'Participate in a complex pediatric emergency triage scenario, demonstrating advanced assessment skills, communication, and critical decision-making.',
//           submissionType: 'Detailed Video Analysis and Reflective Report',
//           evaluationCriteria: [
//             'Accuracy of initial assessment',
//             'Communication skills',
//             'Decision-making process',
//             'Empathy and patient-centered approach'
//           ]
//         },
//         learningOutcomes: [
//           'Perform rapid and accurate pediatric emergency assessments',
//           'Identify critical signs in pediatric patients',
//           'Develop advanced triage decision-making skills'
//         ],
//         duration: 90,
//         order: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         moduleId: pedEmergencyModules[1]._id,
//         title: 'Pediatric Trauma Stabilization',
//         content: 'Comprehensive lesson on advanced pediatric trauma management, covering complex stabilization techniques, multidisciplinary approaches, and holistic patient care.',
//         detailedDescription: 'An extensive exploration of pediatric trauma care, including:\n- Advanced trauma assessment protocols\n- Pediatric-specific stabilization techniques\n- Psychological support for traumatized children\n- Multidisciplinary trauma response\n- Long-term trauma recovery considerations',
//         videoUrl: '/videos/pediatric/trauma-stabilization.mp4',
//         supplementaryMaterials: [
//           '/documents/pediatric/trauma-management-protocol.pdf',
//           '/videos/pediatric/trauma-case-studies.mp4',
//           '/documents/pediatric/psychological-support-guide.pdf'
//         ],
//         practicalAssignment: {
//           title: 'Comprehensive Pediatric Trauma Care Plan',
//           description: 'Develop a holistic trauma care plan for a simulated pediatric trauma patient, addressing medical, psychological, and long-term recovery needs.',
//           submissionType: 'Detailed Multidisciplinary Care Plan',
//           evaluationCriteria: [
//             'Medical intervention accuracy',
//             'Psychological support strategies',
//             'Comprehensive recovery approach',
//             'Interdisciplinary coordination'
//           ]
//         },
//         learningOutcomes: [
//           'Implement advanced pediatric trauma stabilization techniques',
//           'Provide comprehensive psychological support',
//           'Develop holistic trauma care strategies'
//         ],
//         duration: 120,
//         order: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         moduleId: pedEmergencyModules[2]._id,
//         title: 'Pediatric Emergency Medication Dosage',
//         content: 'Advanced lesson on precise medication management in pediatric emergency settings, covering complex dosage calculations, pharmacological considerations, and safe administration techniques.',
//         detailedDescription: 'Comprehensive exploration of pediatric emergency pharmacology, including:\n- Precise weight-based dosage calculations\n- Age-specific pharmacological responses\n- Medication interaction management\n- Emergency drug administration techniques\n- Monitoring and managing medication side effects',
//         videoUrl: '/videos/pediatric/medication-dosage.mp4',
//         supplementaryMaterials: [
//           '/documents/pediatric/medication-dosage-calculator.xlsx',
//           '/documents/pediatric/emergency-drug-reference.pdf',
//           '/videos/pediatric/medication-administration-techniques.mp4'
//         ],
//         practicalAssignment: {
//           title: 'Pediatric Emergency Medication Management Simulation',
//           description: 'Conduct a simulated emergency scenario requiring precise medication dosage calculation, administration, and patient monitoring.',
//           submissionType: 'Detailed Medication Management Report',
//           evaluationCriteria: [
//             'Accuracy of dosage calculations',
//             'Appropriate medication selection',
//             'Safe administration techniques',
//             'Patient monitoring and response assessment'
//           ]
//         },
//         learningOutcomes: [
//           'Perform precise pediatric medication dosage calculations',
//           'Understand age-specific pharmacological considerations',
//           'Implement safe medication administration techniques'
//         ],
//         duration: 75,
//         order: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     const pedEmergencyQuizzes = await Quiz.create([
//       {
//         moduleId: pedEmergencyModules[0]._id,
//         title: 'Comprehensive Pediatric Emergency Assessment Quiz',
//         description: 'Advanced assessment of pediatric emergency triage skills, diagnostic reasoning, and critical decision-making',
//         questions: [
//           {
//             question: 'What is the most critical first step in pediatric emergency triage?',
//             options: [
//               'Obtain detailed medical history',
//               'Assess airway, breathing, and circulation (ABC)',
//               'Check vital signs',
//               'Perform comprehensive physical examination'
//             ],
//             correctAnswer: 'Assess airway, breathing, and circulation (ABC)',
//             explanation: 'Assessing airway, breathing, and circulation (ABC) is the most critical first step in pediatric emergency triage, ensuring immediate life-saving interventions.',
//             points: 4,
//             difficulty: 'Hard'
//           },
//           {
//             question: 'Which assessment tool is most effective for evaluating pediatric pain?',
//             options: [
//               'Numeric pain scale',
//               'Wong-Baker FACES Pain Rating Scale',
//               'Adult pain assessment chart',
//               'Verbal descriptor scale'
//             ],
//             correctAnswer: 'Wong-Baker FACES Pain Rating Scale',
//             explanation: 'The Wong-Baker FACES Pain Rating Scale is specifically designed for children, providing a developmentally appropriate method of pain assessment.',
//             points: 4,
//             difficulty: 'Medium'
//           },
//           {
//             question: 'What distinguishes pediatric triage from adult emergency assessment?',
//             options: [
//               'Identical assessment protocols',
//               'Age-specific physiological variations',
//               'Less complex diagnostic procedures',
//               'Shorter assessment time'
//             ],
//             correctAnswer: 'Age-specific physiological variations',
//             explanation: 'Pediatric triage requires consideration of age-specific physiological variations, developmental stages, and unique communication challenges.',
//             points: 4,
//             difficulty: 'Hard'
//           },
//           {
//             question: 'In pediatric emergency assessment, what is the significance of the Glasgow Coma Scale (GCS) modification?',
//             options: [
//               'No specific modification needed',
//               'Adjusted for pediatric developmental stages',
//               'Used only for adult patients',
//               'Irrelevant in emergency settings'
//             ],
//             correctAnswer: 'Adjusted for pediatric developmental stages',
//             explanation: 'The Pediatric Glasgow Coma Scale is modified to account for developmental differences, ensuring accurate neurological assessment in children.',
//             points: 4,
//             difficulty: 'Medium'
//           }
//         ],
//         passingScore: 80,
//         timeLimit: 50,
//         difficulty: 'Advanced',
//         totalPoints: 16,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     // Mental Health Nursing - Enhanced Modules and Lessons
//     const mentalHealthModules = await Module.create([
//       {
//         courseId: courses[3]._id,
//         title: 'Psychiatric Assessment and Diagnosis',
//         description: 'Comprehensive approach to mental health assessment and diagnostic techniques',
//         learningObjectives: [
//           'Develop advanced psychiatric assessment skills',
//           'Master diagnostic techniques for mental health conditions',
//           'Understand the significance of mental status examination',
//           'Implement comprehensive diagnostic protocols'
//         ],
//         order: 1,
//         difficulty: 'Advanced',
//         estimatedCompletionTime: '2 weeks',
//         prerequisites: [
//           'Basic psychiatric nursing knowledge',
//           'Understanding of mental health principles',
//           'Basic assessment skills'
//         ],
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[3]._id,
//         title: 'Therapeutic Communication in Psychiatric Nursing',
//         description: 'Advanced communication strategies for effective mental health nursing',
//         learningObjectives: [
//           'Develop advanced therapeutic communication skills',
//           'Master active listening techniques',
//           'Understand the significance of empathy in psychiatric care',
//           'Implement patient-centered communication approaches'
//         ],
//         order: 2,
//         difficulty: 'Advanced',
//         estimatedCompletionTime: '2 weeks',
//         prerequisites: [
//           'Basic communication skills',
//           'Understanding of psychiatric principles',
//           'Basic therapeutic techniques'
//         ],
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         courseId: courses[3]._id,
//         title: 'Psychiatric Medication Management',
//         description: 'Comprehensive understanding of psychiatric medications and their management',
//         learningObjectives: [
//           'Master psychiatric medication management',
//           'Understand medication side effects and interactions',
//           'Develop skills in medication administration',
//           'Implement safe medication protocols'
//         ],
//         order: 3,
//         difficulty: 'Advanced',
//         estimatedCompletionTime: '2 weeks',
//         prerequisites: [
//           'Basic pharmacology knowledge',
//           'Understanding of psychiatric principles',
//           'Basic medication administration skills'
//         ],
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     const mentalHealthLessons = await Lesson.create([
//       {
//         moduleId: mentalHealthModules[0]._id,
//         title: 'Mental Status Examination Techniques',
//         content: 'Comprehensive lesson on mental status examination techniques, covering the significance of mental status examination, diagnostic techniques, and comprehensive assessment protocols.',
//         detailedDescription: 'An in-depth exploration of mental status examination, including:\n- Significance of mental status examination\n- Diagnostic techniques for mental health conditions\n- Comprehensive assessment protocols\n- Cultural and individual variations in mental status examination',
//         videoUrl: '/videos/mental-health/mental-status-exam.mp4',
//         supplementaryMaterials: [
//           '/documents/mental-health/mental-status-examination-guide.pdf',
//           '/videos/mental-health/diagnostic-techniques.mp4',
//           '/documents/mental-health/cultural-considerations.pdf'
//         ],
//         practicalAssignment: {
//           title: 'Comprehensive Mental Status Examination',
//           description: 'Conduct a comprehensive mental status examination on a simulated patient, demonstrating advanced assessment skills and diagnostic techniques.',
//           submissionType: 'Detailed Mental Status Examination Report',
//           evaluationCriteria: [
//             'Accuracy of mental status examination',
//             'Comprehensive assessment protocols',
//             'Cultural and individual considerations',
//             'Diagnostic techniques'
//           ]
//         },
//         learningOutcomes: [
//           'Perform comprehensive mental status examinations',
//           'Develop advanced diagnostic techniques',
//           'Understand cultural and individual variations'
//         ],
//         duration: 90,
//         order: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         moduleId: mentalHealthModules[1]._id,
//         title: 'Therapeutic Communication Strategies',
//         content: 'Comprehensive lesson on therapeutic communication strategies, covering active listening techniques, empathy, and patient-centered communication approaches.',
//         detailedDescription: 'An in-depth exploration of therapeutic communication, including:\n- Active listening techniques\n- Empathy in psychiatric care\n- Patient-centered communication approaches\n- Cultural and individual variations in communication',
//         videoUrl: '/videos/mental-health/therapeutic-communication.mp4',
//         supplementaryMaterials: [
//           '/documents/mental-health/active-listening-techniques.pdf',
//           '/videos/mental-health/empathy-in-psychiatric-care.mp4',
//           '/documents/mental-health/patient-centered-communication.pdf'
//         ],
//         practicalAssignment: {
//           title: 'Therapeutic Communication Simulation',
//           description: 'Participate in a simulated therapeutic communication scenario, demonstrating active listening techniques, empathy, and patient-centered communication approaches.',
//           submissionType: 'Detailed Therapeutic Communication Report',
//           evaluationCriteria: [
//             'Active listening techniques',
//             'Empathy and understanding',
//             'Patient-centered communication approaches',
//             'Cultural and individual considerations'
//           ]
//         },
//         learningOutcomes: [
//           'Develop advanced therapeutic communication skills',
//           'Master active listening techniques',
//           'Understand the significance of empathy'
//         ],
//         duration: 90,
//         order: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         moduleId: mentalHealthModules[2]._id,
//         title: 'Psychiatric Medication Principles',
//         content: 'Comprehensive lesson on psychiatric medication principles, covering medication management, side effects, interactions, and safe administration techniques.',
//         detailedDescription: 'An in-depth exploration of psychiatric medication management, including:\n- Medication management principles\n- Side effects and interactions\n- Safe administration techniques\n- Cultural and individual variations in medication management',
//         videoUrl: '/videos/mental-health/medication-management.mp4',
//         supplementaryMaterials: [
//           '/documents/mental-health/medication-management-guide.pdf',
//           '/videos/mental-health/side-effects-and-interactions.mp4',
//           '/documents/mental-health/safe-administration-techniques.pdf'
//         ],
//         practicalAssignment: {
//           title: 'Psychiatric Medication Management Simulation',
//           description: 'Participate in a simulated psychiatric medication management scenario, demonstrating medication management principles, safe administration techniques, and cultural and individual considerations.',
//           submissionType: 'Detailed Medication Management Report',
//           evaluationCriteria: [
//             'Medication management principles',
//             'Safe administration techniques',
//             'Cultural and individual considerations',
//             'Side effects and interactions'
//           ]
//         },
//         learningOutcomes: [
//           'Master psychiatric medication management',
//           'Understand side effects and interactions',
//           'Develop skills in safe administration techniques'
//         ],
//         duration: 90,
//         order: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     const mentalHealthQuizzes = await Quiz.create([
//       {
//         moduleId: mentalHealthModules[0]._id,
//         title: 'Comprehensive Psychiatric Assessment Quiz',
//         description: 'Advanced assessment of mental health examination techniques and diagnostic reasoning',
//         questions: [
//           {
//             question: 'What is the primary goal of a mental status examination?',
//             options: [
//               'Diagnose specific mental illness',
//               'Assess cognitive function and emotional state',
//               'Prescribe medication',
//               'Conduct therapy session'
//             ],
//             correctAnswer: 'Assess cognitive function and emotional state',
//             explanation: 'The primary goal of a mental status examination is to assess cognitive function and emotional state.',
//             points: 4,
//             difficulty: 'Medium'
//           },
//           {
//             question: 'Which component is NOT typically included in a mental status examination?',
//             options: [
//               'Appearance and behavior',
//               'Mood and affect',
//               'Physical fitness test',
//               'Thought process and content'
//             ],
//             correctAnswer: 'Physical fitness test',
//             explanation: 'A physical fitness test is not typically included in a mental status examination.',
//             points: 4,
//             difficulty: 'Easy'
//           }
//         ],
//         passingScore: 80,
//         timeLimit: 50,
//         difficulty: 'Advanced',
//         totalPoints: 8,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);

//     // Update courses with modules
//     await Course.findByIdAndUpdate(courses[2]._id, {
//       modules: pedEmergencyModules.map(module => module._id)
//     });

//     await Course.findByIdAndUpdate(courses[3]._id, {
//       modules: mentalHealthModules.map(module => module._id)
//     });

//     console.log('Pediatric Emergency Nursing and Mental Health Nursing courses seeded successfully!');
//   } catch (error) {
//     console.error('Seeding error:', error);
//   } finally {
//     await mongoose.connection.close();
//   }
// }

// // Run the seeding function
// seed();


/**
 * Seed Script for Learning Management System (LMS)
 * 
 * Comprehensive seeding script that creates courses with their complete ecosystem:
 * - Courses with detailed metadata
 * - Associated modules
 * - Detailed lessons within modules
 * - Assessment quizzes
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Model imports
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
const Quiz = require('./models/Quiz');
const User = require('./models/User');
const Category = require('./models/Category'); // Import Category model
const Enrollment = require('./models/Enrollment'); // Import Enrollment model

// Load environment configuration
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Centralized logging utility
 */
const logger = {
  info: (message) => console.log(`[SEED INFO] ${message}`),
  error: (message, error) => console.error(`[SEED ERROR] ${message}`, error)
};

/**
 * Securely hash passwords
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Create a complete course with its modules, lessons, and quizzes
 * @param {Object} instructor - Instructor details
 * @returns {Promise<Object>} Created course with its components
 */
const createCompleteCourse = async (instructor, courseData) => {
  try {
    // Create the course
    const course = await Course.create({
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      image: courseData.image || null,
      instructor: {
        name: `${instructor.firstName} ${instructor.lastName}`,
        bio: instructor.profile.bio,
        image: instructor.profile.avatar || null
      },
      modules: [], // Will be populated later
      studentsEnrolled: courseData.studentsEnrolled || [], // Ensure this is an empty array
      status: 'published', // Explicitly use enum value
      isPublished: true, // Match model's isPublished
      createdAt: courseData.createdAt || new Date(),
      updatedAt: courseData.updatedAt || new Date(),
      lastUpdated: courseData.lastUpdated || new Date()
    });

    // Create modules for the course
    const modules = await Module.create(
      courseData.modulesData.map(moduleData => ({
        courseId: course._id,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
        lessons: [], // Will be populated later
        quizzes: [], // Will be populated later
        isPublished: moduleData.isPublished || false,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );

    // Create lessons for each module
    const lessons = [];
    for (let i = 0; i < modules.length; i++) {
      const moduleLessons = await Lesson.create(
        courseData.modulesData[i].lessonsData.map(lessonData => ({
          moduleId: modules[i]._id,
          title: lessonData.title,
          title2: lessonData.title2 || null,
          subtitle: lessonData.subtitle || null,
          content: lessonData.content,
          description: lessonData.description || null,
          videoUrl: lessonData.videoUrl || null,
          videoTitle: lessonData.videoTitle || null,
          duration: lessonData.duration,
          order: lessonData.order,
          note: lessonData.note || null,
          note1: lessonData.note1 || null,
          note2: lessonData.note2 || null,
          note3: lessonData.note3 || null,
          note4: lessonData.note4 || null,
          note5: lessonData.note5 || null,
          note6: lessonData.note6 || null,
          note7: lessonData.note7 || null,
          links: lessonData.links || null,
          resources: lessonData.resources || [],
          image: lessonData.image || null,
          isPublished: lessonData.isPublished || false,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      );
      lessons.push(...moduleLessons);
    }

    // Create quizzes for each module
    const quizzes = [];
    for (let i = 0; i < modules.length; i++) {
      const moduleQuizzes = await Quiz.create(
        courseData.modulesData[i].quizzesData.map(quizData => ({
          moduleId: modules[i]._id,
          title: quizData.title,
          description: quizData.description,
          duration: quizData.duration || 30, // Default duration
          questions: quizData.questions.map(q => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || null,
            points: q.points || 1
          })),
          passingScore: quizData.passingScore || 70,
          maxAttempts: quizData.maxAttempts || 3,
          showExplanation: quizData.showExplanation || true,
          timeLimit: quizData.timeLimit || 30,
          isPublished: quizData.isPublished || false,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      );
      quizzes.push(...moduleQuizzes);
    }

    // Update course with module references
    await Course.findByIdAndUpdate(course._id, {
      modules: modules.map(module => module._id)
    });

    // Update modules with lesson and quiz references
    for (let i = 0; i < modules.length; i++) {
      await Module.findByIdAndUpdate(modules[i]._id, {
        lessons: lessons
          .filter(lesson => lesson.moduleId.equals(modules[i]._id))
          .map(lesson => lesson._id),
        quizzes: quizzes
          .filter(quiz => quiz.moduleId.equals(modules[i]._id))
          .map(quiz => quiz._id)
      });
    }

    // Create Enrollment
    const enrollment = new Enrollment({
      course: course._id,
      student: courseData.studentsEnrolled[0],
      enrollmentDate: new Date('2025-01-15'),
      progress: 0,
      status: 'active',
      moduleProgress: [
        {
          module: modules[0]._id,
          completed: false,
          lessonProgress: [
            {
              lesson: lessons[0]._id,
              completed: false,
              progress: 0
            },
            {
              lesson: lessons[1]._id,
              completed: false,
              progress: 0
            }
          ]
        }
      ]
    });
    await enrollment.save();

    return { course, modules, lessons, quizzes };
  } catch (error) {
    logger.error(`Failed to create complete course: ${courseData.title}`, error);
    throw error;
  }
};

/**
 * Seed data for courses with their complete structure
 * @param {Object} instructor - Instructor to associate with courses
 * @returns {Promise<Array>} Created courses with their components
 */
const createCoursesWithComponents = async (instructor) => {
  try {
    // Clear existing data
    await Promise.all([
      Course.deleteMany({}),
      Module.deleteMany({}),
      Lesson.deleteMany({}),
      Quiz.deleteMany({}),
      User.deleteMany({}) // Ensure users are deleted
    ]);

    // Delete existing categories
    await Category.deleteMany({});

    // Create comprehensive Category
    const category = new Category({
      name: 'Nursing Specialization',
      description: 'Advanced professional development courses for specialized nursing practice, focusing on critical care, diagnostic skills, and evidence-based patient management.',
      icon: '/icons/nursing-specialization.svg',
      order: 1
    });
    await category.save();

    // Create User with comprehensive details
    const student = new User({
      firstName: 'Maria',
      lastName: 'Rodriguez',
      email: 'maria.rodriguez@nursingprofessionals.com',
      password: await bcrypt.hash('SecureNCLEX2025!', 10),
      role: 'student',
      phone: '+1 (415) 555-7890',
      profile: {
        bio: 'Dedicated nursing professional with a passion for cardiovascular care. Currently pursuing advanced certification in cardiac nursing, with a focus on evidence-based patient care and holistic health management.',
        avatar: '/images/students/maria-rodriguez.jpg'
      },
      enrolledCourses: [], // Will be populated dynamically
      progress: {
        completedLessons: [],
        completedModules: [],
        completedQuizzes: [],
        courseProgress: []
      },
      isActive: true,
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2025-01-10')
    });
    await student.save();

    // Create Instructor
    const instructor = new User({
      firstName: 'Elizabeth',
      lastName: 'Hartman',
      email: 'elizabeth.hartman@cardiacnursing.edu',
      password: await bcrypt.hash('ProfessionalEducator2025!', 10),
      role: 'instructor',
      phone: '+1 (650) 123-4567',
      profile: {
        bio: 'Board-certified Cardiovascular Nurse Practitioner with 20+ years of clinical experience. Fellow of the American Heart Association, specializing in advanced cardiac care and nursing education.',
        avatar: '/images/instructors/dr-elizabeth-hartman.jpg'
      },
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2025-01-10')
    });
    await instructor.save();

    const coursesData = [
      {
        title: 'NCLEX Cardiovascular Nursing Mastery',
        description: 'A comprehensive, advanced-level course designed to prepare nursing professionals for the cardiovascular section of the NCLEX examination. This intensive program provides an in-depth exploration of cardiovascular anatomy, pathophysiology, diagnostic techniques, and evidence-based patient care strategies. Students will develop critical thinking skills, advanced clinical reasoning, and comprehensive understanding of cardiovascular health management.',
        category: category.name,
        image: '/images/courses/nclex-cardiovascular-mastery.jpg',
        instructor: {
          name: instructor.firstName + ' ' + instructor.lastName,
          bio: instructor.profile.bio,
          image: instructor.profile.avatar
        },
        level: 'Advanced',
        duration: '12 weeks (180 contact hours)',
        price: 499.99,
        learningOutcomes: [
          'Master advanced cardiovascular assessment techniques',
          'Develop comprehensive understanding of cardiac pathophysiology',
          'Analyze complex cardiac diagnostic procedures',
          'Implement evidence-based interventions for cardiovascular patients',
          'Prepare comprehensively for NCLEX cardiovascular nursing section'
        ],
        studentsEnrolled: [student._id],
        status: 'published',
        isPublished: true,
        createdAt: new Date('2024-11-15'),
        updatedAt: new Date('2025-01-10'),
        lastUpdated: new Date('2025-01-10'),
        modulesData: [
          {
            title: 'Advanced Cardiovascular Anatomy and Physiology',
            description: 'In-depth exploration of cardiac structure, function, and complex physiological mechanisms underlying cardiovascular health and disease.',
            order: 1,
            isPublished: true,
            learningObjectives: [
              'Analyze intricate cardiac anatomical structures',
              'Explain complex cardiovascular physiological mechanisms',
              'Interpret advanced hemodynamic principles',
              'Correlate anatomical variations with clinical manifestations'
            ],
            links: 'https://cardiovascular-research.org/anatomy, https://advanced-nursing-resources.com/cardiac-physiology',
            lessonsData: [
              {
                title: 'Cardiac Structural Complexity',
                title2: 'Advanced Heart Anatomy',
                subtitle: 'Comprehensive Cardiac Structural Analysis',
                content: 'Detailed exploration of advanced cardiac anatomical structures, cellular components, and functional intricacies.',
                description: 'An in-depth, comprehensive lesson on advanced heart anatomy for specialized nursing practice.',
                duration: 120,
                videoUrl: '/videos/advanced-cardiac-anatomy.mp4',
                videoTitle: 'Advanced Cardiac Structural Dynamics',
                order: 1,
                note: 'Critical anatomical structures and their functional significance',
                note1: 'Cellular-level cardiac architecture',
                note2: 'Advanced valvular system mechanics',
                note3: 'Embryological development of cardiac structures',
                note4: 'Structural adaptations in pathological conditions',
                note5: 'Microscopic anatomy of cardiac tissue layers',
                note6: 'Biomechanical properties of cardiac components',
                note7: 'Comparative cardiac anatomy across different physiological states',
                resources: [
                  '/pdfs/advanced-cardiac-anatomy-guide.pdf', 
                  '/pdfs/cardiac-cellular-structure-research.pdf'
                ],
                image: '/images/lessons/advanced-cardiac-anatomy.jpg',
                links: 'https://cardiac-anatomy-research.org/advanced-structures, https://medical-visualization.com/heart-anatomy',
                isPublished: true
              },
              {
                title: 'Cardiovascular Physiological Mechanisms',
                title2: 'Advanced Cardiac Function Dynamics',
                subtitle: 'Complex Hemodynamic Principles',
                content: 'Comprehensive analysis of advanced cardiovascular physiological processes, including intricate hemodynamic interactions and regulatory mechanisms.',
                description: 'Advanced exploration of cardiovascular system dynamics for specialized nursing practice.',
                duration: 150,
                videoUrl: '/videos/advanced-cardiac-physiology.mp4',
                videoTitle: 'Cardiovascular System: Advanced Physiological Interactions',
                order: 2,
                note: 'Complex physiological mechanisms and regulatory systems',
                note1: 'Advanced blood circulation dynamics',
                note2: 'Intricate cardiac cycle regulation',
                note3: 'Neurohormonal modulation of cardiovascular function',
                note4: 'Electrophysiological mechanisms of cardiac contraction',
                note5: 'Cellular signaling in cardiovascular homeostasis',
                note6: 'Adaptive responses in cardiovascular stress conditions',
                note7: 'Integrative physiological control mechanisms',
                resources: [
                  '/pdfs/advanced-cardiovascular-physiology.pdf', 
                  '/pdfs/hemodynamic-principles-research.pdf'
                ],
                image: '/images/lessons/advanced-cardiac-physiology.jpg',
                links: 'https://cardiovascular-physiology-research.org/advanced-mechanisms, https://clinical-cardiac-dynamics.com/physiology',
                isPublished: true
              }
            ],
            quizzesData: [
              {
                title: 'Advanced Cardiovascular Anatomy and Physiology Assessment',
                description: 'Comprehensive evaluation of advanced cardiovascular anatomical and physiological knowledge for specialized nursing practice.',
                duration: 45,
                questions: [
                  {
                    question: 'What is the primary functional mechanism of the sinoatrial node in cardiac electrical conduction?',
                    options: [
                      'Mechanical contraction',
                      'Initiating electrical impulse generation',
                      'Oxygen transportation',
                      'Hormonal regulation'
                    ],
                    correctAnswer: 'Initiating electrical impulse generation',
                    points: 2,
                    explanation: 'The sinoatrial node serves as the heart\'s natural pacemaker, generating electrical impulses that initiate each heartbeat and coordinate cardiac muscle contraction.'
                  },
                  {
                    question: 'Describe the primary function of endothelial cells in cardiovascular homeostasis.',
                    options: [
                      'Muscle contraction',
                      'Blood cell production',
                      'Vascular tone regulation and inflammation modulation',
                      'Hormone secretion'
                    ],
                    correctAnswer: 'Vascular tone regulation and inflammation modulation',
                    points: 2,
                    explanation: 'Endothelial cells play a crucial role in maintaining vascular homeostasis by regulating vascular tone, managing inflammatory responses, and facilitating complex molecular interactions.'
                  }
                ],
                passingScore: 75,
                timeLimit: 45,
                maxAttempts: 3,
                showExplanation: true,
                isPublished: true,
                totalPoints: 4
              }
            ]
          }
        ]
      }
    ];

    // Create courses with their complete components
    const createdCourses = [];
    for (const courseData of coursesData) {
      const completeCourse = await createCompleteCourse(instructor, courseData);
      createdCourses.push(completeCourse);
    }

    return createdCourses;
  } catch (error) {
    logger.error('Failed to create courses with components', error);
    throw error;
  }
};

/**
 * Main seeding function
 */
const seed = async () => {
  try {
    // Connect to database
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/lms_db', 
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    logger.info('Database connected successfully');

    // Clear existing users
    // Removed redundant deletion as it's already handled earlier

    // Create instructor
    const instructor = await User.create({
      firstName: 'Dr. Elizabeth',
      lastName: 'Hartman',
      email: 'elizabeth.hartman@nursingexcellence.org',
      password: await bcrypt.hash('CardiovascularExpert2025!', 10),
      role: 'instructor',
      phone: '+1-888-CARDIAC-CARE',
      profile: {
        bio: 'Board-certified Cardiovascular Nurse Practitioner with 20+ years of clinical experience, specializing in advanced cardiac care and NCLEX preparation. Fellow of the American Heart Association and renowned educator in cardiovascular nursing.',
        avatar: '/images/instructors/dr-elizabeth-hartman.jpg'
      }
    });

    // Create courses with their complete components
    const coursesWithComponents = await createCoursesWithComponents(instructor);

    logger.info('Seeding completed successfully');
  } catch (error) {
    logger.error('Seeding process failed', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

// Execute the seeding process
seed().catch(error => {
  logger.error('Unhandled error in seed process', error);
  process.exit(1);
});