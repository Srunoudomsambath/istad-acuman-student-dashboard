export type ScholarStatus = "ACTIVE" | "GRADUATED" | "SUSPENDED" | "DROPPED";

export type Gender = "Male" | "Female" | "Other";

export type Career = {
  uuid: string;
  company: string;
  companyType: string;
  position: string;
  salary: number;
  interest: string;
};

export type Specialist = {
  uuid: string;
  country: string;
  specialist: string;
  universityName: string;
  degreeType: string;
  about: string;
};

export type CompletedCourse = {
  uuid: string;
  code: string;
  title: string;
  batch: string;
  description: string;
};

export type Certificate = {
  uuid: string;
  code: string;
  title: string;
  issuedAt: string;
  description: string;
};

export type CertificateDetail = Certificate & {
  certificateId: string;
  certificateType: string;
  studentName: string;
  platformName: string;
  instructorName: string;
  courseCode: string;
  courseDescription: string;
  backgroundImage: string;
  createdBy?: string;
  id?: number;
  openingProgramName?: string;
  fileName?: string;
  tempCertificateUrl?: string;
  certificateUrl?: string;
  isVerified?: boolean;
  verifiedAt?: string;
  isDisabled?: boolean;
  isDeleted?: boolean;
};

export type Achievement = {
  uuid: string;
  code: string;
  title: string;
  date: string;
  description: string;
};

export type Badge = {
  uuid: string;
  code: string;
  title: string;
  date: string;
  description: string;
};

export type PaymentStatus = "Paid" | "Pending" | "Overdue";

export type PaymentRecord = {
  uuid: string;
  label: string;
  description: string;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
};

export type Scholar = {
  id: number;
  uuid: string;
  accountName: string;
  username: string;
  englishName: string;
  khmerName: string;
  email: string;
  gender: Gender;
  dob: string;
  phone: string;
  personalNumber: string;
  familyNumber: string;
  guardianRelationship: string;
  placeOfBirth: string;
  currentAddress: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  status: ScholarStatus;
  bio: string;
  quote: string;
  avatar: string;
  isPublic: boolean;
  isAbroad: boolean;
  isEmployed: boolean;
  completedCourses: CompletedCourse[];
  careers: Career[];
  specialists: Specialist[];
  certificates: Certificate[];
  achievements: Achievement[];
  badges: Badge[];
  payments: PaymentRecord[];
  year: string;
  generation: string;
  major: string;
};

export type StudentNotification = {
  uuid: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  unread: boolean;
};

export type PaymentRecordExtended = PaymentRecord & {
  amountNum: number;
};

export type UpcomingPayment = {
  uuid: string;
  label: string;
  dueDate: string;
  amount: number;
  daysLeft: number;
};


