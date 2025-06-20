import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section style={sectionStyle}>
      <motion.div
        style={contentStyle}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          style={headingStyle}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Best Coaching Centers in Noida for NEET & IIT-JEE
          </motion.h2>
        <motion.p
          style={paragraphStyle}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
Founded in 1988, Aakash IIT & Medical has become one of the best coaching institutes in Noida and many other cities in India. This educational institution for JEE (Main), JEE (Main and Advanced), NEET-UG and Foundation and Olympiad Coaching has been producing excellent results for over 31 years.
<br/>
With our specialized training, we are able to help students realize their dreams and get admission in the engineering and medical colleges of their choice. Our USP is our student-centered approach and our feedback mechanism.
<br/>

The registration process at Aakash is very simple and transparent. This may vary from class to class depending on the needs of the student. The 'Direct Admission' option allows students to enter Aakash directly or by taking one of the scholarship exams held at various time intervals. 


 
        </motion.p>
      </motion.div>
    </section>
  );
};

// Styles
const sectionStyle = {
  backgroundColor: "#f5f5f5",
  textAlign: "left",
  fontFamily:'"Quicksand",serif'
};

const contentStyle = {
  maxWidth: "700px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
    textAlign:"center",
  fontSize: "20px",
  marginBottom: "10px",
  color: "#02544f",
};

const paragraphStyle = {
  fontSize: "16px",
  color: "#333",
  lineHeight: "1.6",
};

export default AboutUs;
