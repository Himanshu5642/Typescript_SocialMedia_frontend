import React, { useReducer, useState } from "react";
import "./Login.css";
import axios, { formDataAxios } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const reducer = (state, action) => {
  switch (action.type) {
    case "login_input":
      return {
        ...state,
        loginInput: {
          ...state.loginInput,
          [action.field]: action.value,
        },
      };
    case "signin_input":
      return {
        ...state,
        signinInput: {
          ...state.signinInput,
          [action.field]: action.value,
        },
      };
    case "login_btn":
      return {
        ...state,
        loginBtn: !state.loginBtn,
      };
    case "add_file":
      return { ...state, file: action.value };
    default:
      return state;
  }
};

function Login() {
  const [state, dispatch] = useReducer(reducer, {
    loginBtn: true,
    loginInput: {},
    signinInput: {},
    file: null,
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onClickHandler = () => dispatch({ type: "login_btn" });

  const loginChangeHandler = (e) =>
    dispatch({
      type: "login_input",
      field: e.target.name,
      value: e.target.value,
    });

  console.log("sigininput", state.signinInput);
  const signinChangeHandler = (e) => {
    if (e.target.type === "file") {
      console.log("file uploaded");
      dispatch({
        type: "signin_input",
        field: e.target.name,
        value: e.target.files[0],
      });
      dispatch({
        type: "add_file",
        field: e.target.name,
        value: e.target.files[0],
      });
    } else {
      dispatch({
        type: "signin_input",
        field: e.target.name,
        value: e.target.value,
      });
    }
  };

  const loginMutation = useMutation({
    mutationFn: () =>
      axios.post("/login", state.loginInput, {
        withCredentials: true,
      }),
    onSuccess: (response) => {
      console.log("response", response);
      let token = response.data.token;
      let loggedInUserId = response.data.res._id;
      localStorage.setItem("userId", loggedInUserId);
      localStorage.setItem("token", token);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      setErr(error.response.data.body);
      setTimeout(() => {
        setErr(null);
      }, 7 * 1000);
    },
  });

  const signinMutation = useMutation({
    mutationFn: (formData) => formDataAxios.post("/signUp", formData),
    onSuccess: (response) => {
      let token = response.data.token;
      let loggedInUserId = response.data.res._id;
      localStorage.setItem("userId", loggedInUserId)
      localStorage.setItem("token", token);
      navigate("/");
    },
    onError: (error) => {
      // console.log(error);
      setErr(error.response.data.body);
      setTimeout(() => {
        setErr(null);
      }, 7 * 1000);
    },
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const siginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone", location?.state?.phone);
    for (let key in state.signinInput) {
      // console.log(key, signinInput[key]);
      formData.append(key, state.signinInput[key]);
    }
    signinMutation.mutate(formData);
  };

  return (
    <div className={state.loginBtn ? "loginBox" : "signinBox"}>
      <div className="button-box">
        <button className="toggle-btn logintoggle" onClick={onClickHandler}>
          Log in
        </button>
        <button className="toggle-btn signintoggle" onClick={onClickHandler}>
          Sign in
        </button>
        <button
          className={state.loginBtn ? "move-btn" : "move-btn righttoggle"}
        ></button>
      </div>

      <div
        id="loginForm"
        className={
          state.loginBtn
            ? "container login loginform"
            : "container formpage login"
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
          state.loginBtn
            ? "container formpage signin"
            : "container signin signupform"
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
          <div className="d-flex justify-content-between">
            <input
              type="file"
              name="profile_pic"
              className="form-control profile_pic_input"
              onChange={signinChangeHandler}
            />
            {state.file && (
              <img
                alt=""
                src={URL.createObjectURL(state.file)}
                style={{ width: "10%" }}
              />
            )}
          </div>
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
