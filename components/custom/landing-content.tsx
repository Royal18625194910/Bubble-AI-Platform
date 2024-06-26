"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Bubble",
    avatar: "B",
    title: "前端工程师",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Bubble",
    avatar: "A",
    title: "Font-end",
    description: "练习时长两年半的前端程序员",
  },
  {
    name: "Mark",
    avatar: "M",
    title: "CEO",
    description: "背带侠,化坤掌",
  },
  {
    name: "Mary",
    avatar: "M",
    title: "CFO",
    description: "铁山靠",
  },
];

export const LandingContent = () => {
  return (
      <div className='px-10 pb-20'>
        <h2 className='text-center text-4xl text-white font-extrabold mb-10'>推荐</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            testimonials.map((item,idx) => (
                <Card key={idx} className='bg-[#192339] border-none text-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-x-2'>
                      <div>
                        <p className='text-lg'>{item.name}</p>
                        <p className='text-zinc-400 text-sm'>{item.title}</p>
                      </div>
                    </CardTitle>
                    <CardContent className='pt-4 px-0'>
                      {item.description}
                    </CardContent>
                  </CardHeader>
                </Card>
            ))
          }
        </div>
      </div>
  )
};
