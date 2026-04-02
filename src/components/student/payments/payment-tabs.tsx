import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PaymentTabsProps = {
  children: ReactNode;
};

type PaymentTabTrigger = {
  value: string;
  label: string;
};

export const paymentTabTriggers: PaymentTabTrigger[] = [
  { value: "summary", label: "Payment Summary" },
  { value: "bachelor", label: "Bachelor" },
  { value: "itp", label: "IT Professional Scholarship" },
  { value: "pre-university", label: "Pre-University Foundation" },
];

export function PaymentTabs({ children }: PaymentTabsProps) {
  return (
    <Tabs defaultValue="summary" className="space-y-4">
      <TabsList className="h-10 flex-wrap justify-start rounded-md p-1">
        {paymentTabTriggers.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="px-3 py-1.5 text-sm">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}

export { TabsContent };
