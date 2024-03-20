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
import React, { useState } from "react";
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

const breadcrumbItems = [{ title: "Add shop", link: "/dashboard/demo" }];
const title = "Add Shop";
const description = "To add your shop, we first need some basic information.";

const type: any = "create";

const formSchema = z.object({
  shopname: z.string().min(2, {
    message: "Shopname must be at least 2 characters.",
  }),
  ownername: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  area: z.string().min(3).max(10, {
    message: "Area must be between 3 to 10 characters.",
  }),
  phonenumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Phone number must be exactly 10 digits",
  }),
  
  date: z.date({
    required_error: "Required.",
  }),
});
export function ShopForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopname: "",
      ownername: "",
      area: "",
      phonenumber: "",
      date: new Date(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);
    try {
      await createShop({
        shopname : values.shopname,
        ownername : values.ownername,
        area : values.area,
        phonenumber : values.phonenumber,
        date : values.date,
      });
    } catch (e) {
      console.log("error");
    } finally {
      setIsSubmitting(false);
    }

    console.log("hello");
    toast({
      description: "Shop Added Successfully.",

      className: "bg-green-500 fixed top-0 m-4 text-xl",

      duration: 2000,
    });
    console.log({ values });
    //window.location.reload();
    // Clear form inputs
    form.reset({
      shopname: "",
      ownername: "",
      area: "",
      phonenumber: "",
    });
  }
  return (
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="shopname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Manafe Groceries" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ibad Bhai..." {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Akbarbagh" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="90569....." {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit button */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? type === "create"
                    ? "Adding..."
                    : "Adding.."
                  : type === "edit"
                  ? "Edit Shop"
                  : "Add Shop"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
}

export default ShopForm;
