"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateDocumentMutation } from "@/features/document/documentApi";
import { CreateBadge } from "@/types/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateBadgeMutation } from "@/features/badge/badgeApi";

const schema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(100),
  badgeImage: z.instanceof(File).optional(),
});

export default function CreateVerificationBadgePage() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      badgeImage: undefined,
    },
  });

  const [createBadge] = useCreateBadgeMutation();
  const [createDocument] = useCreateDocumentMutation();
  const [files, setFiles] = useState<File[] | null>(null);

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      if (!files || files.length === 0) {
        toast.error("Please upload a badge image");
        return;
      }

      toast.loading("Uploading...");
      const document = await createDocument({
        file: files[0],
        documentType: "badge",
        gen: 0,
        programSlug: "null",
      }).unwrap();
      toast.dismiss();

      const payload: CreateBadge = {
        ...values,
        badgeImage: document.uri,
      };

      toast.promise(createBadge(payload).unwrap(), {
        loading: "Creating...",
        success: () => "Badge created successfully!",
        error: (error) => `Failed to create badge: ${error.message}`,
      });

      form.reset();
      setFiles(null);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create New Badge</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill information below and click create when you&apos;re done.
        </p>
      </div>

      <Form {...form}>
        <form
          id="create-badge-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="badgeImage"
            render={() => (
              <FormItem>
                <FormLabel>Badge Image</FormLabel>
                <FormControl>
                  <div className="h-fit w-full flex justify-center items-center border rounded-lg p-5">
                    <div className="relative inline-block">
                      <Avatar className="h-48 w-48">
                        <AvatarImage
                          className="rounded-full object-cover"
                          src={
                            files && files[0]
                              ? URL.createObjectURL(files[0])
                              : "/placeholder.svg"
                          }
                          alt="Badge Preview"
                        />
                        <AvatarFallback className="rounded-full text-3xl">
                          {form.watch("title")
                            ? form.watch("title").split(" ").map((n) => n[0]).join("").toUpperCase()
                            : "BA"}
                        </AvatarFallback>
                      </Avatar>

                      <label
                        htmlFor="fileInput"
                        className="absolute bottom-2 left-2 h-10 w-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg border-2 border-background"
                      >
                        <Pencil className="h-4 w-4 text-primary-foreground" />
                      </label>

                      <input
                        id="fileInput"
                        type="file"
                        accept="image/svg+xml,image/png,image/jpeg,image/gif"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFiles([file]);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Pre-University" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="The beginning of journey" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="outline"
          onClick={() => {
            form.reset();
            setFiles(null);
          }}
        >
          Cancel
        </Button>
        <Button form="create-badge-form" type="submit">
          Create
        </Button>
      </div>
    </div>
  );
}