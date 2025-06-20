import React, { useEffect, useState } from 'react'
import img from '../../assets/images/main-img.png'
import {color, motion} from 'framer-motion';
import bgImage from '../../assets/images/main-bg.webp';

import './style.css'
import TestimonialSection from './testimonial';
import EnquiryForm from './enquiryForm';
import AboutUs from './aboutus';
const HomeCom = () => {
    const words = [
        "Mentors",
        "Skill",
        "Teach",
        "Guidance",
        "Inspiration",
        "Support",
        "Goals",
        "Motivation",
        "Success",
        "Learning",
      ];
    
      
    
      const containerSize = 450; // Fixed size of the container
      const radius = containerSize / 2 - 50; // Radius of the circular motion
      const [positions, setPositions] = useState([]);
    
      // Generate initial circular positions
      useEffect(() => {
        const angleStep = (2 * Math.PI) / words.length; // Divide circle into equal angles
        const initialPositions = words.map((_, i) => {
          const angle = i * angleStep;
          return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
          };
        });
        setPositions(initialPositions);
      }, [words, radius]);
    
      const containerStyle = {
        display:'flex',
        zIndex:'999',
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        color: "#02544f",
        fontWeight: "700",
        position: "relative",
        overflow: "visible",
        margin: "0 auto",
        fontFamily: '"Quicksand", serif',

        borderRadius: "50%", // Optional: Make the container visually circular
    
      };
    
      const mainTextStyle = {
        fontSize: "20px",
        fontWeight: "bolder",
        position: "absolute",
        top: "50%",
        left: "60%",
        color:'#000',
        fontFamily: '"Roboto", serif',

        transform: "translate(-50%, -50%)",
      };
    
      const wordStyle = {
        fontSize: "18px",
        position: "absolute",
        textShadow: "10px 10px 2px rgba(0, 0, 0, 0.2)", // Add shadow effect
        
        transition: "all 0.1s ease-in-out", // Smooth transition for hover effects
      };
      
      const hoverStyle = {
        fontSize: "24px", // Bigger font size on hover
      };
       
  return (
    <div className='home'>
        <div className='section'>
        <div style={containerStyle}>
      <motion.div style={mainTextStyle}>Topicwise Institute</motion.div>
      {positions.map((pos, index) => (
        <motion.div
          key={index}
          style={{
            ...wordStyle,
            left: "50%",
            top: "50%",
            x: pos.x,
            y: pos.y,
          }}
          animate={{
            // rotate: [0, 360], // Continuous rotation
            x: [pos.x, pos.x * 0.9, pos.x * 1.1, pos.x], // Circular/spiral movement
            y: [pos.y, pos.y * 0.9, pos.y * 1.1, pos.y],
            color: ["#022b29", "#035450", "#4a807c", "#39b3ac"],

          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {words[index]}
        </motion.div>
      ))}
    </div>
            <div className='right-div'>
               <img src={img} alt='student-img' width={650}/>
            </div>

        </div>
        <div>
         <TestimonialSection/>
        </div>
        <div className='section enquiry'>
          <div className='about-us'>
           <AboutUs/>
          </div>
          <div className='enquiry-form'>
          <EnquiryForm/>

          </div>
        </div>
    </div>
  )
}

export default HomeCom