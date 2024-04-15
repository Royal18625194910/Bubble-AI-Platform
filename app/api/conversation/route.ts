import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs'
import OpenAI from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export const POST = async (req: NextRequest) => {
    const { userId } = auth()
    const body = await req.json();
    const { messages }: any = body
    console.log(body);
    
    try {
    // 未登录
    if (!userId) return new NextResponse("Unauthorized",{ status: 401})

    // 未输入key
    if (!process.env.OPENAI_API_KEY) return new NextResponse("OpenAI API Key not provider",{ status: 500})

    // 未输入message
    if (!messages) return new NextResponse("Message not provided",{ status: 400})
    
    // const completion = await openai.chat.completions.create({
    //     messages,
    //     model: "gpt-3.5-turbo",
    // });
    //     console.log(completion.choices[0]);
    //     return NextResponse.json(completion.choices[0])


    // 模拟
    // 过限
    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()
    console.log('isPro',isPro);
    
    // 若无免费次数且非会员都抛出403
    if ( !freeTrial && !isPro ) return NextResponse.json({ message: "API Limit Exceeded",status: 403 })
    
    const newMsg = { role: "bot", content: "我是机器人1" }
    // 非会员才会增加次数
    if ( !isPro ) {
        await increaseApiLimit()
    }
    
    return NextResponse.json({messages: [{ role: "bot", content: "我是机器人" },...messages]})

    } catch (err) {
        console.log('[CODE_ERROR]',err);
        return NextResponse.json({message: '[CODE_ERROR]',status: 500})
    }

}


export const GET = () => {
    return NextResponse.json({
        status: 200,
        message: "Hello World"
    })
}