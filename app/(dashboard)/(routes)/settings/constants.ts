import * as z from "zod";
import {tools} from "@/constants";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
});

export const route = tools.find((item) => item.href === '/settings')
