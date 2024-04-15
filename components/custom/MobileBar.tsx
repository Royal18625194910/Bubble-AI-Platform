"use client";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

const MobileBar = ({ apiLimitCount = 0, isPro = false }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-900">
        <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileBar;
