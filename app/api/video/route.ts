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
      prompt,
    }
    
    try {
    // 未登录
    if (!userId) return new NextResponse("Unauthorized",{ status: 401})

    // 未输入message
    if (!prompt) return new NextResponse("prompt not provided",{ status: 400})

    const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        { input }
    );
    console.log(output)
        return NextResponse.json(output)
    } catch (err) {
        console.log('[VIDEO_ERROR]',err);
        return new NextResponse("[VIDEO_ERROR]",{status: 500})
    }

}


export const GET = () => {
    return NextResponse.json({
        status: 200,
        message: "Hello World"
    })
}