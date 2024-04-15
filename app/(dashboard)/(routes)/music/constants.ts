import * as z from "zod";
import {tools} from "@/constants";

const formSchema = z.object({
    prompt: z.string().min(1,{
        message: '请输入音乐prompt'
    })
})
export const route = tools.find((item) => item.href === '/music')
export default formSchema