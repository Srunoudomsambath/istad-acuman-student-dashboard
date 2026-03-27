"use client";

import { Heading } from "@/components/Heading";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateAchievementModal from "@/features/achievement/components/CreateAchievementModal";
import { achievementColumns } from "@/features/achievement/components/table/columns";
import { AchievementTable } from "@/features/achievement/components/table/data-table";
import { Plus } from "lucide-react";
import { useState } from "react";

// Mock achievement data
const mockAchievements = [
  {
    uuid: "1",
    title: "Top Scholar Award",
    description: "Awarded for outstanding academic achievement.",
    icon: "https://t4.ftcdn.net/jpg/19/41/71/61/360_F_1941716168_SIW0ByYObPF8Yzo8iskVWT9Ce2s2VeEr.jpg",
    program: "Science Program",
    achievementType: "Academic",
    tag: "Top Scholar",
    video: "",
    link: "",
    audit: {
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      createdBy: "Admin",
      updatedBy: "Admin",
    },
  },
  {
    uuid: "2",
    title: "Community Service Recognition",
    description: "Recognized for exceptional community service.",
    icon:  "https://png.pngtree.com/png-vector/20241211/ourmid/pngtree-blue-gold-best-award-badge-medal-with-stars-and-paddy-for-vector-png-image_14658125.png",
    program: "Social Program",
    achievementType: "Service",
    tag: "Volunteer",
    video: "",
    link: "",
    audit: {
      createdAt: "2026-02-01",
      updatedAt: "2026-02-01",
      createdBy: "Admin",
      updatedBy: "Admin",
    },
  },
  {
    uuid: "3",
    title: "Sports Excellence Award",
    description: "Awarded for outstanding sports performance.",
    icon:"https://png.pngtree.com/png-vector/20250724/ourmid/pngtree-gold-red-best-award-badge-medal-with-paddy-symbol-for-achievement-vector-png-image_16651352.webp",
    program: "Sports Program",
    achievementType: "Sports",
    tag: "Champion",
    video: "",
    link: "",
    audit: {
      createdAt: "2026-03-01",
      updatedAt: "2026-03-01",
      createdBy: "Admin",
      updatedBy: "Admin",
    },
  },
];

export default function AchievementPage() {
  const [isCreateShow, setIsCreateShow] = useState(false);
  const [achievements] = useState(mockAchievements); // Using mock data
  const isLoading = false; // no fetching

  return (
    <div className="p-6 flex flex-1 flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Achievement Management"
          description="This is where you can see all achievements, create and modify them"
        />
        <Button onClick={() => setIsCreateShow(true)} variant="outline">
          <Plus />
          Create Achievement
        </Button>
      </div>

      <Separator />

      {isLoading ? (
        <DataTableSkeleton columnCount={5} />
      ) : (
        <AchievementTable
          data={achievements}
          columns={achievementColumns}
          totalItems={achievements.length}
        />
      )}

      {isCreateShow && (
        <CreateAchievementModal
          open={isCreateShow}
          onOpenChange={setIsCreateShow}
        />
      )}
    </div>
  );
}