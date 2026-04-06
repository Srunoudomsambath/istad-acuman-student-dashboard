import React, { ReactElement } from 'react'
import { CardHeader, CardTitle } from '../ui/card';

// â”€â”€â”€ Panel Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function PanelHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactElement;
}) {
  return (
    <CardHeader className="border-b border-border/60 bg-muted/20 px-4 py-3.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-0.5">
          <CardTitle className="text-lg sm:text-[1.35rem]">{title}</CardTitle>
          {description && (
            <p className="text-sm leading-5 text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
    </CardHeader>
  );
}