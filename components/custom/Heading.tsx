import { cn } from "@/lib/utils";
import React, { useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {tools} from "@/constants";

interface HeadingProps {
  title: string;
  desc: string;
  icon: any;
  href: string;
  iconColor?: string;
  bgColor?: string;
}

const Heading = ({
  title,
  desc, href = '',
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {

    const route = tools.find(item => item.href === href)
    console.log('Heading',route?.bgColor,route?.color)

  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md" ,bgColor)}>
        <Icon className={cn("w-10 h-10",iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
};

export default Heading;
