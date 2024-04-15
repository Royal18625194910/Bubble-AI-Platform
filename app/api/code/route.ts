import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs'
import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const instructionMessage = {
    role: "system",
    content: "你是一个代码助手，你必须把回答的代码放在markdown格式里，并且加上必要的注释"
}

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
    
    const completion = await openai.chat.completions.create({
        messages: [instructionMessage,...messages],
        model: "gpt-3.5-turbo",
    });
        console.log(completion.choices[0]);
        return NextResponse.json(completion.choices[0])
    } catch (err) {
        console.log('[CONVERSATION_ERROR]',err);
        return new NextResponse("[CONVERSATION_ERROR]",{status: 500})
    }

}


export const GET = () => {
    return NextResponse.json({
        status: 200,
        message: "Hello World"
    })
}