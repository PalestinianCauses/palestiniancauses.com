"use client";

// REVIEWED - 03

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormStatus } from "@/components/globals/form-status";
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
import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/errors";
import { diaryEntrySchema, DiaryEntrySchema } from "@/lib/schemas/diary";
import { ActionResponseTryCatch, cn } from "@/lib/utils";

export const CreateDiaryEntryForm = function CreateDiaryEntryForm() {
  const router = useRouter();
  const { data: user } = useUser();
  const { createDiaryEntryMutation: createDiaryEntry } = useDiaryEntry();

  const form = useForm<DiaryEntrySchema>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      date: new Date(),
      content: "",
      isAuthentic: true,
      isAnonymous: true,
    },
    resolver: zodResolver(diaryEntrySchema),
  });

  const [response, setResponse] = useState<
    ActionResponseTryCatch<string, string>
  >({ data: null, error: null });

  const handleSubmit = function handleSubmit(data: DiaryEntrySchema) {
    if (!user) {
      router.push("/signin");
      return;
    }

    createDiaryEntry.mutate(
      {
        title: data.title,
        date: [
          data.date.toLocaleDateString().split("/")[2],
          data.date.toLocaleDateString().split("/")[1],
          data.date.toLocaleDateString().split("/")[0],
        ].join("-"),
        content: data.content,
        isAuthentic: data.isAuthentic,
        isAnonymous: data.isAnonymous,
        author: user,
      },
      {
        onSuccess: (responseData) => {
          if (responseData) {
            setResponse(responseData);

            if (!responseData.error) form.reset();
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-2xl">
        <FormStatus
          isPending={{
            true: createDiaryEntry.isPending,
            message: messages.actions.diaryEntry.pending,
          }}
          success={{
            true: Boolean(!createDiaryEntry.isPending && response.data),
            message: response.data || messages.actions.diaryEntry.success,
          }}
          failure={{
            true: Boolean(!createDiaryEntry.isPending && response.error),
            message:
              (typeof response.error === "string" && response.error) || "",
          }}
        />
        <div className="mb-4 grid gap-4 sm:grid-cols-3 sm:grid-rows-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Diary Title</FormLabel>
                <FormControl>
                  <Input {...field} disabled={createDiaryEntry.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="leading-none">Diary Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={10}
                  disabled={createDiaryEntry.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAuthentic"
          render={({ field }) => (
            <FormItem className="mb-4 flex flex-row-reverse items-center justify-end gap-2">
              <FormLabel className="!m-0 leading-normal">
                I am from Gaza, and this is my authentic diary, sharing my true
                experiences.
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
        <Button type="submit" disabled={createDiaryEntry.isPending}>
          {createDiaryEntry.isPending
            ? "Sharing your diary..."
            : "Share my diary"}
        </Button>
      </form>
    </Form>
  );
};
