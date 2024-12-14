import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import Avataru from './Avataru';
import Search from './Search';

export const Chat = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar className="" />
        <div className="flex-1  ml-7 mt-24 p-4">
          <h1 className="text-[#1C84FF] mb-6 font-bold text-[40px]">Messages</h1>
          <Search  />
          <div className="flex flex-col mt-7 gap-6">
            <div className="flex  flex-col  gap-4">
              <Avataru />
              <Avataru />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
