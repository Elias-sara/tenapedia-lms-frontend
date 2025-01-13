"use client";
import React, { useState } from "react";
import { 
  FaEnvelope, 
  FaPhone, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic (e.g., send to API)
    alert("Your message has been sent!");
  };

  const socialLinks = [
    { 
      icon: FaFacebook, 
      name: "Facebook", 
      handle: "@Tenapedia",
      color: "text-blue-600"
    },
    { 
      icon: FaTwitter, 
      name: "Twitter", 
      handle: "@Tenapedia",
      color: "text-sky-500"
    },
    { 
      icon: FaInstagram, 
      name: "Instagram", 
      handle: "@Tenapedia",
      color: "text-pink-600"
    },
    { 
      icon: FaLinkedin, 
      name: "LinkedIn", 
      handle: "Tenapedia",
      color: "text-blue-800"
    }
  ];

  return (
    <div className="bg-[#f9fafb] min-h-screen antialiased w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a4f7c]/95 to-[#1a80b6]/85 opacity-90 blur-sm"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="w-full px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Get in Touch with Tenapedia
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-full mx-auto leading-relaxed px-4">
            Have questions or need assistance? Our dedicated team is here to support your healthcare education journey.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="w-full px-4 py-12 bg-transparent space-y-4">
        {/* Contact Information */}
        <div className="w-full px-4 mb-4">
          <div className="w-full bg-white shadow-lg overflow-hidden border border-gray-100 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-[#0a2342] mb-6 border-b pb-3">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-[#1a80b6] text-2xl" />
                  <div>
                    <p className="font-semibold text-gray-700">Email</p>
                    <a 
                      href="mailto:contact@tenapedia.com" 
                      className="text-[#1a80b6] hover:underline"
                    >
                      contact@tenapedia.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-[#1a80b6] text-2xl" />
                  <div>
                    <p className="font-semibold text-gray-700">Phone</p>
                    <p>+1 234 567 890</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <FaClock className="text-[#1a80b6] text-2xl" />
                  <div>
                    <p className="font-semibold text-gray-700">Business Hours</p>
                    <p>Monday – Friday, 9:00 AM – 5:00 PM (EST)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-[#1a80b6] text-2xl" />
                  <div>
                    <p className="font-semibold text-gray-700">Address</p>
                    <p>123 Health Avenue, Medical City, Country</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full px-4 mb-4">
          <div className="w-full bg-white shadow-lg overflow-hidden border border-gray-100 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-[#0a2342] mb-6 border-b pb-3">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a80b6]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a80b6]"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a80b6]"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a80b6]"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-auto px-8 py-2.5 bg-[#1a80b6] text-white rounded-xl hover:bg-[#0a4f7c] focus:outline-none focus:ring-2 focus:ring-[#1a80b6] transition-colors flex items-center justify-center space-x-2 font-medium text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ease-in-out duration-300 group"
              >
                <FaPaperPlane className="mr-2 transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" /> 
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className="w-full px-4 mb-4">
          <div className="w-full bg-white shadow-lg overflow-hidden border border-gray-100 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-[#0a2342] mb-6 border-b pb-3">
              Follow Us
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialLinks.map((social, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <social.icon className={`${social.color} text-2xl`} />
                  <div>
                    <p className="font-semibold text-gray-700">{social.name}</p>
                    <p className="text-sm text-gray-500">{social.handle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
