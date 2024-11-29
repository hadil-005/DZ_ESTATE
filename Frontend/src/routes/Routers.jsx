import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin";
import { Navbar } from "../components/Navbar/Navbar";

const Routers = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(pathname);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/si" element={<Signin />} />
      <Route path="/navbar" element={<Navbar />} />
    </Routes>
  );
};

export default Routers;