"use client";
import { UserButton } from "@clerk/nextjs";
import MobileBar from "./MobileBar";

const NavBar = ({ apiLimitCount = 0, isPro = false }) => {
  return (
    <div className="flex items-center p-4">
      <MobileBar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBar;
