import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin";


const Routers = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(pathname);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/si" element={<Signin />} />
    </Routes>
  );
};

export default Routers;