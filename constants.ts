import { Code, CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, Music, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

type toolProps = {
    label: string
    icon: any
    href: string
    color: string
    bgColor: string
}

export const tools: toolProps[] = [
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

// export const tools = [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       href: "/dashboard",
//       color: "text-sky-500",
//     },
//     {
//       label: "Coversation",
//       icon: MessageSquare,
//       href: "/conversation",
//       color: "text-violet-500",
//     },
//     {
//       label: "Image Generation",
//       icon: ImageIcon,
//       href: "/image",
//       color: "text-pink-500",
//     },
//     {
//       label: "Video Generation",
//       icon: VideoIcon,
//       href: "/video",
//       color: "text-purple-500",
//     },
//     {
//       label: "Music Generation",
//       icon: MusicIcon,
//       href: "/music",
//       color: "text-yellow-500",
//     },
//     {
//       label: "Code Generation",
//       icon: CodeIcon,
//       href: "/code",
//       color: "text-stone-500",
//     },
//     {
//       label: "Settings",
//       icon: SettingsIcon,
//       href: "/settings",
//       color: "text-teal-500",
//     },
//   ];