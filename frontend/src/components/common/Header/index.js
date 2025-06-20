import React, { useState } from 'react'
import header from '../../../assets/images/logo.png'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SignUpModal from '../../Modals/Auth/signup.js';
// color #072523
const HeaderComp = () => {
    const [open, setOpen] = useState(false);
  
  return (
    <>
    <div className='header'>
        <div className='logo'>
            <span><img src={header} alt="logo" width={60} />
            </span>
            <span >Topicwise Institute</span>
        </div>

        <div className='subMenu'>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/about-us'>About Us</a></li>
            <li><a href='/contact-us'>Contact Us</a></li>
            <li><a href='/'>Courses</a></li>
            <li  onClick={() => setOpen(true)}><span>
            <AccountCircleRoundedIcon size={50}/>
            
            </span></li>

          </ul>
        </div>

</div>
<SignUpModal open={open} setOpen={(e)=>setOpen(e)}/>

    </>
  )
}

export default HeaderComp;