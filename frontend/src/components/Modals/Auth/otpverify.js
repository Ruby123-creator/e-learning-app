import { Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { API_ENDPOINTS } from "../../../utils/api-endpoints";
import axios from "axios";
import toaster from "../../common/toaster";

const Otpverify = (props) => {
  const { openVerify, setOpenVerify, token, formData} = props;
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
   console.log(openVerify,"Rubyyyy")
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
     setOpenVerify(false);
    const otp = otpDigits.join("");
    if (otp.length !== 6) return alert("Please enter all 6 digits");

    setIsLoading(true);
    try {
      const payload = {
        otp,
        activationToken: token,
        ...formData,
      };
      const response = await axios.post(API_ENDPOINTS.VERIFY_USER, payload);

      if (response.status === 201) {
        console.log("Verified successfully");
         toaster("User Registered Successfully")
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={openVerify} onClose={() => setOpenVerify(false)}>
      <div className="modalStyle">
        <h4>OTP Verification</h4>
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-boxes">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" disabled={isLoading} className="common-btn">
            {isLoading ? "Verifying..." : "Submit"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default Otpverify;
