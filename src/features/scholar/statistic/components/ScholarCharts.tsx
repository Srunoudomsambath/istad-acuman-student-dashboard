"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Gender, Scholar, ScholarStatus } from "@/types/scholar";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// ✅ IMPORT MOCK DATA

const scholars: Scholar[] = [
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

const chartConfig = {
  scholars: {
    label: "Scholars",
  },
} satisfies ChartConfig;

type StatusChartData = {
  status: string;
  count: number;
  fill: string;
};

function LevelPieCard({ chartData }: { chartData: StatusChartData[] }) {
  return (
    <Card className="flex flex-col rounded-lg shadow-sm">
      <CardHeader className="items-center pb-2">
        <CardTitle>Scholars by Status</CardTitle>
        <CardDescription>Pie chart of total scholars in each status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <ChartContainer config={chartConfig} className="mx-auto h-fit w-full">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="count"
                  hideLabel
                  className="rounded-md border bg-background p-2 shadow-md"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={40}
              paddingAngle={2}
              strokeWidth={2}
            >
              <LabelList
                dataKey="status"
                className="text-primary"
                fontSize={12}
                position="outside"
                fill="var(--primary)"
                strokeWidth={0}
                offset={10}
                style={{ dominantBaseline: "central", paintOrder: "stroke" }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground pt-4">
        <span className="text-xs font-medium">
          Total: {chartData.reduce((sum, item) => sum + item.count, 0)}
        </span>
      </CardFooter>
    </Card>
  );
}

type GenderChartData = { gender: string; count: number; fill: string };

const chartConfigGender = {
  count: { label: "Count" },
  female: { label: "Female", color: "var(--chart-1)" },
  male: { label: "Male", color: "var(--chart-2)" },
  others: { label: "Others", color: "var(--chart-3)" },
};

function GenderDemographicsCard({ chartDataGender }: { chartDataGender: GenderChartData[] }) {
  return (
    <Card className="flex flex-col rounded-lg shadow-sm">
      <CardHeader className="items-center pb-2">
        <CardTitle>Scholar Gender Distribution</CardTitle>
        <CardDescription>Visual representation of scholars by gender</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <ChartContainer config={chartConfigGender} className="mx-auto h-fit  w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartDataGender}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="gender" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="count"
                    hideLabel
                    className="rounded-md border bg-background p-2 shadow-md"
                  />
                }
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} strokeWidth={0} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-2">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-[var(--chart-1)]"></div>
          <span className="text-xs">Female</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-[var(--chart-2)]"></div>
          <span className="text-xs">Male</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-[var(--chart-3)]"></div>
          <span className="text-xs">Other</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1 border-l border-border pl-4 ml-2 text-xs font-medium">
            Total: {chartDataGender.reduce((sum, item) => sum + item.count, 0)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function ScholarCharts() {
  const [genderDataChart, setGenderDataChart] = useState<GenderChartData[]>([]);
  const [statusDataChart, setStatusDataChart] = useState<StatusChartData[]>([]);

  useEffect(() => {
    // --- Gender stats
    const totalFemale = scholars.filter((s) => s.gender === Gender.FEMALE);
    const totalMale = scholars.filter((s) => s.gender === Gender.MALE);
    const totalOther = scholars.length - totalFemale.length - totalMale.length;

    setGenderDataChart([
      { gender: "Female", count: totalFemale.length, fill: "var(--chart-1)" },
      { gender: "Male", count: totalMale.length, fill: "var(--chart-2)" },
      { gender: "Other", count: totalOther, fill: "var(--chart-3)" },
    ]);

    // --- Status stats
    const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
    const statusCounts = scholars.reduce((acc, scholar) => {
      const status = scholar.status || "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusData = Object.entries(statusCounts).map(([status, count], index) => ({
      status,
      count,
      fill: colors[index % colors.length],
    }));

    setStatusDataChart(statusData);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-5 h-fit">
      <LevelPieCard chartData={statusDataChart} />
      <GenderDemographicsCard chartDataGender={genderDataChart} />
    </div>
  );
}