import NavBar from "@/components/custom/NavBar";
import SideBar from "@/components/custom/SideBar";
import { getApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimit();
  const isPro = await checkSubscription();
  console.log(apiLimitCount, isPro);

  return (
    <div className="h-full relative">
      {/* 侧边栏 sider */}
      <div className="hidden w-full h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 bg-gray-900">
        <SideBar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      {/* 内容区 main */}
      <main className="md:pl-72">
        {/* 顶部菜单 */}
        <NavBar apiLimitCount={apiLimitCount} isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
