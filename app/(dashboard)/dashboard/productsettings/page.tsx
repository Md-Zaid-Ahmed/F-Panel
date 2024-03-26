"use client";
import React, { useEffect, useState } from "react";
import { getProducts } from "@/lib/actions/product.action";
import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UpdateProductOne from "@/components/forms/update_product/UpdateProductOne";
import MyAlert from "@/components/myalert";
import { SkeletonCard } from "@/components/SkeletonCard";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteComp } from "@/components/DeleteComp";

const profileFormSchema = z.object({
  product_name: z.string({
    required_error: "Please select a product name to display.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProductDetails {
  product_name: string;
  selling_cost: string;
  making_cost: string;
  pack_size: string;
}

export default function ProfileForm() {
  const [settings, setSettings] = useState<ProductDetails[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] =
    useState<ProductDetails | null>(null);
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const res = await getProducts({});
        if (res && res.Productsdata) {
          setSettings(res.Productsdata);
        }
        setLoading(false);
      } catch (e) {
        console.log("Fetching product list failed : ", e);
        setLoading(false);
      }
    };
    fetchProductList();
  }, []);

  useEffect(() => {
    if (selectedProduct && settings) {
      const productDetails = settings.find(
        (product) => product.product_name === selectedProduct
      );
      setSelectedProductDetails(productDetails || null);
    }
  }, [selectedProduct, settings]);

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function handleProductSelect(productName: string) {
    setSelectedProduct(productName);
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex-1 lg:max-w-2xl">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!settings || settings.length === 0) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <BreadCrumb
          items={[{ title: "ProductSettings", link: "/dashboard/profile" }]}
        />
        <Separator className="my-6" />
        <div className="flex-1 lg:max-w-2xl">
          <MyAlert title="Heads Up" desc="Add your product to make changes" />
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex-1 lg:max-w-2xl">
          <BreadCrumb
            items={[{ title: "ProductSettings", link: "/dashboard/profile" }]}
          />
          <Separator className="my-6" />

          <Form {...form}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Products List</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleProductSelect(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product to update" />
                      </SelectTrigger>
                      <SelectContent>
                        {settings.map((product: ProductDetails) => (
                          <SelectItem
                            key={product.product_name}
                            value={product.product_name}
                          >
                            {product.product_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="ml-1">
                      Choose Your Product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedProductDetails && (
                <>
                  <UpdateProductOne
                    productName={selectedProductDetails.product_name}
                    sellingCost={selectedProductDetails.selling_cost}
                    makingCost={selectedProductDetails.making_cost}
                    packSize={selectedProductDetails.pack_size}
                  />
                </>
              )}
            </div>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
}
