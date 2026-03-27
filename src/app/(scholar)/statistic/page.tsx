"use client";

import { Heading } from "@/components/Heading";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddScholar from "@/features/scholar/statistic/components/AddScholar";
import ScholarCharts from "@/features/scholar/statistic/components/ScholarCharts";
import { StatisticCard } from "@/features/scholar/statistic/components/StatisticCard";
import { ScholarColumns } from "@/features/scholar/statistic/components/table/column";
import { ScholarTable } from "@/features/scholar/statistic/components/table/data-table";
import { Scholar } from "@/types/scholar";
import { Gender, ScholarStatus } from "@/types/scholar";

import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function StatisticPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // ✅ STATIC SCHOLAR DATA

const data: Scholar[] = [
  {
    uuid: "1",
    username: "john123",
    email: "john@example.com",
    englishName: "John Doe",
    khmerName: "ចន ដូ",

    gender: Gender.MALE,
    status: ScholarStatus.ACTIVE,

    dob: "2003-01-01",
    role: "STUDENT",

    university: "RUPP",
    province: "Phnom Penh",
    currentAddress: "Chamkarmon",

    nickname: "John",
    bio: "A passionate student.",
    avatar: "https://via.placeholder.com/150",

    phoneFamilyNumber: "012345678",
    phoneNumber: "098765432",

    isPublic: true,
    isAbroad: false,
    isEmployed: false,

    specialist: [], // ✅ array required
    careers: [],    // ✅ array required

    quote: "Keep learning!",

    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "system",
      updatedBy: "system",
    },

    badges: [], // ✅ array
    completedCourses: [], // ✅ array
  },

  {
    uuid: "2",
    username: "sreylin",
    email: "srey@example.com",
    englishName: "Srey Lin",
    khmerName: "ស្រីលីន",

    gender: Gender.FEMALE,
    status: ScholarStatus.ACTIVE,

    dob: "2002-05-10",
    role: "STUDENT",

    university: "ITC",
    province: "Kandal",
    currentAddress: "Ta Khmao",

    nickname: "Lin",
    bio: "Future engineer.",
    avatar: "https://via.placeholder.com/150",

    phoneFamilyNumber: "011223344",
    phoneNumber: "099887766",

    isPublic: true,
    isAbroad: false,
    isEmployed: false,

    specialist: [],
    careers: [],

    quote: "Never give up.",

    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "system",
      updatedBy: "system",
    },

    badges: [],
    completedCourses: [],
  },
  {
    uuid: "3",
    username: "dara_sok",
    email: "dara@example.com",
    englishName: "Dara Sok",
    khmerName: "ដារា សុខ",
    gender: Gender.MALE,
    status: ScholarStatus.ACTIVE,
    dob: "2001-09-15",
    role: "STUDENT",
    university: "RUPP",
    province: "Siem Reap",
    currentAddress: "Svay Dangkum",
    nickname: "Dara",
    bio: "Web developer enthusiast.",
    avatar: "https://via.placeholder.com/150",
    phoneFamilyNumber: "010101010",
    phoneNumber: "097777777",
    isPublic: true,
    isAbroad: false,
    isEmployed: true,
    specialist: [],
    careers: [],
    quote: "Code every day.",
    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin",
    },
    badges: [],
    completedCourses: [],
  },

  {
    uuid: "4",
    username: "chantha_k",
    email: "chantha@example.com",
    englishName: "Chantha Kim",
    khmerName: "ចន្ទា គឹម",
    gender: Gender.FEMALE,
    status: ScholarStatus.GRADUATED,
    dob: "2000-12-20",
    role: "STUDENT",
    university: "ITC",
    province: "Battambang",
    currentAddress: "Battambang City",
    nickname: "Chantha",
    bio: "Designer & artist.",
    avatar: "https://via.placeholder.com/150",
    phoneFamilyNumber: "088888888",
    phoneNumber: "096666666",
    isPublic: true,
    isAbroad: false,
    isEmployed: false,
    specialist: [],
    careers: [],
    quote: "Design is life.",
    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin",
    },
    badges: [],
    completedCourses: [],
  },

  {
    uuid: "5",
    username: "visal_dev",
    email: "visal@example.com",
    englishName: "Visal Heng",
    khmerName: "វិសាល ហេង",
    gender: Gender.MALE,
    status: ScholarStatus.ACTIVE,
    dob: "2002-07-07",
    role: "STUDENT",
    university: "RUPP",
    province: "Takeo",
    currentAddress: "Takeo City",
    nickname: "Visal",
    bio: "Backend developer.",
    avatar: "https://via.placeholder.com/150",
    phoneFamilyNumber: "077777777",
    phoneNumber: "095555555",
    isPublic: true,
    isAbroad: false,
    isEmployed: true,
    specialist: [],
    careers: [],
    quote: "Build APIs.",
    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "system",
      updatedBy: "system",
    },
    badges: [],
    completedCourses: [],
  },

  {
    uuid: "6",
    username: "nita_ui",
    email: "nita@example.com",
    englishName: "Nita Chhun",
    khmerName: "នីតា ឈុន",
    gender: Gender.FEMALE,
    status: ScholarStatus.ACTIVE,
    dob: "2003-03-03",
    role: "STUDENT",
    university: "ITC",
    province: "Kampong Cham",
    currentAddress: "Kampong Cham City",
    nickname: "Nita",
    bio: "UI/UX lover.",
    avatar: "https://via.placeholder.com/150",
    phoneFamilyNumber: "066666666",
    phoneNumber: "094444444",
    isPublic: true,
    isAbroad: false,
    isEmployed: false,
    specialist: [],
    careers: [],
    quote: "Make it simple.",
    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "system",
      updatedBy: "system",
    },
    badges: [],
    completedCourses: [],
  },
];

  const isLoading = false;

  // ✅ STATIC OPTIONS
  const provinceOptions = [
    { label: "Phnom Penh", value: "Phnom Penh" },
    { label: "Kandal", value: "Kandal" },
    { label: "Siem Reap", value: "Siem Reap" },
    { label: "Battambang", value: "Battambang" },
  ];

  const addressOptions = [
    { label: "Chamkarmon", value: "Chamkarmon" },
    { label: "Ta Khmao", value: "Ta Khmao" },
    { label: "Svay Dangkum", value: "Svay Dangkum" },
    { label: "Battambang City", value: "Battambang City" },
  ];

  const universityOptions = [
    { label: "RUPP", value: "RUPP" },
    { label: "ITC", value: "ITC" },
  ];

  // ✅ COLUMNS
  const column = useMemo(
    () => ScholarColumns(provinceOptions, universityOptions, addressOptions),
    []
  );

  return (
    <div className="p-6 space-y-6 min-h-screen h-fit">
      {/* HEADER */}
      <div className="flex justify-between items-center gap-10">
        <Heading
          title="Scholar Management"
          description="View statistic and manage scholars"
        />
        <Button
          onClick={() => setIsCreateOpen(true)}
          variant="outline"
          className="flex items-center gap-2.5"
        >
          <FiPlus />
          <span>Add Scholar</span>
        </Button>
      </div>

      {/* STATISTIC */}
      <StatisticCard />

      {/* CHART */}
      <ScholarCharts />

      {/* TABLE */}
      <Card className="flex flex-col space-y-4 rounded-lg shadow-sm">
        <CardHeader className="items-center pb-2">
          <CardTitle>Scholar Overview</CardTitle>
          <CardDescription>
            View and manage scholar information
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <DataTableSkeleton columnCount={5} />
          ) : (
            <ScholarTable
              columns={column}
              totalItems={data.length}
              data={data}
            />
          )}

          {isCreateOpen && (
            <AddScholar open={isCreateOpen} onOpenChange={setIsCreateOpen} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}