import React, { useEffect, useState } from 'react'
import img from '../../assets/images/main-img.png'
import {color, motion} from 'framer-motion';



import TestimonialSection from './testimonial';
import EnquiryForm from './enquiryForm';
import AboutUs from './aboutus';
import Teaches from './Teachers';
import Information from './subject';
import Exam from './Exam';
const HomeCom = () => {
  
    
      
    
   
       
  return (
    <div className='home'>
        <div className='section'>
       
            <div className='right-div'>
               <img src={img} alt='student-img' className='student-img'/>
            </div> 

        </div>
         <div className='section enquiry'>
          <div className='about-us'>
           <AboutUs/>
          </div>
          {/* <div className='enquiry-form'>
         

          </div> */}
          
        </div>
        <div>
         
         <Teaches/>
        </div>
       
        <div>
          <Information/>
        </div>
        <div>
          <Exam/>
        </div>
    </div>
  )
}

export default HomeCom