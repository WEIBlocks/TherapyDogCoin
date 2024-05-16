import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { SiBnbchain } from "react-icons/si";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { images } from "../assests";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        behavior: "smooth",
        top: section.offsetTop - 50, // Adjust this value as needed to account for header height
      });
    }
  };

  return (
    <>
      <header id="header" className="bg-primary sticky top-0 z-50 shadow-xl">
        <div
          id="navbar"
          className="container flex-between items-center py-1 sec-pad-x "
        >
          <div className="flex items-center">
            <div className="lg:w-[60px] lg:h-[60px] md:w-[50px] md:h-[50px] w-[40px] h-[40px] text-dark-primary mr-1">
              <img src={images.brandLogo} alt="brandLogog" />
            </div>
            <h2 className="lg:text-2xl md:text-xl text-lg text-white font-semibold capitalize text-nowrap ">
              TherapyDogCoin
            </h2>
          </div>
          <nav
            className={`${
              isOpen ? "" : "lg:translate-x-0 -translate-x-full"
            } flex lg:items-center gap-1.5 lg:relative fixed lg:flex-row flex-col left-0 lg:h-auto h-full top-0 lg:w-auto w-full overflow-auto lg:p-0 p-3 lg:bg-transparent bg-primary transition-all`}
          >
            {/* <span className="nav-link scrollto active">hero</span> */}
            {/* <a href="#hero" className="nav-link scrollto active">
              hero
            </a>

            <a href="#about" className="nav-link scrollto">
              about
            </a>
            <a href="#services" className="nav-link scrollto">
              services
            </a>
            <a href="#tokenomics" className="nav-link scrollto">
              tokenomics
            </a>
            <a href="#contract" className="nav-link scrollto">
              contract
            </a>
            <a href="#roadmap" className="nav-link scrollto">
              roadmap
            </a>
            <a href="#team" className="nav-link scrollto">
              team
            </a> */}

            <button
              className="nav-link"
              onClick={() => scrollToSection("hero")}
            >
              hero
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection("about")}
            >
              about
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection("services")}
            >
              services
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection("tokenomics")}
            >
              tokenomics
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection("contract")}
            >
              contract
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection("roadmap")}
            >
              roadmap
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection("team")}
            >
              team
            </button>

            {/* <span className="nav-link scrollto">about</span>
            <span className="nav-link scrollto">services</span>
            <span className="nav-link scrollto">tokenomics</span>
            <span className="nav-link scrollto">contract</span>
            <span className="nav-link scrollto">roadmap</span>
            <span className="nav-link scrollto">team</span> */}
            <div className="flex md:gap-1 gap-[10px]">
              <div className="nav-icon">
                <FaTelegramPlane />
              </div>
              <div className="nav-icon">
                <FaDiscord />
              </div>
              <div className="nav-icon">
                <Link to="https://twitter.com/therapydag" target="blank">
                  <FaTwitter />
                </Link>
              </div>
            </div>
            {/* <button className="btn-border">
              <p className="btn-inner">Buy $TASKC</p>
            </button> */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden block absolute right-0 pr-3 text-white text-xl cursor-pointer z-20"
            >
              <AiOutlineCloseSquare />
            </div>
          </nav>
          <button
            className="lg:hidden block  text-white text-xl cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </header>
      <div>
        <Outlet />
      </div>
      <footer className="bg-secondary">
        <div className="container">
          <div className="flex flex-col md:gap-1.5 gap-1 text-center">
            <div className="flex md:flex-row flex-col gap-1 justify-between items-center border-b-2 border-primary lg:mx-[48px] md:mx-[34px] mx-[20px] lg:py-[20px] md:py-[17px] py-[15px]">
              <div className="flex items-center">
                <div className="lg:w-[50px] lg:h-[50px] md:w-[40px] md:h-[40px] w-[30px] h-[30px] text-dark-primary mr-1">
                  <img src={images.brandLogo} alt="brandLogog" />
                </div>
                <h2 className="lg:text-2xl md:text-xl text-lg text-white font-semibold capitalize text-nowrap ">
                  TherapyDogCoin
                </h2>
              </div>
              <div className="flex md:gap-1 gap-[10px]">
                <div className="nav-icon">
                  <FaTelegramPlane />
                </div>
                <div className="nav-icon">
                  <FaDiscord />
                </div>
                <div className="nav-icon">
                  <FaTwitter />
                </div>
                <div className="nav-icon">
                  <FaFacebook />
                </div>
                <div className="nav-icon">
                  <FaInstagram />
                </div>
                <div className="nav-icon">
                  <FaYoutube />
                </div>
              </div>
            </div>
            <p className="md:text-xl text-lg font-medium text-white max-w-[960px] w-full m-auto">
              Disclaimer: Cryptocurrency may be unregulated in your
              jurisdiction. The value of cryptocurrencies may fluctuate. Profits
              may be subject to capital gains or other taxes applicable in your
              jurisdiction.
            </p>
            <p className="md:text-xl text-lg font-medium text-white">
              {currentYear}&copy;TaskChain.co | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
