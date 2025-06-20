import { Modal } from '@mui/material';
import React, { useState } from 'react'
import { API_ENDPOINTS } from '../../../utils/api-endpoints';
import axios from 'axios';

const Otpverify = (props) => {
  const {open,setOpen,token} = props;
  const [otp,setOtp] = useState('');
  console.log(props,"uwhedjha");
  const [isloading,setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const payload = {
        otp:otp,
        activationToken:token
      }
      const response = await axios.post(API_ENDPOINTS.VERIFY_USER, payload);

      if (response.status === 200) {
        console.log("Response data:", response.data);
        // Handle success logic, e.g., close modal, show success message
                setOpen(false);

       
      }
    } catch (error) {
      console.error("Error during sign-up/login:", error);
      // Show error feedback to the user
    } finally {
      setIsLoading(false);
    }
  };
  return (
<Modal open={open} >
    <div className='modalStyle'>
        <h4>Otp Verify!</h4>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder='Enter Otp'
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              required
            />
             <button type="submit" disabled={isloading} className="common-btn">
              {isloading ? "Please Wait..." : "Submit"}
            </button>
        </form>
    </div>
</Modal>
)
}

export default Otpverify;