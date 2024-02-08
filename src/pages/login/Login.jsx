import React, { useState } from "react";
import "./Login.css";
import axios, { formDataAxios } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [loginBtn, setLoginBtn] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [signinInput, setSigninInput] = useState({
    first_name: "",
    last_name: "",
    profile_pic: "",
    phone: location.state.phone,
    username: "",
    password: "",
    cpassword: "",
  });
  console.log(signinInput);
  const onClickHandler = () => setLoginBtn(!loginBtn);

  const loginChangeHandler = (e) => {
    setLoginInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const signinChangeHandler = (e) => {
    setSigninInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(loginInput);
  // console.log(err);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", loginInput, {
        withCredentials: true,
      });
      console.log(response);
      // let loggedInUser = response.data.res;
      let token = response.data.token;
      // localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.response.data.body);
      setTimeout(() => {
        setErr(null);
      }, 7 * 1000);
    }
  };

  const siginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in signinInput) {
      console.log(key, signinInput[key]);
      formData.append(key, signinInput[key]);
    }
    try {
      const response = await formDataAxios.post("/signUp", formData);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.response.data.body);
      setTimeout(() => {
        setErr(null);
      }, 7 * 1000);
    }
  };

  return (
    <div className={loginBtn ? "loginBox" : "signinBox"}>
      <div className="button-box">
        <button className="toggle-btn logintoggle" onClick={onClickHandler}>
          Log in
        </button>
        <button className="toggle-btn signintoggle" onClick={onClickHandler}>
          Sign in
        </button>
        <button
          className={loginBtn ? "move-btn" : "move-btn righttoggle"}
        ></button>
      </div>

      <div
        id="loginForm"
        className={
          loginBtn ? "container login loginform" : "container formpage login"
        }
      >
        <form action="" className="mb-3 login-form">
          <input
            type="text"
            name="username"
            id="username"
            className="form-control inputForm"
            placeholder="Enter username"
            onChange={loginChangeHandler}
          />{" "}
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="form-control inputForm"
            placeholder="Enter password"
            onChange={loginChangeHandler}
          />{" "}
          <br />
          {err && err}
          <button type="submit" className="login-btn" onClick={loginHandler}>
            Log in
          </button>
        </form>
      </div>

      <div
        id="signinForm"
        className={
          loginBtn ? "container formpage signin" : "container signin signupform"
        }
      >
        <form action="" method="post" className="mb-3 login-form">
          <div className="inputNameSection">
            <input
              type="text"
              name="first_name"
              className="form-control inputForm"
              placeholder="Enter First Name"
              onChange={signinChangeHandler}
            />
            <input
              type="text"
              name="last_name"
              className="form-control inputForm"
              placeholder="Enter Last Name"
              onChange={signinChangeHandler}
            />
          </div>{" "}
          <br />
          <label htmlFor="profile_pic" id="profile_label">
            Profile Picture :
          </label>
          <input
            type="file"
            name="profile_pic"
            className="form-control profile_pic_input"
            onChange={(e) =>
              setSigninInput((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0].name,
              }))
            }
          />
          <br />
          <input
            type="text"
            name="username"
            className="form-control inputForm"
            placeholder="Enter Username"
            onChange={signinChangeHandler}
          />{" "}
          <br />
          <input
            type="password"
            name="password"
            className="form-control inputForm"
            placeholder="Enter password"
            onChange={signinChangeHandler}
          />{" "}
          <br />
          <input
            type="password"
            name="cpassword"
            className="form-control inputForm"
            placeholder="Enter Confirm password"
            onChange={signinChangeHandler}
          />{" "}
          <br />
          {err && err}
          <button type="submit" className="signin-btn" onClick={siginHandler}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
