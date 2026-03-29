import type {
  Achievement,
  Badge,
  Career,
  Certificate,
  CompletedCourse,
  PaymentRecord,
  Scholar,
  Specialist,
} from "@/lib/types/student";

export const studentProfile: Scholar = {
  id: 1,
  uuid: "scholar-chan-chhaya-001",
  accountName: "John123",
  username: "john_doe",
  englishName: "Chan Chhaya",
  khmerName: "ចាន់ ឆៃយ៉ា",
  email: "john.doe@example.com",
  gender: "Male",
  dob: "2003-05-15",
  phone: "+855 98 765 432",
  personalNumber: "012 345 678",
  familyNumber: "098 765 432",
  guardianRelationship: "Mother",
  placeOfBirth: "Siem Reap, Cambodia",
  currentAddress: "Phnom Penh, Cambodia",
  createdBy: "admin",
  createdAt: "Tue, Jan 10, 2023, 03:00 PM",
  updatedBy: "admin",
  updatedAt: "Thu, Jun 20, 2024, 09:30 PM",
  status: "ACTIVE",
  bio: "A passionate software engineering student who loves building impactful products.",
  quote: "Spring is not just a framework, it's the backbone of resilient microservices.",
  avatar: "/image/teacher.png",
  isPublic: true,
  isAbroad: false,
  isEmployed: true,
  year: "2",
  generation: "1",
  major: "Computer Science",
  completedCourses: [
    {
      uuid: "completed-fwd",
      code: "FWD",
      title: "Full-Stack Web Development",
      batch: "GEN 5",
      description: "Web Development Bootcamp",
    },
    {
      uuid: "completed-fmd",
      code: "FMD",
      title: "Flutter Mobile Development",
      batch: "GEN 6",
      description: "Mobile App Development",
    },
  ],
  careers: [
    {
      uuid: "career-techstart",
      company: "TechStart Cambodia",
      companyType: "Startup",
      position: "Frontend Developer",
      salary: 800,
      interest: "Building user-friendly web interfaces",
    },
  ],
  specialists: [
    {
      uuid: "specialist-local",
      country: "Cambodia",
      specialist: "Web Development",
      universityName: "Royal University of Phnom Penh",
      degreeType: "Bachelor",
      about: "Focused on full-stack web development using React and Node.js.",
    },
    {
      uuid: "specialist-abroad",
      country: "Singapore",
      specialist: "Product Engineering",
      universityName: "National University of Singapore",
      degreeType: "Bachelor",
      about: "Interest in scaling product teams and system design.",
    },
  ],
  certificates: [
    {
      uuid: "certificate-fwd",
      code: "FWD",
      title: "Full-Stack Web Development",
      issuedAt: "2024-05-18",
      description: "Completed the Web Development Bootcamp track.",
    },
    {
      uuid: "certificate-fmd",
      code: "FMD",
      title: "Flutter Mobile Development",
      issuedAt: "2024-12-08",
      description: "Completed the Mobile App Development track.",
    },
  ],
  achievements: [
    {
      uuid: "achievement-top-performer",
      code: "TP",
      title: "Top Performer",
      date: "December 1, 2023",
      description: "Awarded for exceptional academic performance.",
    },
    {
      uuid: "achievement-team-player",
      code: "CT",
      title: "Community Tutor",
      date: "March 14, 2024",
      description: "Recognized for helping peers with coding challenges.",
    },
  ],
  badges: [
    {
      uuid: "badge-top-performer",
      code: "TP",
      title: "Top Performer",
      date: "December 1, 2023",
      description: "Awarded for exceptional academic performance.",
    },
  ],
  payments: [
    {
      uuid: "payment-semester-1",
      label: "Bachelor Semester 1",
      description: "ISTAD tuition payment for the current semester.",
      amount: "$180",
      dueDate: "2025-01-15",
      status: "Paid",
    },
    {
      uuid: "payment-lab-fee",
      label: "Lab and Practice Fee",
      description: "Applied to course materials and lab access.",
      amount: "$35",
      dueDate: "2025-01-20",
      status: "Paid",
    },
    {
      uuid: "payment-short-course",
      label: "Short Course Deposit",
      description: "Reserved for the next short-course cohort.",
      amount: "$25",
      dueDate: "2025-02-10",
      status: "Pending",
    },
  ],
};

export const studentCareers: Career[] = studentProfile.careers;
export const studentSpecialists: Specialist[] = studentProfile.specialists;
export const studentCompletedCourses: CompletedCourse[] =
  studentProfile.completedCourses;
export const studentCertificates: Certificate[] = studentProfile.certificates;
export const studentAchievements: Achievement[] = studentProfile.achievements;
export const studentBadges: Badge[] = studentProfile.badges;
export const studentPayments: PaymentRecord[] = studentProfile.payments;