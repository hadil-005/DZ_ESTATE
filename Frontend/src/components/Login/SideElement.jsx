import React from "react";
import logsi from "../../assets/logsi.jpg";

const SideElement = () => {
  return (
    <div className="relative flex flex-col items-center lg:items-start mt-3.">
      <img
        src={logsi}
        alt="logsi"
        //className="lg:block absolute top-0 right-90 w-25 h-auto lg:w-28 lg:h-auto mt-4 ml-2"
        className="absolute top-0 right-90 w-25 h-auto lg:w-28 lg:h-auto mt-4 ml-2"
        style={{ zIndex: 1, marginTop: -20, marginLeft: -200 }}
      />
    </div>
  );
};

export default SideElement;
