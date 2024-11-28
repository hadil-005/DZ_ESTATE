import React from "react";
import Logi from "../components/Login/Logi.jsx";
import SideElement from "../components/Login/SideElement.jsx";

const Signin = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <Logi className="lg:w-4/6" />
        <SideElement className="lg:w-2/6" />
      </div>
    </>
  );
};

export default Signin;
