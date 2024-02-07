import React from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/right/Rightbar";
import Sidebar from "../../components/sideBar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./Home.css";

const Home = () => {
  const removeSearchBox = () => {
    const search_box = document.querySelector(".search_box");
    const search_input = document.querySelector(".search_input");
    if (search_box) search_box.style.visibility = "hidden";
    search_input.value = "";
  };

  return (
    <div onClick={removeSearchBox}>
      <Topbar />
      <div className="homecontainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
