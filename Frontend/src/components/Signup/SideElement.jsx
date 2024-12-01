import React from "react";
import logsi from "../../assets/logsi.jpg";

const SideElement = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img src={logsi} alt="logsi" className="w-full h-full object-cover" />
    </div>
  );
};

export default SideElement;
