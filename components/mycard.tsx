import {
  CubeIcon,
  CrumpledPaperIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";
import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSettings } from "@/lib/actions/settings.action";
import {  useEffect, useState } from "react";
import { Separator } from "./ui/separator";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export default function MyCard({ className, ...props }: any) {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        console.log("Fetching settings data...");
        const res = await getSettings({});
        setSettings(res);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettingsData();
  }, []);

  if (!settings) {
    // If settings is null, return null or loading indicator
    return null; // or return a loading indicator
  }

  const m_cost = settings.settingsdata[0]?.making_cost; //
  const s_cost = settings.settingsdata[0]?.selling_cost;
  const p_size = settings.settingsdata[0]?.pack_size;

  const ppi = parseFloat((s_cost - m_cost).toFixed(2)); //Profit per item
  const scp = parseFloat((s_cost * p_size).toFixed(2)); //single item profit
  const ppp = parseFloat((ppi * p_size).toFixed(2)); //profit per packet

  return (
    <Card className="w-[350px] mt-4">
      <CardHeader className="pb-3">
        <CardTitle>Default Settings</CardTitle>
        <CardDescription>These are the saved settings</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all ">
          <CubeIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Selling Cost : {s_cost} ₹
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all ">
          <BackpackIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Making Cost : {m_cost} ₹
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all ">
          <CrumpledPaperIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Packet Size : {p_size}
            </p>
          </div>
        </div>

        <Separator />
        <Separator />
        <Separator />
      </CardContent>
      <CardHeader className="pb-3">
        <CardTitle>Profit Calculations</CardTitle>
        <CardDescription>
          These are some basic profit calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all ">
          <BackpackIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Profit per item : {ppi} ₹
            </p>
            <p className="text-sm text-muted-foreground">
              single item profit (1 unit)
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all ">
          <CubeIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Selling Cost (1 Packet) : {scp} ₹
            </p>
            <p className="text-sm text-muted-foreground">
              selling price of one pack ({s_cost}*{p_size})
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all ">
          <CrumpledPaperIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Profit Per Packet : {ppp}
            </p>
            <p className="text-sm text-muted-foreground">
              profit of one packet ({ppi}*{p_size})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
