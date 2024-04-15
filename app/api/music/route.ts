import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs'
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

export const POST = async (req: NextRequest) => {
    const { userId } = auth()
    const body = await req.json();
    const { prompt }: any = body
    console.log(body);

    const input = {
      prompt_a: prompt,
    }
    
    try {
    // 未登录
    if (!userId) return new NextResponse("Unauthorized",{ status: 401})

    // 未输入message
    if (!prompt) return new NextResponse("prompt not provided",{ status: 400})

    const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });
    console.log(output)
        return NextResponse.json(output)
    } catch (err) {
        console.log('[MUSIC_ERROR]',err);
        return new NextResponse("[MUSIC_ERROR]",{status: 500})
    }

}


export const GET = () => {
    return NextResponse.json({
        status: 200,
        message: "Hello World"
    })
}