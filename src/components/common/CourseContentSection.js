"use client";

import React, { useMemo, useState } from "react";
import { 
  FaBook, 
  FaFlask, 
  FaVirus, 
  FaCheckCircle,
  FaChevronDown
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CourseContentSection = () => {
  // Define topicCategories first
  const topicCategories = [
    { 
      icon: FaBook, 
      color: "text-[#1a80b6]",
      categories: ["Basic Sciences", "Professional Skills"]
    },
    { 
      icon: FaFlask, 
      color: "text-[#fb3467]",
      categories: ["Laboratory Techniques", "Clinical Diagnostics"]
    },
    { 
      icon: FaVirus, 
      color: "text-[#2ecc71]",
      categories: ["Pathology", "Infectious Diseases"]
    }
  ];

  const topics = [
    {
      title: "Basic to Medical Laboratory",
      category: "Basic Sciences",
      details: [
        "Introduction to Laboratory Fundamentals",
        "Essential Laboratory Tools and Techniques",
        "25 Comprehensive Review Questions"
      ],
      link: "/basic-to-medical-laboratory",
    },
    {
      title: "Molecular Biology and Immunology",
      category: "Clinical Diagnostics",
      details: [
        "Advanced DNA-Based Diagnostics",
        "Immune System Comprehensive Analysis",
        "In-Depth Immunological Assessments"
      ],
      link: "/molecular-biology-immunology",
    },
    {
      title: "Bacteriology 1 & 2",
      category: "Pathology",
      details: [
        "Comprehensive Bacterial Identification",
        "Advanced Microbiological Techniques",
        "Clinical Bacteriology Insights"
      ],
      link: "/bacteriology",
    },
    {
      title: "Hematology",
      category: "Laboratory Techniques",
      details: [
        "Blood Science Fundamentals",
        "Advanced Hematological Diagnostics",
        "Comprehensive Blood Analysis"
      ],
      link: "/hematology",
    },
    {
      title: "Virology",
      category: "Infectious Diseases",
      details: [
        "Viral Disease Mechanisms",
        "Advanced Virological Diagnostics",
        "Emerging Viral Pathogen Studies"
      ],
      link: "/virology",
    },
    {
      title: "Clinical Chemistry",
      category: "Clinical Diagnostics",
      details: [
        "Organ Function Assessment",
        "Advanced Biochemical Analysis",
        "Comprehensive Chemical Pathology"
      ],
      link: "/clinical-chemistry",
    },
    {
      title: "Maternity Nursing",
      category: "Nursing",
      details: [
        "Reproductive Anatomy and Physiology",
        "Preconception Care and Family Planning",
        "Pregnancy and Prenatal Care",
        "Antepartum Assessment and Interventions",
        "Labor and Delivery Process",
        "Intrapartum Care and Monitoring",
        "Postpartum Care",
        "Newborn Assessment and Care",
        "Breastfeeding and Infant Nutrition",
        "Maternal Role Adaptation and Psychosocial Needs",
        "Cultural Considerations in Maternity Care",
        "Pain Management During Labor",
        "Complications of Pregnancy and Delivery (Focus on care, not diseases)",
        "Medications in Maternity Nursing",
        "Family Dynamics and Support Systems",
        "Education and Counseling for Mothers and Families",
        "Emergency Situations in Maternity Care"
      ],
      link: "/maternity-nursing",
    },
    {
      title: "Pediatric Nursing",
      category: "Nursing",
      details: [
        "Growth and Development (Milestones and Stages)",
        "Health Promotion and Maintenance in Children",
        "Family-Centered Care",
        "Pediatric Assessment Techniques",
        "Nutrition for Infants, Children, and Adolescents",
        "Immunizations and Preventive Care",
        "Developmental and Behavioral Guidance",
        "Medication Administration in Pediatrics",
        "Pain Assessment and Management in Children",
        "Fluid, Electrolyte, and Acid-Base Balance in Pediatrics",
        "Care of Neonates and Premature Infants",
        "Pediatric Safety and Injury Prevention",
        "Hospitalization and Family Support",
        "Play Therapy and Psychosocial Care",
        "End-of-Life Care in Pediatrics",
        "Emergency and Critical Care for Children",
        "Health Education for Children and Families"
      ],
      link: "/pediatric-nursing",
    },
    {
      title: "Fundamentals of Nursing",
      category: "Nursing",
      details: [
        "Nursing Process",
        "Therapeutic Communication",
        "Infection Control and Asepsis",
        "Hygiene and Personal Care",
        "Vital Signs Assessment",
        "Safety and Mobility",
        "Comfort and Pain Management",
        "Nutrition and Hydration",
        "Elimination (Urinary and Bowel)",
        "Skin Integrity and Wound Care",
        "Medication Administration",
        "Documentation and Informatics",
        "Ethics and Legal Issues in Nursing",
        "Cultural Competence in Care",
        "Health Assessment Techniques",
        "Patient Education and Advocacy",
        "Perioperative Nursing (Pre, Intra, Post)",
        "End-of-Life Care",
        "Care for Diverse Populations (Age-Specific and Special Needs)",
        "Time Management and Prioritization"
      ],
      link: "/fundamentals-of-nursing",
    },
    {
      title: "NCLEX RN - Medical-Surgical",
      category: "Nursing",
      details: [
        "Cardiovascular System",
        "Respiratory System",
        "Neurological System",
        "Gastrointestinal System",
        "Renal and Urinary System",
        "Endocrine System",
        "Musculoskeletal System",
        "Hematologic and Immune Systems",
        "Integumentary System",
        "Reproductive System",
        "Oncology Nursing (Cancer Care)",
        "Perioperative Nursing (Pre, Intra, and Postoperative Care)",
        "Fluid and Electrolyte Balance",
        "Acid-Base Imbalances",
        "Infection Control and Prevention",
        "Emergency and Disaster Nursing",
        "Pain Management",
        "Pharmacology for Medical-Surgical Patients"
      ],
      link: "/nclex-rn-medical-surgical",
    },
    {
      title: "Public Health",
      category: "Health Science",
      details: [
        "Health Education",
        "Disaster Prevention",
        "Anatomy",
        "Clinical Biochemistry",
        "Medical Microbiology",
        "Health Informatics",
        "Population and Development",
        "Human Nutrition",
        "Reproductive Health",
        "Biostatistics",
        "Environmental Health & Ecology",
        "Epidemiology",
        "Health Service Management",
        "Embryology and Histology",
        "Health Ethics, Legal Medicine & Public Health"
      ],
      link: "/public-health",
    },
    {
      title: "Medicine Course Outline",
      category: "Health Science",
      details: [
        "Anatomy",
        "Histology",
        "Embryology",
        "Physiology",
        "Biochemistry",
        "Microbiology",
        "Immunology",
        "Pathology",
        "Pharmacology",
        "Genetics and Molecular Biology",
        "Epidemiology and Public Health",
        "Medical Ethics",
        "Parasitology",
        "Internal Medicine",
        "Surgery",
        "Pediatrics",
        "Obstetrics and Gynecology",
        "Psychiatry",
        "Emergency Medicine",
        "Minor Courses",
        "Radiology",
        "Ophthalmology",
        "Dermatology",
        "ENT (Ear, Nose, Throat)"
      ],
      link: "/medicine-course-outline",
    },
    {
      title: "Pharmacy Course Outline",
      category: "Pharmacy",
      details: [
        "Introductory Pharmacy",
        "Pharmaceutical Calculations",
        "Pharmacognosy and Alternative Medicine",
        "Chemistry of Natural Products",
        "Pharmacognosy",
        "Complementary and Alternative Medicine",
        "Dosage Form Sciences",
        "Integrated Physical Pharmacy and Pharmaceutics I & II",
        "Pharmacology I & II",
        "Applied Toxicology",
        "Medicinal Chemistry I & II",
        "Pharmaceutical Analysis I & II",
        "Pharmaceutical Technology",
        "Industrial Pharmacy",
        "Immunological and Biological Products",
        "Social and Administrative Pharmacy",
        "Health Service Management and Policies",
        "Pharmacoeconomics",
        "Drug Supply Management",
        "Biopharmaceutics and Clinical Pharmacokinetics",
        "Pharmacotherapeutics",
        "Pharmacy Practice",
        "Drug Informatics",
        "Communication Skills for Pharmacists",
        "Pharmacy Law and Ethics",
        "First Aid and Nutrition"
      ],
      link: "/pharmacy-course-outline",
    }
  ];

  // State to manage expanded view
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Shuffle topics randomly on each render
  const shuffledTopics = useMemo(() => {
    return topics
      .map(topic => ({
        ...topic,
        // Shuffle details for each topic
        details: topic.details
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }))
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }, []);

  // Function to render course card
  const renderCourseCard = (topic, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={`
        ${index % 3 === 0 ? 'bg-[#1a80b6]/10' : 
          index % 3 === 1 ? 'bg-[#fb3467]/10' : 
          'bg-[#2ecc71]/10'} 
        rounded-xl p-6 shadow-lg hover:shadow-xl 
        transition-all duration-300 transform hover:-translate-y-2 
        flex flex-col group`}
    >
      <div className="flex items-center mb-4">
        <FaBook 
          className={`text-4xl mb-3 
            ${index % 3 === 0 ? 'text-[#1a80b6]' : 
              index % 3 === 1 ? 'text-[#fb3467]' : 
              'text-[#2ecc71]'}
            group-hover:scale-110 transition-transform`} 
        />
      </div>
      <h3 className={`
        text-xl font-bold 
        ${index % 3 === 0 ? 'text-[#1a80b6]' : 
          index % 3 === 1 ? 'text-[#fb3467]' : 
          'text-[#2ecc71]'}
        mb-3`}>
        {topic.title}
      </h3>
      
      <p className="text-gray-700 mb-4 flex-grow">
        {topic.category}
      </p>

      <ul className="space-y-2 mb-4 h-[108px] overflow-hidden">
        {topic.details.slice(0, 3).map((detail, idx) => (
          <li 
            key={idx} 
            className="flex items-center text-gray-600 text-sm"
          >
            <FaCheckCircle 
              className={`mr-2 
                ${index % 3 === 0 ? 'text-[#1a80b6]' : 
                  index % 3 === 1 ? 'text-[#fb3467]' : 
                  'text-[#2ecc71]'}`} 
            />
            {detail}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            ኮርሶቹ በመጠኑ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            የሕክምና ትምህርትዎን ለመደገፍ የተዘጋጁ ሁሉን አቀፍ የኮርስ ዝርዝሮች
          </p>
        </motion.div>

        {/* Course Grid */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {shuffledTopics.slice(0, showAllCourses ? undefined : 6).map(renderCourseCard)}
          </motion.div>
        </AnimatePresence>

        {/* View More Text */}
        {!showAllCourses && shuffledTopics.length > 6 && (
          <div className="text-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#1a80b6] cursor-pointer hover:text-[#1a80b6]/80 
                font-semibold text-lg flex items-center justify-center 
                transition-all duration-300 ease-in-out"
              onClick={() => setShowAllCourses(true)}
            >
              <span className="mr-2">ተጨማሪ ኮርሶችን ይመልከቱ</span>
              <FaChevronDown className="text-[#1a80b6]" />
            </motion.span>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseContentSection;
