import { useState } from "react";
import BellIcon from "../common/icons/BellIcon";
import UserIcon from "../common/icons/UserIcon";
import MenuIcon from "../common/icons/MenuIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#3C2212] text-white">
      <div className="h-[56px] flex items-center justify-between px-4 sm:px-6">
        <div className="text-3xl font-semibold"><img src="/Logo_Wellness Group.png" alt="Logo" className="h-8" /></div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium">
            <span className="text-yellow-400">Home</span>
            <span className="text-gray-300">Therapists</span>
            <span className="text-gray-300">Sales</span>
            <span className="text-gray-300">Clients</span>
            <span className="text-gray-300">Transactions</span>
            <span className="text-gray-300">Reports</span>
          </div>

          <BellIcon />
          <UserIcon />

          <MenuIcon onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#4b2e2e] px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <span className="text-yellow-400">Home</span>
          <span className="text-gray-300">Therapists</span>
          <span className="text-gray-300">Sales</span>
          <span className="text-gray-300">Clients</span>
          <span className="text-gray-300">Transactions</span>
          <span className="text-gray-300">Reports</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
