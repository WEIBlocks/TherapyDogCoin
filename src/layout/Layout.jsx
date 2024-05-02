import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { SiBnbchain } from "react-icons/si";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <header className="bg-primary sticky top-0 z-50 shadow-xl">
        <div className="container flex-between items-center py-1 sec-pad-x ">
          <div className="flex items-center">
            <div className="lg:text-5xl md:text-4xl text-3xl text-dark-primary mr-2">
              <SiBnbchain />
            </div>
            <h2 className="lg:text-2xl md:text-xl text-lg text-white font-semibold capitalize text-nowrap ">
              task chain
            </h2>
          </div>
          <nav className={`${isOpen ? "" : "lg:translate-x-0 -translate-x-full"} flex lg:items-center gap-1.5 lg:relative fixed lg:flex-row flex-col left-0 lg:h-auto h-full top-0 lg:w-auto w-full overflow-auto lg:p-0 p-3 lg:bg-transparent bg-primary transition-all`}>
            <span className="nav-link">about</span>
            <span className="nav-link">about</span>
            <span className="nav-link">about</span>
            <span className="nav-link">about</span>
            <div className="flex gap-2">
              <div className="nav-icon">
                <FaTelegramPlane />
              </div>
              <div className="nav-icon">
                <FaDiscord />
              </div>
              <div className="nav-icon">
                <FaTwitter />
              </div>
            </div>
            {/* <button className="btn-border">
              <p className="btn-inner">Buy $TASKC</p>
            </button> */}
            <div onClick={()=>setIsOpen(!isOpen)} className="lg:hidden block absolute right-0 pr-3 text-white text-xl cursor-pointer z-20">  
                <AiOutlineCloseSquare/>
            </div>
          </nav>
            <button className="lg:hidden block  text-white text-xl cursor-pointer " onClick={()=>setIsOpen(!isOpen)}>  
                <GiHamburgerMenu/>
            </button>
        </div>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
