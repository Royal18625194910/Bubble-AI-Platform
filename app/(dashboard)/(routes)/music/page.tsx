"use client";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Heading from "@/components/custom/Heading";
import { MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema, {route} from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/custom/Empty";
import { Loader } from "@/components/custom/Loader";

const ConversationPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>("");
  // 对话内容验证
  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    setMusic("");
    try {
      const { audio } = await fetch("/api/music", {
        method: "POST",
        body: JSON.stringify({
          prompt: values.prompt,
        }),
      }).then((res) => res.json());

      console.log(audio);
      setMusic(audio);

      form.reset();
    } catch (e) {
      // TODO: Open Pro Modal
      console.log(e);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      {/* 标题区域 */}
      <Heading
        title="Music Generation"
        desc="生成音乐"
        icon={MusicIcon}
        href='/music'
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
                        placeholder="enter a music prompt"
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
          {!music && !isLoading && <Empty label="No converstation started." />}

          {/* 音乐 */}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
