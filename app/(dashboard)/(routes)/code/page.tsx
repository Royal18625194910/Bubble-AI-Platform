"use client";
import { useRouter } from "next/navigation";
import RactMarkdown from "react-markdown";
import * as z from "zod";
import { MessageSquare, Code } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/custom/Heading";
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

const md = `
# 使用 React Hook 的示例

React Hooks 是 React 16.8 引入的一项功能，它使得在函数组件中可以使用状态和其他 React 特性，而无需编写类组件。在本示例中，我们将演示如何使用 \`useState\` Hook 来管理组件的状态。

首先，让我们创建一个简单的计数器组件，它可以增加和减少计数器的值。

\`\`\`jsx
import React, { useState } from 'react';

const Counter = () => {
  // 使用 useState Hook 来声明一个状态变量 count，初始值为 0
  const [count, setCount] = useState(0);

  // 定义一个增加计数器值的函数
  const increment = () => {
    // 使用 setCount 函数来更新 count 的值，这将触发组件重新渲染
    setCount(count + 1);
  };

  // 定义一个减少计数器值的函数
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>计数器示例</h2>
      <p>当前计数：{count}</p>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>减少</button>
    </div>
  );
};

export default Counter;
\`\`\`

在上面的代码中，我们首先引入了 \`useState\` Hook，并在组件内部使用它声明了一个名为 \`count\` 的状态变量，初始值为 \`0\`。然后，我们定义了两个函数 \`increment\` 和 \`decrement\`，用于增加和减少计数器的值，并使用 \`setCount\` 函数来更新 \`count\` 的值。最后，我们在组件的 JSX 中显示当前计数值，并将增加和减少的函数绑定到按钮的点击事件上。

这样，我们就创建了一个简单的计数器组件，其中使用了 \`useState\` Hook 来管理状态，而不需要编写类组件。
`;

export default function CodePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any>([]);
  // 对话内容验证
  const form = useForm({
    defaultValues: {
      prompt: "帮我用react写一个表单提交",
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
      // const res = await fetch("/api/conversation", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // }).then((res) => res.json());
      // console.log(res);
      // setMessages([...messages, userMsg]);

      // 模拟数据
      setMessages([...messages, userMsg, { role: "bot", content: md }]);

      console.log(messages);

      form.reset();
    } catch (e) {
      // TODO: Open Pro Modal
      console.log(e);
    } finally {
      router.refresh();
    }
  };

  console.log(route?.bgColor)

  return (
    <div>
      {/* 标题区域 */}
      <Heading
        title="Code"
        href='/code'
        desc="最先进的对话模型"
        icon={Code}
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
                <RactMarkdown
                  className="text-sm overflow-hidden leading-7"
                  components={{
                    pre: ({ node, ...props }) => {
                      return (
                        <div className="overflow-auto w-full h-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props}/>
                        </div>
                      );
                    },
                    code: ({ node, ...props }) => {
                      return (
                        <code
                          {...props}
                          className="bg-black/10 p-1 rounded-lg"
                        />
                      );
                    },
                  }}
                >
                  {message.content || ""}
                </RactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
