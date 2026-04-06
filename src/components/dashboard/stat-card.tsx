import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-2.5">
        <CardTitle className="text-sm font-semibold leading-none">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1 px-5 pb-4">
        <div className="text-2xl font-bold leading-none text-foreground">{value}</div>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
