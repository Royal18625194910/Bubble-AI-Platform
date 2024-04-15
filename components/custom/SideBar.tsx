"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  CodeIcon,
  SettingsIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FreeCounter } from "./free-counter";
import { useFreeCounterStore } from "@/store";
import { useEffect } from "react";
import {usePathname} from "next/navigation";
import {tools} from "@/constants";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const SideBar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {

  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        {/* logo */}
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill src="/logo.png" sizes="30" alt="logo" />
          </div>
          <h1 className={cn("text-2xl font-bold")}>Bubble AI</h1>
        </Link>
        {/* 左侧导航 */}
        <div className="space-y-1">
          {tools.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn("h-5 w-5 mr-3", route.color)}
                ></route.icon>
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default SideBar;
