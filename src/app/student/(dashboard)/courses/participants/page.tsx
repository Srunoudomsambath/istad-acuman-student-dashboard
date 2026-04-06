"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Printer } from "lucide-react";

import ExportToExcelModal from "@/components/ExportToExcelModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/table/data-table";
import { DataTableToolbar } from "@/components/table/data-table-toolbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";
import { useAppSelector } from "@/lib/hooks";
import { studentCourses } from "@/lib/mock/courses";
import { exportToExcel } from "@/services/export-to-excel";

type ParticipantStatus = "ACTIVE" | "SUSPENDED" | "DROPPED" | "GRADUATED" | "DRAFT";
type ParticipantGender = "Male" | "Female";

type ParticipantRow = {
  id: string;
  fullName: string;
  khmerName: string;
  englishName: string;
  email: string;
  gender: ParticipantGender;
  role: string;
  semester: string;
  status: ParticipantStatus;
};

const participantAvatar =
  "https://elearnings.setecu.com/pluginfile.php/538608/user/icon/boost/f1?rev=1756447";
const participantStatuses = ["ACTIVE", "ACTIVE", "DROPPED", "ACTIVE"] as const;
const participantGenders: ParticipantGender[] = ["Male", "Male", "Male", "Female"];

function splitParticipantName(fullName: string) {
  const match = fullName.match(/^(.*?)([A-Za-z][A-Za-z\s]+)$/);

  if (!match) {
    return { khmerName: fullName, englishName: fullName };
  }

  return {
    khmerName: match[1].trim(),
    englishName: match[2].trim(),
  };
}

function createEmailFromName(englishName: string) {
  return `${englishName.toLowerCase().trim().replace(/\s+/g, ".")}@example.com`;
}

function statusBadgeClass(status: ParticipantStatus) {
  const styles = {
    ACTIVE:
      "bg-[#E6F4EA] text-[#1E7D34] hover:bg-[#E6F4EA] dark:bg-[#163322] dark:text-[#7dd3a5] dark:hover:bg-[#163322]",
    SUSPENDED:
      "bg-[#FFF4E5] text-[#B25E00] hover:bg-[#FFF4E5] dark:bg-[#3a2710] dark:text-[#f2b766] dark:hover:bg-[#3a2710]",
    DROPPED:
      "bg-[#FDECEC] text-[#B32121] hover:bg-[#FDECEC] dark:bg-[#3b1717] dark:text-[#f19999] dark:hover:bg-[#3b1717]",
    GRADUATED:
      "bg-[#E8F0FE] text-[#1A4DB3] hover:bg-[#E8F0FE] dark:bg-[#14294f] dark:text-[#8db4ff] dark:hover:bg-[#14294f]",
    DRAFT:
      "bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9] dark:bg-[#1f2937] dark:text-[#cbd5e1] dark:hover:bg-[#1f2937]",
  } satisfies Record<ParticipantStatus, string>;

  return styles[status];
}

function genderBadgeClass(gender: ParticipantGender) {
  return gender === "Male"
    ? "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300"
    : "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300";
}

function ParticipantsTable({ data }: { data: ParticipantRow[] }) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportMode, setExportMode] = useState<"selected" | "all">("selected");
  const preference = useAppSelector((state) => state.preference);

  const columns = useMemo<ColumnDef<ParticipantRow>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        enableResizing: false,
        size: 30,
      },
      {
        accessorKey: "englishName",
        header: "Student",
        enableColumnFilter: true,
        meta: {
          label: "Search",
          placeholder: "Search by student or email...",
          variant: "text",
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border border-border/60">
              <AvatarImage src={participantAvatar} alt={row.original.fullName} />
            </Avatar>
            <div className="space-y-0.5">
              <p className="font-medium text-foreground">{row.original.englishName}</p>
              <p className="text-sm text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "khmerName",
        header: "Khmer Name",
        enableColumnFilter: false,
        cell: ({ row }) => (
          <p
            className="font-medium text-foreground"
            style={{ fontFamily: "var(--font-koh), var(--font-inter), sans-serif" }}
          >
            {row.original.khmerName}
          </p>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        enableColumnFilter: true,
        meta: {
          label: "Gender",
          variant: "select",
          options: [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ],
        },
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${genderBadgeClass(
              row.original.gender
            )}`}
          >
            {row.original.gender}
          </Badge>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <span className="text-sm text-foreground">{row.original.role}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: true,
        meta: {
          label: "Status",
          variant: "select",
          options: [
            { label: "Active", value: "ACTIVE" },
            { label: "Suspended", value: "SUSPENDED" },
            { label: "Dropped", value: "DROPPED" },
            { label: "Graduated", value: "GRADUATED" },
            { label: "Draft", value: "DRAFT" },
          ],
        },
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusBadgeClass(
              row.original.status
            )}`}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "semester",
        header: "Semester",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.semester}</span>
        ),
      },
    ],
    []
  );

  const { table } = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / 10),
    shallow: true,
    debounceMs: 200,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
  });

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original as ParticipantRow);
  const exportData = exportMode === "all" ? data : selectedRows;
  const hasSelectedRows = selectedRows.length > 0;

  async function handleExport(selectedFields: string[]) {
    await exportToExcel({
      data: exportData,
      selectedFields,
      filename: `participants-${exportMode}-${new Date().toISOString().split("T")[0]}.xlsx`,
      exportType: preference.export,
    });
  }

  function openExportModal(mode: "selected" | "all") {
    setExportMode(mode);
    setIsExportModalOpen(true);
  }

  return (
    <>
      <DataTable table={table} className="min-h-[0]">
        <DataTableToolbar table={table} className="border-b border-border/60 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 px-3 text-xs">
                <Printer className="h-3.5 w-3.5" />
                Export
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={!hasSelectedRows}
                onClick={() => openExportModal("selected")}
              >
                Export Selected ({selectedRows.length})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openExportModal("all")}>
                Export All ({data.length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DataTableToolbar>
      </DataTable>

      {isExportModalOpen ? (
        <ExportToExcelModal
          data={exportData}
          open={isExportModalOpen}
          onOpenChange={setIsExportModalOpen}
          onExport={handleExport}
        />
      ) : null}
    </>
  );
}

export default function BachelorParticipantsPage() {
  const participants = useMemo<ParticipantRow[]>(
    () =>
      Array.from(
        new Map(
          studentCourses.flatMap((course) =>
            course.roster.map((participant, index) => {
              const { khmerName, englishName } = splitParticipantName(participant);

              return [
                participant,
                {
                  id: `${course.slug}-${index}`,
                  fullName: participant,
                  khmerName,
                  englishName,
                  email: createEmailFromName(englishName),
                  gender: participantGenders[index % participantGenders.length],
                  role: "Student",
                  semester: `Y${course.year - 2023}S${course.semester}`,
                  status: participantStatuses[index % participantStatuses.length] as ParticipantStatus,
                },
              ];
            })
          )
        ).values()
      ),
    []
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Participants
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          See the current roster of learners enrolled in your program.
        </p>
      </div>

      <Card className="overflow-hidden border-border/60 bg-card p-4 shadow-sm">
        <ParticipantsTable data={participants} />
      </Card>
    </div>
  );
}

