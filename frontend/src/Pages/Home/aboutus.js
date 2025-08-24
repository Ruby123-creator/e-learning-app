import React from "react";
import { motion } from "framer-motion";
import directorImg from "../../assets/images/director.jpg"; // Update path as needed

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
    <section className="about-section">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left: Text Content */}
        <div className="about-text">
          <motion.h2 className="about-heading" variants={textVariants}>
            Our Journey: A Note from the Founder
          </motion.h2>
          <motion.p
            className="about-paragraph"
            variants={textVariants}
            transition={{ delay: 0.3 }}
          >
            In 2017, I began my journey as an educator, working with various
            well-known institutions. During this time, I closely observed a
            critical gap in the way Science was being taught — it was largely
            theoretical, lacking practical connection and real-life understanding.
            Students were expected to memorize without ever seeing an experiment
            live, and that deeply concerned me.
            <br /><br />
            In 2024, that vision took shape when I established TOPICWISE INSTITUTE
            — a place where education is not just about books, but about
            experiencing concepts. Whether it's conducting live science
            experiments, solving math with smart tricks, or simplifying complex
            Social Science topics with easy-to-remember techniques, every method
            we use is student-focused and result-driven.
          </motion.p>
        </div>

        {/* Right: Director Image */}
        <motion.div
          className="about-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={directorImg} alt="Director" className="director-img" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
