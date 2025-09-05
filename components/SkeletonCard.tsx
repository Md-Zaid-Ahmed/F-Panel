import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-16 w-[650px]" />
      <Skeleton className="h-16 w-[650px]" />
      <Skeleton className="h-16 w-[650px]" />
    </div>
  );
}
