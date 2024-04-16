'use client'
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Montserrat} from "next/font/google";
import {useAuth} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";


const font = Montserrat({ weight: '600', subsets: ['latin'] });
export default function LandingNavbar() {
    const { isSignedIn } = useAuth()
   return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className='flex items-center'>
        {/*  logo */}
        <div className='relative h-8 w-8 mr-4'>
            <Image fill src='/logo.png' alt='logo' />
        </div>
      {/*    标题     */}
          <h1 className={cn("text-2xl font-bold text-white",font.className)}>Bubble AI</h1>
      </Link>
      {/* 右侧 */}
      <div className={'flex items-center gap-x-2'}>
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
              <Button variant='outline' className='rounded-full'>Get Started</Button>
          </Link>
      </div>
    </nav>
  );
}
