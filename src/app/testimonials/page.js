import React from "react";
import { FaQuoteLeft, FaStar, FaUserMd, FaGraduationCap } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Jessica Williams",
      text: "Tenapedia's comprehensive medical resources have revolutionized how we approach continuous professional development. The depth and quality of content are unparalleled.",
      role: "Medical Director, Advanced Healthcare Solutions",
      image: "/images/testimonial-1.jpg",
      rating: 5,
      icon: FaUserMd
    },
    {
      name: "Michael Rodriguez",
      text: "As a medical laboratory student, Tenapedia has been my ultimate learning companion. The interactive modules and real-world case studies are game-changers.",
      role: "Medical Laboratory Science Candidate",
      image: "/images/testimonial-2.jpg",
      rating: 5,
      icon: FaGraduationCap
    },
    {
      name: "Emily Chen, PhD",
      text: "The platform's cutting-edge approach to medical education bridges the gap between theoretical knowledge and practical application. Truly innovative.",
      role: "Research Scientist, Medical Innovations Institute",
      image: "/images/testimonial-3.jpg",
      rating: 5,
      icon: FaUserMd
    },
    {
      name: "David Thompson",
      text: "Tenapedia's commitment to up-to-date, evidence-based content has been instrumental in my professional growth and continuous learning journey.",
      role: "Senior Clinical Researcher",
      image: "/images/testimonial-4.jpg",
      rating: 5,
      icon: FaGraduationCap
    }
  ];

  return (
    <section className="bg-gradient-to-br from-[#f4f7fa] to-[#e6eef5] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a80b6] mb-6 tracking-tight">
            Professional Voices of Excellence
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Discover insights from medical professionals who have transformed their 
            learning and career trajectory through Tenapedia's innovative educational platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl 
                         transition-all duration-400 transform hover:-translate-y-3 
                         border border-[#1a80b6]/10 hover:border-[#1a80b6]/20"
            >
              <div className="flex items-start mb-6">
                <testimonial.icon className="text-[#1a80b6] text-4xl mr-4 opacity-70" />
                <p className="text-gray-800 leading-relaxed font-medium italic">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center border-t border-gray-200 pt-4">
                <div className="mr-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    width={70} 
                    height={70} 
                    className="rounded-full object-cover border-2 border-[#1a80b6]/20" 
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {testimonial.role}
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className="text-yellow-400 text-sm" 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/reviews"
            className="bg-[#1a80b6] text-white py-4 px-10 rounded-xl 
              text-lg font-semibold hover:bg-[#0f5b8a] 
              transition-all duration-300 
              transform hover:scale-105 shadow-lg hover:shadow-xl 
              inline-flex items-center group"
          >
            Explore More Reviews
            <svg 
              className="ml-3 group-hover:translate-x-2 transition-transform" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
