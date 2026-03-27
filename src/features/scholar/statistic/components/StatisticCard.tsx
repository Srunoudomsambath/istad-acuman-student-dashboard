"use client";

import DefaultStatisticCard from "@/components/statistic-card/DefaultStatisticCard";
import { State } from "@/types";
import { Gender, Scholar, ScholarStatus } from "@/types/scholar";
import { Globe, GraduationCap, UserCheck2, Users } from "lucide-react";
import { useEffect, useState } from "react";

// ✅ IMPORT YOUR MOCK DATA

  // ✅ STATIC SCHOLAR DATA

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

export function StatisticCard() {
  const [total, setTotal] = useState<State>();
  const [active, setActive] = useState<State>();
  const [graduated, setGraduated] = useState<State>();
  const [abroad, setAbroad] = useState<State>();

  useEffect(() => {
    const totalScholar = scholars.length;

    const totalFemaleScholar = scholars.filter(
      (s) => s.gender === Gender.FEMALE
    ).length;

    setTotal({
      total: totalScholar,
      female: totalFemaleScholar,
      male: totalScholar - totalFemaleScholar,
    });

    // ✅ FIX STATUS COMPARISON (IMPORTANT)
    setActive(
      getState(
        scholars.filter((s) => s.status === ScholarStatus.ACTIVE)
      )
    );

    setGraduated(
      getState(
        scholars.filter((s) => s.status === ScholarStatus.GRADUATED)
      )
    );

    setAbroad(getState(scholars.filter((s) => s.isAbroad)));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DefaultStatisticCard
        title="Total Scholar"
        icon={Users}
        total={total}
        isLoading={false} // ✅ no loading anymore
      />
      <DefaultStatisticCard
        title="Active Scholar"
        icon={UserCheck2}
        total={active}
        isLoading={false}
      />
      <DefaultStatisticCard
        title="Graduated Scholar"
        icon={GraduationCap}
        total={graduated}
        isLoading={false}
      />
      <DefaultStatisticCard
        title="Abroad Scholar"
        icon={Globe}
        total={abroad}
        isLoading={false}
      />
    </div>
  );
}

// ✅ HELPER FUNCTION
const getState = (scholars: Scholar[]): State => {
  const totalFemale = scholars.filter((s) => s.gender === Gender.FEMALE);

  return {
    total: scholars.length,
    female: totalFemale.length,
    male: scholars.length - totalFemale.length,
  };
};