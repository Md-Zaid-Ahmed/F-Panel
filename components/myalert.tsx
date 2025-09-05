import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArchiveIcon } from "lucide-react";

interface AlertProps {
   title: string,
   desc: string,
}

const MyAlert = (props: AlertProps) => {
  const { title, desc } = props; // Destructuring props
  return (
    <Alert>
      <ArchiveIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {desc}
      </AlertDescription>
    </Alert>
  );
};

export default MyAlert;
