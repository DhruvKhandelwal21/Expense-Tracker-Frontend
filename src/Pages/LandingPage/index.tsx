import React, { useState } from "react";
// import { menu, logo, close } from "../assets";
// import { navLinks } from "../constants";
import { styles } from "../../style";
import Vector from "../../assets/Vector.svg";
import Login from "../../Components/Login";
import Register from "../../Components/Register";
// import { Link } from "react-router-dom";
const LandingPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  return (
    <>
      <div className="bg-primary min-h-screen flex flex-col">
        <nav
          className={`${styles.paddingX} w-full flex items-center relative py-5 fixed top-0 z-20 bg-primary`}
        >
          <div className="w-full mx-auto flex justify-between items-center max-w-7x1">
            <p className="text-blue text-[18px] font-bold">EXPENSE TRACKER</p>
            <button
              className="py-1 px-4 rounded cursor-pointer hover:bg-white active:bg-black hover:text-black active:text-white"
              onClick={() => {
                setOpenDialog(!openDialog);
              }}
            >
              Login
            </button>
          </div>
        </nav>
        <div
          className={`${styles.paddingX} flex-1 w-full mx-auto flex items-center gap-8 max-w-7x1 bg-primary`}
        >
          <div className="flex flex-col items-start gap-y-3">
            <p className="text-blue text-[30px] font-bold">
              The Expense Tracker that works for you
            </p>
            <p className="text-blue text-[18px] font-bold">
              Track all your expenses
            </p>
            <button className="py-2 px-3 rounded cursor-pointer hover:bg-white active:bg-black hover:text-black active:text-white">
              Get Started
            </button>
          </div>
          <div>
            <img className="object-contain" src={Vector} alt="vector" />
          </div>
        </div>
      </div>
      {openDialog && (
        <Login
          onClose={() => {
            setOpenDialog(!openDialog);
          }}
          openRegister={() => {
            setOpenRegisterDialog(!openRegisterDialog);
            setOpenDialog(!openDialog);
          }}
        />
      )}
      {openRegisterDialog && (
        <Register
          onClose={() => {
            setOpenRegisterDialog(!openRegisterDialog);
          }}
        />
      )}
    </>
  );
};

export default LandingPage;
