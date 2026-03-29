import React, { ReactElement } from 'react'
import { CardHeader, CardTitle } from '../ui/card';

// ─── Panel Header ─────────────────────────────────────────────────────────────
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
    <CardHeader className="border-b border-border/60 bg-muted/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          {description && (
            <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
    </CardHeader>
  );
}