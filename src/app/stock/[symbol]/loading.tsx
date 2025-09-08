import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-16 p-5 pt-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-1/2 w-full" />
    </div>
  );
};

export default Loading;
