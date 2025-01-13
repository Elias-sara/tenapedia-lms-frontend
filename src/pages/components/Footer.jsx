import React from "react";
import { FaGooglePlay, FaAppStore } from "react-icons/fa"; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto text-center">
        <div className="flex flex-wrap justify-center space-x-8">
          {" "}
          {/* Flexbox to display items in a row and wrap if needed */}
          {/* Company Links */}
          <div className="text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/faq"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Privacy Policy & Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  See Pricing & Plans
                </a>
              </li>
              <li>
                <a
                  href="/reviews"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          {/* Tenapedia Medical Resources Links */}
          <div className="text-left">
            <h4 className="text-lg font-semibold text-white mb-4">
              Tenapedia Medical Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/nursing-school"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Nursing School
                </a>
              </li>
              <li>
                <a
                  href="/nclex-prep"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  NCLEX Prep
                </a>
              </li>
              <li>
                <a
                  href="/nclex-pn-prep"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  NCLEX-PN® Prep
                </a>
              </li>
              <li>
                <a
                  href="/teas"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  TEAS
                </a>
              </li>
              <li>
                <a
                  href="/free-resources"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Free Resources
                </a>
              </li>
              <li>
                <a
                  href="/nursing-resume-template"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Nursing Resume Template
                </a>
              </li>
            </ul>
          </div>
          {/* Additional Medical Resources Links */}
          <div className="text-left">
            <h4 className="text-lg font-semibold text-white mb-4">
              Additional Medical Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/blog"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  The Tenapedia Blog
                </a>
              </li>
              <li>
                <a
                  href="/marketing-materials"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                Materials
                </a>
              </li>
              <li>
                <a
                  href="/head-to-toe-assessment"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Head to Toe Assessment
                </a>
              </li>
              <li>
                <a
                  href="/nursing-care-plans"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Nursing Care Plans
                </a>
              </li>
              <li>
                <a
                  href="/nclex-practice-questions"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  NCLEX Practice Questions
                </a>
              </li>
              <li>
                <a
                  href="/next-gen-nclex-questions"
                  className="hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Next Gen NCLEX Questions
                </a>
              </li>
            </ul>
          </div>
          {/* Connect With Us Links */}
          <div className="text-left">
            <h4 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <FaGooglePlay className="inline-block mr-2" /> Get it on Google
                Play
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <FaAppStore className="inline-block mr-2" /> Download on the App
                Store
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-xs text-gray-500">
          <p>© 2024 Tenapedia. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
