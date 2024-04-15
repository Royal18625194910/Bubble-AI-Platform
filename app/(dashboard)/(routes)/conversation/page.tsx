"use client";
import { useRouter } from "next/navigation";
import * as z from "zod";
import toast from "react-hot-toast";
import Heading from "@/components/custom/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema, {route} from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/custom/Empty";
import { Loader } from "@/components/custom/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/custom/user-avatar";
import { BotAvatar } from "@/components/custom/bot-avatar";
import { useProModalStore } from "@/store";
import {tools} from "@/constants";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any>([]);
  const proModalStore = useProModalStore();
  // 对话内容验证
  const form = useForm({
    defaultValues: {
      prompt: "诸葛亮可以参加周瑜葬礼，为什么周瑜不能参加诸葛亮葬礼",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const userMsg = {
      role: "user",
      content: values.prompt,
    };
    const data = {
      messages: [...messages, userMsg],
    };

    try {
      const res = await fetch("/api/conversation", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json());

      console.log(res);
      if (res.status === 403) {
        proModalStore.onOpen();
      }
      setMessages([...messages, userMsg, ...res.messages]);

      form.reset();
    } catch (e: any) {
      // TODO: Open Pro Modal
      toast.error(e.message);
    } finally {
      router.refresh();
    }
  };

  console.log(route)

  return (
    <div>
      {/* 标题区域 */}
      <Heading
        title="Coversation"
        desc="最先进的对话模型"
        icon={MessageSquare}
        href={'/conversation'}
        iconColor={route?.color as string}
        bgColor={route?.bgColor}
      />
      <div className="px-4 lg:px-8">
        {/* 对话 */}
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
                type="submit"
              >
                发送
              </Button>
            </form>
          </Form>
        </div>
        {/* 回答 */}
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No converstation started." />
          )}

          {/* 答案 */}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message: any) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
