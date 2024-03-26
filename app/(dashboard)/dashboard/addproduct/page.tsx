import BreadCrumb from "@/components/breadcrumb";
import CreateProductOne from "@/components/forms/create_product/CreateProductOne";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const breadcrumbItems = [
  { title: "Add Product", link: "/dashboard/addproduct" },
];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        {/* <Separator /> */}
        <CreateProductOne />
      </div>
    </ScrollArea>
  );
}
