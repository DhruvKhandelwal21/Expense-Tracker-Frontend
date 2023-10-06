// import React from "react";
// import { sideBarData } from "../Helpers/SideBarData";
// import { Link } from "react-router-dom";
// import avatar from "../assets/avatar.png";
// import { PiSignOut } from "react-icons/pi";
// const Layout = ({ children }: any) => {
//   return (
//     <div className="flex h-screen items-center lg:flex-row md:flex-col xs:flex-col justify-between lg:py-4">
//       <div className="bg-gray-200 shadow-lg shadow-gray-100 text-black flex lg:flex-col xs:flex-row md:flex-row justify-between lg:w-64 md:w-full p-4 h-full ml-2 z-10 rounded-3xl mr-4">
//         <div className="flex lg:flex-col gap-10">
//           <div className="flex gap-3">
//             <img
//               className="object-contain w-10 h-10 rounded-3xl"
//               src={avatar}
//               alt=""
//             />
//             <div className="flex flex-col">
//               <h2>Dhruv</h2>
//               <p>Your Money</p>
//             </div>
//           </div>
//           <ul className="xs:hidden md:hidden">
//             {sideBarData.map((item) => (
//               <li key={item.path} className="mb-2 ">
//                 <Link to={item.path} className="hover:text-blue-400">
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex items-center gap-1 cursor-pointer">
//           <PiSignOut />
//           <span>Sign Out</span>
//         </div>
//       </div>

//       <div className="bg-gray-200 shadow-lg shadow-gray-100 h-full text-black z-10 lg:w-4/5 sm:w-full md:w-full rounded-3xl mr-2">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import { sideBarData } from "../Helpers/SideBarData";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import { GrMenu } from "react-icons/gr";
import { PiSignOut } from "react-icons/pi";
const Layout = ({ children }: any) => {
  const navigate = useNavigate();
  const [toggle, settoggle] = useState(false);
  const [active, setactive] = useState("");
  return (
    <div className="flex h-screen items-center lg:flex-row md:flex-col xs:flex-col justify-between lg:py-4 p-2">
      <div className="bg-gray-200 shadow-lg shadow-gray-100 text-black flex lg:flex-col xs:flex-row md:flex-row justify-between lg:w-64 md:w-full xs:w-full md:mb-3 xs:mb-3 p-4 lg:h-full lg:ml-2 rounded-3xl lg:mr-4">
        <div className="flex lg:flex-col gap-10">
          <div className="flex gap-3">
            <img
              className="object-contain w-10 h-10 rounded-3xl"
              src={avatar}
              alt=""
            />
            <div className="flex flex-col">
              <h2>Dhruv</h2>
              <p>Your Money</p>
            </div>
          </div>
          <ul className="xs:hidden lg:block">
            {sideBarData.map((item) => (
              <li key={item.path} className="mb-3 ">
                <Link
                  to={item.path}
                  className="hover:bg-gray-400 py-2 px-3 rounded-xl"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
          <div className="lg:hidden flex w-full items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[25px] h-[25px] object-contain cursor-pointer bg-none"
              onClick={() => {
                settoggle(!toggle);
              }}
            />
            <div
              className={`${
                toggle ? "flex" : "hidden"
              } p-6 bg-black-200 absolute justify-start top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl`}
            >
              <ul className="list-none flex items-start flex-col gap-4">
                {sideBarData.map((item) => (
                  <li
                    className={`${
                      active === item.name ? "text-white" : "text-secondary"
                    } font-poppins text-[18px] font-medium cursor-pointer`}
                    onClick={() => {
                      settoggle(!toggle);
                      setactive(item.name);
                    }}
                  >
                    <Link to={item.path} className="hover:text-blue-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <PiSignOut
            onClick={() => {
              console.log("hello");
              localStorage.clear();
              navigate("/landingPage");
            }}
            className="w-[30px] h-[30px]"
          />
          <span className="hidden lg:block">Sign Out</span>
        </div>
      </div>

      <div className="bg-gray-200 shadow-lg shadow-gray-100 h-full text-black lg:w-4/5 xs:w-full md:w-full rounded-3xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;
