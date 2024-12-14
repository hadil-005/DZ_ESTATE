import React from 'react'
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from '../../components/Navbar/Navbar';

function Favoris() {
  return (
        <div>
          <Navbar />
          <div className="flex h-screen">
            <Sidebar className="" />
            <div className="flex-1  ml-7 mt-24 p-4">
            favoris
            </div>
            </div>
            </div>
  )
}

export default Favoris