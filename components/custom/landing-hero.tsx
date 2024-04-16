"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
      <div className='text-white font-bold py-36 text-center space-y-5'>
        <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
            {/*标题*/}
            <h1>The Best AI Tool for</h1>
            {/*打字效果*/}
            <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500'>
                <TypewriterComponent
                    options={{
                        strings: [
                            "Bubble AI.",
                            "Photo Generation.",
                            "Video Writting.",
                            "Music Writting.",
                            "Code Writting.",
                        ],
                        autoStart: true,
                        loop: true
                    }}
                />
            </div>
        </div>
        <div className='text-sm md:text-xl font-light text-zinc-400'>
            使用Bubble AI 更快生成内容(10x)
        </div>
        <div>
            <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                <Button variant={'premium'} className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>Start Generating For Free</Button>
            </Link>
        </div>
        <div className='text-zinc-400 text-xs md:text-sm font-normal'>
            No credit card required
        </div>
      </div>
  )
};
