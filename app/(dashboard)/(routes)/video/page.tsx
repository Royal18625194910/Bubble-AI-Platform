"use client";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Heading from "@/components/custom/Heading";
import { VideoIcon } from "lucide-react";
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
  const [video, setVideo] = useState<string>("");
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

    setVideo("");
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({
          prompt: values.prompt,
        }),
      }).then((res) => res.json());

      console.log(res);
      setVideo(res[0]);

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
        title="Video Generation"
        desc="生成视频 generate video"
        icon={VideoIcon}
        href='/video'
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
                        placeholder="enter a video prompt"
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
          {!video && !isLoading && <Empty label="No video started." />}

          {/* 音乐 */}
          {video && (
            <video
              controls
              className="w-full aspect-video rounded-lg border border-black mt-8"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
