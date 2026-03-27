"use client";

import { Heading } from "@/components/Heading";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreateVerificationBadge } from "@/features/badge/components/CreateVerificationBadge";
import { verificationColumns } from "@/features/badge/components/table/columns";
import VerificationDataTable from "@/features/badge/components/table/data-table";
import { Plus } from "lucide-react";
import { useState } from "react";

// Mock Data
const MOCK_BADGES = [
  {
    uuid: "badge-001",
    title: "Top Performer",
    description: "Awarded for exceptional performance",
    badgeImage: "https://t4.ftcdn.net/jpg/19/41/71/61/360_F_1941716168_SIW0ByYObPF8Yzo8iskVWT9Ce2s2VeEr.jpg",
    isDeleted: false,
    audit: {
      createdAt: new Date().toISOString(),
      createdBy: "admin",
      updatedAt: new Date().toISOString(),
      updatedBy: "admin",
    },
  },
  {
    uuid: "badge-002",
    title: "Excellent Research",
    description: "Awarded for outstanding research work",
    badgeImage: "https://i.postimg.cc/QtDLHqNp/1f44b613-6a1e-4ac9-88f2-5b5dc87da6ed.png",
    isDeleted: false,
    audit: {
      createdAt: new Date().toISOString(),
      createdBy: "admin",
      updatedAt: new Date().toISOString(),
      updatedBy: "admin",
    },
  },
  {
    uuid: "badge-003",
    title: "Innovator",
    description: "Awarded for innovative projects",
    badgeImage: "https://i.postimg.cc/K32Trs8t/3c46e825-6f8b-4d65-8c57-f8dfee4227a9.png",
    isDeleted: false,
    audit: {
      createdAt: new Date().toISOString(),
      createdBy: "admin",
      updatedAt: new Date().toISOString(),
      updatedBy: "admin",
    },
  },
];

export default function VerificationBadge() {
  const [isCreateShow, setIsCreateShow] = useState(false);
  const [badges, setBadges] = useState(MOCK_BADGES);
  const [isLoading, setIsLoading] = useState(false); // simulate loading if needed

  return (
    <div className="p-6 flex flex-1 flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Verification Badge"
          description="Manage your verification badge"
        />
        <Button onClick={() => setIsCreateShow(true)} variant="outline">
          <Plus />
          Create New Badge
        </Button>
      </div>
      <Separator />
      {isLoading ? (
        <DataTableSkeleton columnCount={5} />
      ) : (
        <VerificationDataTable
          data={Array.isArray(badges) ? badges : []}
          columns={verificationColumns}
          totalItems={Array.isArray(badges) ? badges.length : 0}
        />
      )}
      {isCreateShow && (
        <CreateVerificationBadge
          open={isCreateShow}
          onOpenChange={setIsCreateShow}
        />
      )}
    </div>
  );
}