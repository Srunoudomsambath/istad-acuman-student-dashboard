import { Badge } from "@/components/ui/badge";

export function BachelorSectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge
          variant="secondary"
          className="rounded-full px-3 py-1 text-[11px] font-semibold"
        >
          Bachelor
        </Badge>
        <span>Focused program workspace for degree students</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
