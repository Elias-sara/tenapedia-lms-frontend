//components/common/TestimonialSection.js
import React from "react";
import Marquee from "@/components/ui/marquee";

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
    <section id="testimonials" className="bg-gray-100 py-16 px-8">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">
          What Our Medical Laboratory Students and Professionals Say
        </h3>

        <Marquee pauseOnHover className="[--duration:20s]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-lg rounded-lg max-w-xs"
            >
              <p className="text-lg mb-4">{testimonial.quote}</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.course}</p>
            </div>
          ))}
        </Marquee>

        {/* View More Reviews Button */}
        <div className="mt-8">
          <a
            href="#"
            className="bg-yellow-500 text-gray-800 py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            View More Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
