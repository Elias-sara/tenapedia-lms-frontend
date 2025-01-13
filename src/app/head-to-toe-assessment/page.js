import React from "react";
import { 
  FaStethoscope, 
  FaHeartbeat, 
  FaNotesMedical, 
  FaUserMd, 
  FaClipboardList 
} from "react-icons/fa";

const AssessmentSection = ({ icon: Icon, title, children, color = "text-blue-600" }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-8">
    <div className="flex items-center mb-4">
      <Icon className={`text-4xl mr-4 ${color}`} />
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="text-gray-600 space-y-4">
      {children}
    </div>
  </div>
);

const HeadToToeAssessment = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#006aff] to-[#4d9cff] text-white py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Head-to-Toe Assessment
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A comprehensive guide to performing a systematic and thorough patient examination, 
            essential for accurate diagnosis and effective patient care.
          </p>
        </div>
      </section>

      {/* Assessment Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <AssessmentSection icon={FaStethoscope} title="What is a Head-to-Toe Assessment?" color="text-[#006aff]">
          <p>
            A head-to-toe assessment is a comprehensive physical examination performed by healthcare 
            professionals to evaluate a patient's overall health status. This systematic approach 
            helps identify potential health issues, guide treatment plans, and ensure patient safety.
          </p>
        </AssessmentSection>

        <AssessmentSection icon={FaClipboardList} title="Steps in Head-to-Toe Assessment" color="text-green-600">
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <strong>General Appearance:</strong> Assess patient's overall condition, 
              including posture, hygiene, mental status, and signs of distress.
            </li>
            <li>
              <strong>Head and Neck:</strong> Examine cranial nerves, assess symmetry, 
              check eyes, ears, nose, and throat for any abnormalities.
            </li>
            <li>
              <strong>Respiratory System:</strong> Evaluate breathing patterns, 
              auscultate lung sounds, and check for any respiratory distress.
            </li>
            <li>
              <strong>Cardiovascular Assessment:</strong> Check pulse, blood pressure, 
              heart sounds, and assess for any cardiac irregularities.
            </li>
            <li>
              <strong>Abdominal Examination:</strong> Perform inspection, auscultation, 
              and palpation to check for tenderness, masses, or abnormal sounds.
            </li>
            <li>
              <strong>Musculoskeletal System:</strong> Assess joint mobility, muscle strength, 
              reflexes, and check for any signs of pain or limitation.
            </li>
            <li>
              <strong>Neurological Evaluation:</strong> Test motor function, sensory responses, 
              and assess overall neurological health.
            </li>
          </ol>
        </AssessmentSection>

        <AssessmentSection icon={FaHeartbeat} title="Clinical Significance" color="text-purple-600">
          <p>
            A thorough head-to-toe assessment is crucial for:
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>Early detection of potential health issues</li>
            <li>Establishing baseline patient health status</li>
            <li>Guiding diagnostic and treatment decisions</li>
            <li>Monitoring patient progress and recovery</li>
            <li>Ensuring comprehensive and holistic patient care</li>
          </ul>
        </AssessmentSection>

        <AssessmentSection icon={FaUserMd} title="Best Practices" color="text-red-600">
          <p>
            To ensure an effective and professional head-to-toe assessment:
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              Maintain a systematic and consistent approach
            </li>
            <li>
              Create a comfortable and respectful environment for the patient
            </li>
            <li>
              Communicate clearly and obtain informed consent
            </li>
            <li>
              Document findings accurately and comprehensively
            </li>
            <li>
              Collaborate and share relevant information with the healthcare team
            </li>
          </ul>
        </AssessmentSection>

        <AssessmentSection icon={FaNotesMedical} title="Documentation Tips" color="text-orange-600">
          <p>
            Effective documentation is key to maintaining continuity of care:
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              Use clear, concise, and objective language
            </li>
            <li>
              Record both normal and abnormal findings
            </li>
            <li>
              Include specific measurements and observations
            </li>
            <li>
              Note any patient concerns or reported symptoms
            </li>
            <li>
              Ensure timely and accurate record-keeping
            </li>
          </ul>
        </AssessmentSection>
      </div>
    </div>
  );
};

export default HeadToToeAssessment;
