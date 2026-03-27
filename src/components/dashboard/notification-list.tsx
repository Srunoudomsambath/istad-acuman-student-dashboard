import { BellRing } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StudentNotification } from "@/lib/types/student";

type NotificationListProps = {
  notifications: StudentNotification[];
};

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="flex items-center gap-2 text-xl">
          <BellRing className="size-5 text-primary" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-5">
        {notifications.map((notification) => (
          <div
            key={notification.uuid}
            className={cn(
              "rounded-2xl border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-md",
              notification.unread && "border-primary/30 bg-primary/5"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium leading-5">{notification.title}</p>
                  <Badge variant={notification.unread ? "default" : "secondary"}>
                    {notification.category}
                  </Badge>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {notification.summary}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {notification.date}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
