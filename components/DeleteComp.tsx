"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { deleteProducts } from "@/lib/actions/product.action";
import { useState } from "react";

interface DeleteProps {
  id?: string;
  pname: string;
  className?: string;
}

let secret_key = "1Alpha";

const formSchema = z.object({
  key: z.string().refine((value) => value === secret_key, {
    message: "Enter a valid key",
  }),
});

export function DeleteComp({ id, pname, className }: DeleteProps) {
  const { toast } = useToast();
  const [isDeleted, setIsDeleted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Perform deletion logic here
      const result = await deleteProducts({
        product_name: pname,
      });
      if (result?.error) {
        // Display toast for error
        toast({
          description: result.error,
          className: "bg-red-500 fixed top-0 m-4 text-xl",
          duration: 2000,
        });
      } else {
        // Display toast for successful product deletion
        toast({
          description: "Product deleted Successfully.",
          className: "bg-green-500 fixed top-0 m-4 text-xl",
          duration: 2000,
        });
        setIsDeleted(true);
      }
      console.log("Deleting...", values);
    } catch (error) {
      console.error("Error occurred while deleting:", error);
    }
    form.reset({
      key: "",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  };

  if (!isDeleted) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {pname}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Key</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Secret Key"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter secret key to delete product
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <div className="grid grid-cols-2 items-start gap-4">
                      <Button type="submit" variant="destructive">
                        Delete
                      </Button>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    return null; // Return null when the item is deleted
  }
}
