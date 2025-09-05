"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { create } from "domain";
import { createProducts, updateProducts } from "@/lib/actions/product.action";
import { DeleteComp } from "@/components/DeleteComp";

const title: string = "Update Products";
const description: string =
  "To update your product, we first need some basic information.";
let secret_key = "1Alpha";
const type: any = "create";

const formSchema = z.object({
  productname: z.string().min(1, {
    message: "productname must be at least 2 characters.",
  }),
  selling_cost: z
    .string()
    .min(1, {
      message: "Selling Cost must be at least 1 character.",
    })
    .regex(/^\d+(\.\d+)?$/, {
      message:
        "Selling Cost must contain only numbers or floating-point numbers.",
    }),
  making_cost: z
    .string()
    .min(1, {
      message: "Making Cost must be at least 1 character.",
    })
    .regex(/^\d+(\.\d+)?$/, {
      message:
        "Making Cost must contain only numbers or floating-point numbers.",
    }),
  key: z.string().refine((value) => value === secret_key, {
    message: "Enter a valid key",
  }),
  pack_size: z
    .string()
    .min(1, {
      message: "Pack Size must be at least 1 character.",
    })
    .regex(/^\d+$/, {
      message: "Pack Size must contain only numbers.",
    }),
});

interface UpdateProps {
  productName: string;
  sellingCost: string;
  makingCost: string;
  packSize: string;
}
const UpdateProductOne = ({
  productName,
  sellingCost,
  makingCost,
  packSize,
}: UpdateProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productname: productName,
      selling_cost: "",
      making_cost: "",
      pack_size: "",
      key: "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await updateProducts({
        product_name: productName,
        selling_cost: values.selling_cost,
        making_cost: values.making_cost,
        pack_size: values.pack_size,
        key: values.key,
      });

      if (result?.error) {
        // Display toast for error
        toast({
          description: result.error,
          className: "bg-red-500 fixed top-0 m-4 text-xl",
          duration: 2000,
        });
      } else {
        // Display toast for successful product creation
        toast({
          description: "Product Updated Successfully.",
          className: "bg-green-500 fixed top-0 m-4 text-xl",
          duration: 2000,
        });
      }
    } catch (error: any) {
      // Handle other errors
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    form.reset({
      productname: "",
      selling_cost: "",
      making_cost: "",
      pack_size: "",
      key: "",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-xl font-mono tracking-tight">{title}</h6>
          <h1 className="text-sm text-muted-foreground">{description}</h1>
        </div>
      </div>

      <div className="md:flex md:flex-wrap md:-mx-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="md:flex md:flex-wrap md:-mx-2">
              <div className="md:w-1/2 md:px-2">
                {" "}
                {/* Each field takes half the width on medium and larger screens */}
                <FormField
                  control={form.control}
                  name="productname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2">Product name</FormLabel>
                      <FormControl>
                        <Input value={productName} />
                      </FormControl>
                      <FormDescription className="ml-2">
                        The Changes will be applied to the Selected Product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:w-1/2 md:px-2">
                {" "}
                {/* Each field takes half the width on medium and larger screens */}
                <FormField
                  control={form.control}
                  name="selling_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2">Selling Cost (₹)</FormLabel>
                      <FormControl>
                        <Input placeholder="15, 20, 25..." {...field} />
                      </FormControl>
                      <FormDescription className="ml-2">
                        Previous Selling Cost : {sellingCost} (₹)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 md:w-1/2 md:px-2">
                {" "}
                {/* Each field takes half the width on medium and larger screens */}
                <FormField
                  control={form.control}
                  name="making_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2">Making Cost</FormLabel>
                      <FormControl>
                        <Input placeholder="5, 10, 15..." {...field} />
                      </FormControl>
                      <FormDescription className="ml-2">
                        Previous Making Cost : {makingCost} (₹)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 md:w-1/2 md:px-2">
                {" "}
                {/* Each field takes half the width on medium and larger screens */}
                <FormField
                  control={form.control}
                  name="pack_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2">Pack Size</FormLabel>
                      <FormControl>
                        <Input placeholder="25, 50, 100..." {...field} />
                      </FormControl>
                      <FormDescription className="ml-2">
                        Previous Pack Size : {packSize}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 md:w-1/2 md:px-2">
                {" "}
                {/* Each field takes half the width on medium and larger screens */}
                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2">Secret Key</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Secret Key"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
                        Note : Without the secret key no changes will be made
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="ml-2flex justify-start">
              {/* Submit button */}
              <Button type="submit" disabled={isSubmitting} className="mr-4">
                {isSubmitting
                  ? type === "create"
                    ? "Saving..."
                    : "Saving.."
                  : type === "edit"
                  ? "Udating..."
                  : "Update"}
              </Button>
              <DeleteComp pname={productName} />
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UpdateProductOne;
