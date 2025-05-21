"use client";

// REVIEWED - 05

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { MotionDiv } from "@/components/globals/motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useDiaryEntry } from "@/hooks/use-diary-entry";
import { messages } from "@/lib/messages";
import { motions } from "@/lib/motion";
import { diaryEntrySchema, DiaryEntrySchema } from "@/lib/schemas/diary";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

export const CreateDiaryEntryForm = function CreateDiaryEntryForm({
  user,
}: {
  user: User;
}) {
  const { createDiaryEntry } = useDiaryEntry();

  const form = useForm<DiaryEntrySchema>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      content: "",
      isAuthentic: true,
      isAnonymous: true,
    },
    resolver: zodResolver(diaryEntrySchema),
  });

  const handleSubmit = function handleSubmit(data: DiaryEntrySchema) {
    toast.info(messages.actions.diaryEntry.pending);
    createDiaryEntry.mutate({
      ...data,
      date: [
        data.date.toLocaleDateString().split("/")[2],
        data.date.toLocaleDateString().split("/")[1],
        data.date.toLocaleDateString().split("/")[0],
      ].join("-"),
      author: user,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mx-auto">
        <div className="mb-4 grid gap-4 sm:grid-cols-3 sm:grid-rows-1">
          <MotionDiv
            initial={motions.fadeIn.initial}
            viewport={{ once: true }}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({})}
            className="sm:col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diary Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={createDiaryEntry.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </MotionDiv>
          <MotionDiv
            initial={motions.fadeIn.initial}
            viewport={{ once: true }}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({})}>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diary Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={createDiaryEntry.isPending}
                          className={cn(
                            "w-full items-center justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}>
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Choose a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </MotionDiv>
        </div>
        <MotionDiv
          initial={motions.fadeIn.initial}
          viewport={{ once: true }}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="leading-none">Diary Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={20}
                    disabled={createDiaryEntry.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </MotionDiv>
        <MotionDiv
          initial={motions.fadeIn.initial}
          viewport={{ once: true }}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}>
          <FormField
            control={form.control}
            name="isAuthentic"
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-row-reverse items-center justify-end gap-2">
                <FormLabel className="!m-0 leading-normal">
                  I am from Gaza, and this is my authentic diary, sharing my
                  true experiences.
                </FormLabel>
                <FormControl>
                  <Checkbox
                    defaultValue={Number(field.value)}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={createDiaryEntry.isPending}
                    className="!m-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </MotionDiv>
        <MotionDiv
          initial={motions.fadeIn.initial}
          viewport={{ once: true }}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}>
          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem className="mb-8 flex flex-row-reverse items-center justify-end gap-2">
                <FormLabel className="!m-0 leading-normal">
                  I prefer to remain anonymous to protect my identity.
                </FormLabel>
                <FormControl>
                  <Checkbox
                    defaultValue={Number(field.value)}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={createDiaryEntry.isPending}
                    className="!m-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </MotionDiv>
        <MotionDiv
          initial={motions.fadeIn.initial}
          viewport={{ once: true }}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}>
          <Button type="submit" disabled={createDiaryEntry.isPending}>
            {createDiaryEntry.isPending
              ? "Sharing your diary..."
              : "Share my diary"}
          </Button>
        </MotionDiv>
      </form>
    </Form>
  );
};
