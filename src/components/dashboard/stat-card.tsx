import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  accentClassName?: string;
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accentClassName,
}: StatCardProps) {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl border bg-primary/10 text-primary",
            accentClassName
          )}
        >
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
