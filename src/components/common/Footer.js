"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaGraduationCap, 
  FaTwitter, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram,
  FaPaperPlane, 
  FaCheckCircle, 
  FaExclamationTriangle 
} from "react-icons/fa";

const Footer = () => {
  // State for email subscription
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    status: null,
    message: ''
  });
  const [subscribedEmails, setSubscribedEmails] = useState([]);

  // Load subscribed emails from local storage on component mount
  useEffect(() => {
    const storedEmails = localStorage.getItem('subscribedEmails');
    if (storedEmails) {
      setSubscribedEmails(JSON.parse(storedEmails));
    }
  }, []);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Reset subscription status when user starts typing again
    if (subscriptionStatus.status) {
      setSubscriptionStatus({ status: null, message: '' });
    }
  };

  // Handle subscription submission
  const handleSubscribe = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus({
        status: 'error',
        message: 'ልክ የሆነ ኢሜይል አድራሻ እባክዎ ያስገቡ'
      });
      return;
    }

    // Check if email is already subscribed
    if (subscribedEmails.includes(email)) {
      setSubscriptionStatus({
        status: 'error',
        message: 'ይህ ኢሜይል አድራሻ already ተመዝግቧል'
      });
      return;
    }

    // Add email to subscribed list
    const updatedSubscribedEmails = [...subscribedEmails, email];
    setSubscribedEmails(updatedSubscribedEmails);
    
    // Save to local storage
    localStorage.setItem('subscribedEmails', JSON.stringify(updatedSubscribedEmails));

    // Set success status
    setSubscriptionStatus({
      status: 'success',
      message: 'በስኬስ ተመዝግበዋል! የቅርብ የኮርስ መረጃ ይደርስዎታል።'
    });

    // Clear email input
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: "Courses", href: "/courses" },
      { label: "Instructors", href: "/instructors" },
      { label: "Resources", href: "/resources" },
      { label: "Pricing", href: "/pricing" }
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" }
    ],
    Legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" }
    ]
  };

  const socialLinks = [
    { icon: FaTwitter, href: "https://twitter.com/tenapedia" },
    { icon: FaLinkedin, href: "https://linkedin.com/company/tenapedia" },
    { icon: FaFacebook, href: "https://facebook.com/tenapedia" },
    { icon: FaInstagram, href: "https://instagram.com/tenapedia" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#1a80b6] to-[#2196f3] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-2xl font-bold mb-4"
            >
              <FaGraduationCap className="text-3xl" />
              <span>Tenapedia</span>
            </Link>
            <p className="text-white/80 mb-4">
              Empowering medical professionals through innovative, 
              comprehensive learning experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-2xl text-white/80 hover:text-white 
                    transition-colors duration-300
                  "
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Link Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-lg font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="
                        text-white/80 hover:text-white 
                        hover:underline transition-colors duration-300
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <h4 className="text-lg font-bold mb-4">ዘመናዊ ይሁኑ</h4>
            <p className="text-gray-600 mb-4">
              የቅርብ ኮርሶች፣ ልዩ ቅናሾች እና የትምህርት መረጃዎችን ለማግኘት ኢሜይልዎን ይመዝገቡ
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <input 
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="ኢሜይል አድራሻዎ"
                  className={`w-full p-3 rounded-lg border 
                    ${subscriptionStatus.status === 'error' 
                      ? 'border-red-500 focus:ring-red-500' 
                      : subscriptionStatus.status === 'success' 
                      ? 'border-green-500 focus:ring-green-500' 
                      : 'border-gray-300 focus:ring-[#1a80b6]'} 
                    focus:outline-none focus:ring-2
                    text-gray-800`}
                />
                {subscriptionStatus.status === 'error' && (
                  <FaExclamationTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                )}
                {subscriptionStatus.status === 'success' && (
                  <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1a80b6] text-white p-3 rounded-lg 
                  flex items-center justify-center gap-2 
                  hover:bg-[#1a80b6]/90 transition-all"
              >
                <FaPaperPlane />
                <span>ይመዝገቡ</span>
              </motion.button>
            </form>
            
            {/* Subscription Status Message */}
            {subscriptionStatus.message && (
              <p className={`mt-3 text-sm ${
                subscriptionStatus.status === 'success' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {subscriptionStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80">
            {currentYear} Tenapedia. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
