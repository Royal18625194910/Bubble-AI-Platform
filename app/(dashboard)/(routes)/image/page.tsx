"use client";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Heading from "@/components/custom/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema, {amountOptions, route} from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/custom/Empty";
import { Loader } from "@/components/custom/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/custom/user-avatar";
import { BotAvatar } from "@/components/custom/bot-avatar";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ConversationPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  // 对话内容验证
  const form = useForm({
    defaultValues: {
      prompt: "a picture of a girl with flowers",
      amount: "1",
      resolution: "256x256",
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

    try {
      // const res = await fetch("/api/image", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // }).then((res) => res.json());

      // console.log(res);

      const imgList = [
        "http://p2.qhimg.com/t01afc2df45a8320bfb.jpg",
        "http://p6.qhimg.com/t01384e4540636d2f40.jpg",
        "http://p6.qhimg.com/t017b95ee854e7da6d2.jpg",
        "http://p4.qhimg.com/t01ea7e536d03740b30.jpg",
        "http://p5.qhimg.com/t0118bb0aeb1217fc42.jpg",
        "http:///p0.qhimg.com/t0125c4fb815a1c4c53.jpg",
      ];

      setImages(imgList);

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
        title="Image Generate"
        desc="根据你的prompt生成图像"
        icon={ImageIcon}
        href={'/image'}
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
              {/* prompt */}
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
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
              {/* 图像选择 */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {amountOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images started." />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="Image" objectFit="widthFix" fill src={src} />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    className="w-full"
                    variant="secondary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
