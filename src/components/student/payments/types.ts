export type PaymentStatus = "Paid" | "Partial" | "Pending" | "Overdue";
export type StudyType = "High-degree" | "Scholarship";

export type Installment = {
  id: string;
  label: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  method?: string;
  paidDate?: string;
  status: PaymentStatus;
};

export type HighDegreeTerm = {
  id: string;
  label: string;
  totalFee: number;
  installments: Installment[];
};

export type HighDegreeProgram = {
  studyType: "High-degree";
  programType: "Bachelor" | "Associate";
  programTitle: string;
  terms: HighDegreeTerm[];
};

export type ScholarshipProgram = {
  studyType: "Scholarship";
  programType: string;
  programTitle: string;
  duration: string;
  totalFee: number;
  installments: Installment[];
  status: "Active" | "Completed";
};

export type PaymentHistoryItem = {
  date: string;
  description: string;
  amount: number;
  method: string;
  studyType: StudyType;
};
