import React, { useState } from "react";
import "./Login.css";
import axios from "../../api/axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function Verification() {
  const [err, setErr] = useState(null);
  const [country_code, setCountry_code] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const phoneChangeHandler = (value) => {
    console.log(value);
    let country_code = value.slice(0, 2);
    let phoneNumber = value.slice(2);
    setCountry_code(country_code);
    setPhoneNumber(phoneNumber);
  };

  const verifyPhoneHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(country_code);
      console.log(phoneNumber);
      const response = await axios.post("/sendOtp", {
        country_code,
        phone: phoneNumber,
      });
      console.log(response);
      // if(response.data.result)
      setOtpSent(true);
      setTimeout(() => {
        setOtpSent(true);
      }, 7 * 1000);
    } catch (error) {
      setErr(error.response.data.body);
      setTimeout(() => {
        setErr(null);
      }, 7 * 1000);
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/verify", { phone: phoneNumber, otp });
      navigate("/login", {state: { phone: phoneNumber }});
    } catch (error) {
      setErr(error.response.data.body);
      setTimeout(() => {
        setErr(null);
      }, 7 * 1000);
    }
  };

  return (
    <div className="verificationBox">
      <h1>Phone Verification</h1>
      <div id="phoneForm" className="container">
        <form action="#" method="post" className="mb-3 phoneForm">
          <div className="verifyBox">
            <PhoneInput
              className="phoneInput"
              country={"in"}
              onChange={phoneChangeHandler}
            />
            <button
              type="submit"
              className="verifyBtn"
              onClick={verifyPhoneHandler}
            >
              send Otp
            </button>
            {otpSent && (
              <FontAwesomeIcon icon={faCircleCheck} className="tick_icon" />
            )}
          </div>
          <br />
          <input
            type="text"
            name="otp"
            id="otp"
            className="form-control inputForm"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />{" "}
          <br />
          {err && err}
          <button
            type="submit"
            className="phoneSubmitbtn"
            onClick={verifyOtpHandler}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verification;
