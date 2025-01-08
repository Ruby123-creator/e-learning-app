import React from 'react'
import header from '../../../assets/images/logo.png'
// color #072523
const HeaderComp = () => {
  return (
    <div className='header'>
        <div className='logo'>
            <span><img src={header} alt="logo" width={100} />
            </span>
            <span >Topicwise Institute</span>
        </div>
</div>
  )
}

export default HeaderComp;