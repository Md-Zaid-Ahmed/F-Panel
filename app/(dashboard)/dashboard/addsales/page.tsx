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

const breadcrumbItems = [{ title: "Add Sales", link: "/dashboard/addsales" }];
const title = "Add Sales";
const description = "To add your Sales, we first need some basic information.";

const type: any = "create";

const formSchema = z.object({
    shopname: z.string().min(2, {
      message: "Shopname must be at least 2 characters.",
    }),
    no_of_packs: z.string().min(2, {
      message: "Owner name must be at least 1 characters.",
    }),
    username: z.string().min(3).max(10, {
      message: "Area must be between 3 to 10 characters.",
    }),
    phonenumber: z.string().refine((value) => /^\d{10}$/.test(value), {
      message: "Phone number must be exactly 10 digits",
    }),
    
    date: z.date({
      required_error: "Required.",
    }),
  });

const SalesForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <div>
        s
    </div>
  )
}

export default SalesForm