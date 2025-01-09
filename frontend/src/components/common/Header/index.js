import React from 'react'
import header from '../../../assets/images/logo.png'
// color #072523
const HeaderComp = () => {
  return (
    <div className='header'>
        <div className='logo'>
            <span><img src={header} alt="logo" width={80} />
            </span>
            <span >Topicwise Institute</span>
        </div>

        <div className='subMenu'>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/'>About Us</a></li>
            <li><a href='/'>Contact Us</a></li>
            <li><a href='/'>Lectures</a></li>

          </ul>
        </div>
</div>
  )
}

export default HeaderComp;