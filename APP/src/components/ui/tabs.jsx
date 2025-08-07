// components/ui/tabs.jsx
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const TabsRoot = Tabs.Root;
export const TabsList = ({ className, ...props }) => (
  <Tabs.List className={cn("flex space-x-2 border-b", className)} {...props} />
);
export const TabsTrigger = ({ className, ...props }) => (
  <Tabs.Trigger
    className={cn(
      "px-4 py-2 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary",
      className
    )}
    {...props}
  />
);
export const TabsContent = ({ className, ...props }) => (
  <Tabs.Content className={cn("pt-4", className)} {...props} />
);
