"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDocumentMutation } from "@/features/document/documentApi";
import { useGetAllOpeningProgramsQuery } from "@/features/opening-program/openingProgramApi";
import { CreateAchievement } from "@/types/achievement";

import { useCreateAchievementMutation } from "../achievementApi";

const formSchema = z.object({
  title: z.string().min(1, "Achievement title is required"),
  openingProgramUuid: z.string().min(1, "Program is required"),
  achievementType: z.string().min(1, "Achievement type is required"),
  tag: z.string().min(1, "Tag is required"),
  link: z.string().min(1, "Project link is required"),
  video: z.string().min(1, "Video link is required"),
  icon: z.instanceof(File).optional(),
  description: z.string().min(1, "Description is required"),
});

export default function CreateAchievementForm({
  showCard = true,
  onSuccess,
}: {
  showCard?: boolean;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [files, setFiles] = useState<File[] | null>(null);
  const { data: openingPrograms } = useGetAllOpeningProgramsQuery();
  const [createAchievement, { isLoading: isCreating }] =
    useCreateAchievementMutation();
  const [createDocument, { isLoading: isUploading }] =
    useCreateDocumentMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      openingProgramUuid: "",
      achievementType: "",
      tag: "",
      link: "",
      video: "",
      description: "",
    },
  });

  const previewUrl = useMemo(() => {
    if (!files || files.length === 0) return null;
    return URL.createObjectURL(files[0]);
  }, [files]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!files || files.length === 0) {
        toast.error("Please upload an icon");
        return;
      }

      toast.loading("Uploading...", { id: "achievement-upload" });
      const document = await createDocument({
        file: files[0],
        documentType: "achievement",
        gen: 0,
        programSlug: "null",
      }).unwrap();
      toast.dismiss("achievement-upload");

      const payload: CreateAchievement = {
        ...values,
        icon: document.uri,
      };

      const createPromise = createAchievement(payload).unwrap();
      toast.promise(createPromise, {
        loading: "Creating achievement...",
        success: "Achievement created successfully!",
        error: (error) => `Failed to create achievement: ${error.message}`,
      });

      await createPromise;
      form.reset();
      setFiles(null);

      if (onSuccess) {
        onSuccess();
        return;
      }

      router.push("/student/achievements");
    } catch (error) {
      console.error("Form submission error", error);
      toast.dismiss("achievement-upload");
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const formContent = (
    <Form {...form}>
      <form
        id="create-achievement-page-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <div className="flex flex-col space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achievement Title</FormLabel>
                <FormControl>
                  <Input placeholder="EXSTAD" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="openingProgramUuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Full Stack Web Development" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!openingPrograms || openingPrograms.length === 0 ? (
                      <div className="flex h-8 w-full items-center justify-center text-sm text-muted-foreground">
                        No opening program found
                      </div>
                    ) : (
                      openingPrograms.map((program) => (
                        <SelectItem key={program.uuid} value={program.uuid}>
                          {program.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="achievementType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achievement Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Mini Project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MINI_PROJECT">Mini Project</SelectItem>
                    <SelectItem value="FINAL_PROJECT">Final Project</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input placeholder="TOP 1" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://exstad.istad.co"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/23kksf"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col space-y-5">
          <FormField
            control={form.control}
            name="icon"
            render={() => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center rounded-lg border p-5">
                    <div className="relative inline-block">
                      <Avatar className="h-48 w-48">
                        <AvatarImage
                          className="rounded-full object-cover"
                          src={previewUrl ?? "/placeholder.svg"}
                          alt="Achievement Logo"
                        />
                        <AvatarFallback className="rounded-full text-3xl">
                          {form.watch("title")
                            ? form
                                .watch("title")
                                .split(" ")
                                .map((name) => name[0])
                                .join("")
                                .toUpperCase()
                            : "ACH"}
                        </AvatarFallback>
                      </Avatar>

                      <label
                        htmlFor="achievement-file-input"
                        className="absolute bottom-2 left-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-primary shadow-lg transition-colors hover:bg-primary/90"
                      >
                        <Pencil className="h-4 w-4 text-primary-foreground" />
                      </label>

                      <input
                        id="achievement-file-input"
                        type="file"
                        accept="image/svg+xml,image/png,image/jpeg,image/gif"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          setFiles(file ? [file] : null);
                        }}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="EXSTAD is the amazing project"
                    className="min-h-40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:justify-end">
          <Button asChild type="button" variant="outline">
            <Link href="/student/achievements">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isCreating || isUploading}>
            {isCreating || isUploading ? "Submitting..." : "Create Achievement"}
          </Button>
        </div>
      </form>
    </Form>
  );

  if (!showCard) {
    return formContent;
  }

  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle>Create Achievement</CardTitle>
        <CardDescription>
          Fill in the details below and submit your achievement request.
        </CardDescription>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
}
