import React from "react";
import { motion } from "framer-motion";
import profile from "../../assets/images/profile.png"
const testimonials = [
  {
    name: "Alice Johnson",
    role: "Software Engineer",
    testimonial:
      "This platform has been a game-changer for my learning journey. Highly recommended!",
  },
  {
    name: "John Doe",
    role: "Product Manager",
    testimonial:
      "I love how intuitive and user-friendly the UI is. The experience has been seamless.",
  },
  {
    name: "Emma Wilson",
    role: "UX Designer",
    testimonial:
      "The community and resources provided here are outstanding. Five stars from me!",
  },
  {
    name: "Emma Wilson",
    role: "UX Designer",
    testimonial:
      "The community and resources provided here are outstanding. Five stars from me!",
  },
];

const TestimonialSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>What Our Student Says</h2>
      <motion.div
        style={containerStyle}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {testimonials.map((item, index) => (
          <motion.div key={index} style={testimonialCardStyle} variants={itemVariants}>
            <div style={profileStyle}>
              <img src={profile} alt="profile-icon" width={50}/>
            </div>
            <p style={testimonialTextStyle}>"{item.testimonial}"</p>
            <h4 style={nameStyle}>{item.name}</h4>
            <p style={roleStyle}>{item.role}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// Styles
const sectionStyle = {
  textAlign: "center",
  padding: "50px 20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  margin: "20px auto",
  padding:"10px 20px",
  maxWidth: "1100px",
};
 const profileStyle ={
  display:"flex",
  justifyContent:"center"
 };
const headerStyle = {
  fontSize: "28px",
  marginBottom: "30px",
  color: "#02544f",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
//   flexWrap: "wrap",
};

const testimonialCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "250px",
  textAlign: "left",
};

const testimonialTextStyle = {
  fontSize: "16px",
  fontStyle: "italic",
  marginBottom: "15px",
  color: "#333",
};

const nameStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#02544f",
};

const roleStyle = {
  fontSize: "14px",
  color: "#666",
};

export default TestimonialSection;
