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
          Our Journey: A Note from the Founder
        </motion.h2>
        <motion.p
          style={paragraphStyle}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          In 2017, I began my journey as an educator, working with various
          well-known institutions. During this time, I closely observed a
          critical gap in the way Science was being taught — it was largely
          theoretical, lacking practical connection and real-life understanding.
          Students were expected to memorize without ever seeing an experiment
          live, and that deeply concerned me.
          <br />
         
          <br />
          In 2024, that vision took shape when I established TOPICWISE INSTITUTE
          — a place where education is not just about books, but about
          experiencing concepts. Whether it's conducting live science
          experiments, solving math with smart tricks, or simplifying complex
          Social Science topics with easy-to-remember techniques, every method
          we use is student-focused and result-driven.
          <br />
         
        </motion.p>
      </motion.div>
    </section>
  );
};

// Styles
const sectionStyle = {
  backgroundColor: "#f5f5f5",
  textAlign: "left",
  fontFamily: '"Quicksand",serif',
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
  textAlign: "center",
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
