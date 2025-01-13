import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mekdes Tadesse",
      course: "Basic to Medical Laboratory",
      image: "/images/testimonial-1.jpg",
      quote: "The Basic to Medical Laboratory course transformed my understanding of laboratory fundamentals. The comprehensive review questions and essential techniques gave me the confidence I needed to excel in my medical laboratory studies.",
      rating: 5
    },
    {
      name: "Abebe Bekele",
      course: "Molecular Biology and Immunology",
      image: "/images/testimonial-2.jpg",
      quote: "Diving into the Molecular Biology and Immunology course was a game-changer. The in-depth immunological assessments and DNA-based diagnostics provided me with cutting-edge insights into clinical research.",
      rating: 5
    },
    {
      name: "Tigist Getachew",
      course: "Bacteriology 1 & 2",
      image: "/images/testimonial-3.jpg",
      quote: "The Bacteriology course was incredibly comprehensive. Learning advanced microbiological techniques and bacterial identification methods has been crucial for my clinical microbiology career.",
      rating: 5
    },
    {
      name: "Yohannes Mesfin",
      course: "Hematology",
      image: "/images/testimonial-4.jpg",
      quote: "Blood science has never been clearer! The Hematology course's advanced diagnostics and comprehensive blood analysis gave me a profound understanding of hematological principles.",
      rating: 5
    },
    {
      name: "Selam Assefa",
      course: "Maternity Nursing",
      image: "/images/testimonial-5.jpg",
      quote: "The Maternity Nursing course is a comprehensive guide to reproductive health. From prenatal care to postpartum support, every aspect is covered with incredible depth and sensitivity.",
      rating: 5
    },
    {
      name: "Dawit Kebede",
      course: "Pediatric Nursing",
      image: "/images/testimonial-6.jpg",
      quote: "Understanding child health has never been more important. The Pediatric Nursing course provides an incredible framework for comprehensive child care, from developmental stages to critical interventions.",
      rating: 5
    },
    {
      name: "Bethel Haile",
      course: "Public Health",
      image: "/images/testimonial-7.jpg",
      quote: "The Public Health course opened my eyes to the broader aspects of healthcare. From epidemiology to health informatics, I've gained a holistic understanding of population health management.",
      rating: 5
    },
    {
      name: "Ermias Wolde",
      course: "Medicine Course Outline",
      image: "/images/testimonial-8.jpg",
      quote: "Navigating through the Medicine Course Outline was like having a roadmap to medical excellence. The comprehensive coverage from anatomy to clinical practice has been invaluable in my medical education journey.",
      rating: 5
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            የስኬት ድምፆች
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          የሕክምና ላብራቶሪ ባለሙያዎች ከቴናፔዲያ ጋር የመማር ጉዞ ያገኙት ለውጥ ከራሳቸው ይስሙ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-2 
                         flex flex-col"
            >
              <div className="flex items-start mb-4">
                <FaQuoteLeft className="text-[#1a80b6] text-3xl mr-4 opacity-50" />
                <p className="text-gray-700 leading-relaxed italic">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-auto flex items-center">
                <div className="mr-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    width={60} 
                    height={60} 
                    className="rounded-full object-cover" 
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {testimonial.course}
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

        <div className="text-center mt-12">
          <Link
            href="/testimonials"
            className="bg-[#fb3467] text-white py-3 px-8 rounded-lg 
              text-lg font-semibold hover:bg-[#1a80b6] 
              transition-colors duration-300 
              transform hover:scale-105 shadow-md"
          >
            View More Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
