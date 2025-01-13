import React from "react";
import { 
  FaShieldAlt, 
  FaDatabase, 
  FaLock, 
  FaUserShield, 
  FaClipboardList, 
  FaEnvelope 
} from "react-icons/fa";

const PolicySection = ({ icon: Icon, title, children, color = "text-blue-600" }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-6">
    <div className="flex items-center mb-4">
      <Icon className={`text-4xl mr-4 ${color}`} />
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="text-gray-600 space-y-4">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  const lastUpdated = "January 11, 2025";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#006aff] to-[#4d9cff] text-white py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trust is our priority. We are committed to protecting your personal information 
            and maintaining the highest standards of data privacy and security.
          </p>
          <p className="mt-4 text-sm text-white/70">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <PolicySection icon={FaShieldAlt} title="Introduction" color="text-[#006aff]">
          <p>
            At Tenapedia, we understand the importance of privacy. This policy explains how we collect, 
            use, and protect your personal information, ensuring transparency and building trust with our users.
          </p>
        </PolicySection>

        <PolicySection icon={FaDatabase} title="Information We Collect" color="text-green-600">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email, contact details, and professional credentials
            </li>
            <li>
              <strong>Usage Data:</strong> Website interactions, learning progress, and platform engagement
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, device type, browser, and location data
            </li>
          </ul>
        </PolicySection>

        <PolicySection icon={FaLock} title="Data Usage and Protection" color="text-purple-600">
          <p>
            We use your information to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide and personalize educational services</li>
            <li>Improve user experience and platform functionality</li>
            <li>Communicate important updates and educational content</li>
            <li>Ensure platform security and prevent fraudulent activities</li>
          </ul>
          <p className="mt-4">
            We implement robust security measures, including encryption, access controls, 
            and regular security audits to protect your data.
          </p>
        </PolicySection>

        <PolicySection icon={FaUserShield} title="Your Rights" color="text-red-600">
          <p>
            We respect your data rights. You can:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access and download your personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and personal data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact our privacy team.
          </p>
        </PolicySection>

        <PolicySection icon={FaClipboardList} title="Cookies and Tracking" color="text-orange-600">
          <p>
            We use cookies and similar technologies to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enhance user experience</li>
            <li>Analyze platform usage</li>
            <li>Provide personalized content and recommendations</li>
          </ul>
          <p className="mt-4">
            You can manage cookie preferences in your browser settings.
          </p>
        </PolicySection>

        <PolicySection icon={FaEnvelope} title="Contact Us" color="text-indigo-600">
          <p>
            For any privacy-related questions or concerns, please contact our privacy team:
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>Email:</strong> privacy@tenapedia.com</p>
            <p><strong>Phone:</strong> +1 (800) TENAPEDIA</p>
            <p><strong>Address:</strong> 123 Learning Lane, Silicon Valley, CA 94000</p>
          </div>
        </PolicySection>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
