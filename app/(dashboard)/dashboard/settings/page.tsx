"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createShop } from "@/lib/actions/shop.action";
import { Zap } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createSettings, getSettings } from "@/lib/actions/settings.action";
import MyCard from "@/components/mycard";

const breadcrumbItems = [{ title: "Settings", link: "/dashboard/settings" }];
const title = "Product Settings";
const description = "To add your shop, we first need some basic information.";

const type: any = "create";
let secret_key = "1Alpha";

const formSchema = z.object({
  selling_cost: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  making_cost: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  pack_size: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  key: z.string().refine((value) => value === secret_key, {
    message: "Enter a valid key",
  }),
});

async function callSettings() {
  const settings = await getSettings({});

  return settings?.settingsdata[0];
}

const SettingsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selling_cost: "",
      making_cost: "",
      pack_size: "",
      key: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      await createSettings({
        selling_cost: values.selling_cost,
        making_cost: values.making_cost,
        pack_size: values.pack_size,
        key: values.key,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }

    toast({
      description: "Settings Updated Successfully.",
      className: "bg-green-500 fixed top-0 m-4 text-xl",
      duration: 2000,
    });
    setSubmittedValues(values);

    form.reset({
      selling_cost: "",
      making_cost: "",
      pack_size: "",
      key: "",
    });
    // Reload the page after 1.5 seconds
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <React.Fragment>
      {/* Rest of your form */}

      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {/* Breadcrumb component */}
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-center justify-between">
            {/* Heading component */}
            <Heading title={title} description={description}></Heading>
          </div>
          <Separator />
          <div className="md:grid md:grid-cols-3 gap-8 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="selling_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selling Cost (₹)</FormLabel>
                      <FormControl>
                        <Input placeholder="₹" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the price at which you sell your product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="making_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Making Cost (₹)</FormLabel>
                      <FormControl>
                        <Input placeholder="₹" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the price at which you make your product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pack_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Packet Size</FormLabel>
                      <FormControl>
                        <Input placeholder="25" {...field} />
                      </FormControl>
                      <FormDescription>
                        This count of items in one pack (1 pack = 25 items).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secret Pass Key</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="pass key"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Without this key no changes will be made.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Submit button */}
                <Button type="submit" disabled={isSubmitting} className="mr-4">
                  {isSubmitting
                    ? type === "create"
                      ? "Saving..."
                      : "Saving.."
                    : type === "edit"
                    ? "Saving"
                    : "Save"}
                </Button>
              </form>
            </Form>
            {/* <Button className="mt-8">{mdata.making_cost}</Button> */}
            <MyCard className="mt-4 " />
          </div>
        </div>
      </ScrollArea>
    </React.Fragment>
  );
};

export default SettingsForm;
