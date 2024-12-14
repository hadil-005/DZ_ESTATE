import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

import { Post } from "../pages/Post/Post";
import { Chat } from "../pages/Chat/Chat";
import Favoris from "../pages/Favoris/Favoris";
import Discussion from "../pages/Chat/Discussion";

const Routers = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(pathname);
  }, [pathname]);

  return (
    <Routes>

      <Route path="/si" element={<Signin />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/post" element={<Post />} />
      <Route path="/disc" element={<Discussion/>} />
      <Route path="/favoris" element={<Favoris />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/signin" element={<Signin />} />

    </Routes>
  );
};

export default Routers;