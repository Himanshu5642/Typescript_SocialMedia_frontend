import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Verification from "./pages/login/verifyPhone";
import Profile from "./components/profile/Profile";
import UserProfile from "./components/profile/UserProfile";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function App() {
  // const token = localStorage.getItem('token');
  // console.log("token", token)
  // const [loggedIn, setLoggedIn] = useState(true);

  // const navigate = useNavigate();

  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      {/* <Route exact path="/" element={loggedIn ? <Home /> : navigate('/login')}></Route> */}
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/verify" element={<Verification />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route exact path="/userProfile" element={<UserProfile />}></Route>
    </Routes>
  );
}

export default App;
