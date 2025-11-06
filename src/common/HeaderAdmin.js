import React, { useState } from 'react'
import { HiOutlineMenu } from "react-icons/hi";
import SideBar from './SideBar';
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage && localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
      <div className='sticky z-[1] top-0 mb-[20px] flex items-center justify-between gap-[5px] md:gap-[20px]  w-full  bg-[#ffffff] p-[10px] md:p-[20px]  rounded-[10px] md:rounded-[15px]  mt-3'>
        <div className='flex items-center w-full gap-[5px] md:gap-[20px]'>
          <button
            onClick={toggleSidebar}
            className="text-black xl:hidden"
          >
            <HiOutlineMenu size={32} />
          </button>
          <h2 className='text-black font-[Poppins] font-[500] md:text-[20px] lg:text-[25px] xl:text-[32px] pr-[70px] hidden md:block'>{title ? title : "Dashboard"}</h2>
        </div>
        <div className='relative'>
          <button onClick={handleLogout} className='flex items-center justify-center w-[40px] h-[40px] sm:w-[45px] sm:h-[45px]  md:w-[50px] md:h-[50px] bg-[#ffffff0d] rounded-[80px]'>
            <AiOutlineLogout size={24} className='text-black  sm:text-[15px] hover:text-pink-500' />
          </button>
        </div>
        <div>
        </div>
      </div>
      <SideBar toggleSidebar={toggleSidebar} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>

  )
}
