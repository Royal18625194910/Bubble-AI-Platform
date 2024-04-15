"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DashBoardPage = () => {
  const router = useRouter();
  const tools = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-green-600",
      bgColor: "bg-green-600/10",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
    },
    {
      label: "Music Generation",
      icon: MusicIcon,
      href: "/music",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Code Generation",
      icon: CodeIcon,
      href: "/code",
      color: "text-red-600",
      bgColor: "bg-red-600/10",
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/settings",
      color: "text-indigo-600",
      bgColor: "bg-indigo-600/10",
    },

  ]

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Bubble AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <tool.icon
                    className={cn("h-5 w-5 mr-3", tool.color)}
                  ></tool.icon>
                </div>
                <div className="flex-1">
                  <a href={tool.href} className="font-medium text-gray-900">
                    {tool.label}
                  </a>
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashBoardPage;
