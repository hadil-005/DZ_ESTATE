import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Home from "../components/Home/home";
import Footer from '../components/Footer/Footer';
import { Navbar } from "@material-tailwind/react";
import  Post  from "../pages/Post/Post";
import { Chat } from "../pages/Chat/Chat";
import Favoris from "../pages/Favoris/Favoris";
import Discussion from "../pages/Chat/Discussion";
import { UserProvider } from "../../UserContext";

const Routers = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(pathname);
  }, [pathname]);

  return (
    <UserProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/post" element={<Post />} />
        <Route path="/disc" element={<Discussion />} />
        <Route path="/favoris" element={<Favoris />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </UserProvider>
  );
};

export default Routers;
