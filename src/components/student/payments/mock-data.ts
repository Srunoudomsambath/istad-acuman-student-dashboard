import type {
  HighDegreeProgram,
  PaymentHistoryItem,
  ScholarshipProgram,
} from "@/components/student/payments/types";

export const highDegreeProgram: HighDegreeProgram = {
  studyType: "High-degree",
  programType: "Bachelor",
  programTitle: "Bachelor of Information Technology",
  terms: [
    {
      id: "bachelor-sem-1-2026",
      label: "Semester 1 - 2026",
      totalFee: 1200,
      installments: [
        {
          id: "hd-1",
          label: "Payment 1",
          dueDate: "2026-01-15",
          amount: 400,
          paidAmount: 400,
          paidDate: "2026-01-12",
          method: "Bank",
          status: "Paid",
        },
        {
          id: "hd-2",
          label: "Payment 2",
          dueDate: "2026-02-15",
          amount: 400,
          paidAmount: 250,
          paidDate: "2026-02-17",
          method: "Cash",
          status: "Partial",
        },
        {
          id: "hd-3",
          label: "Payment 3",
          dueDate: "2026-03-25",
          amount: 400,
          paidAmount: 0,
          status: "Overdue",
        },
      ],
    },
    {
      id: "bachelor-sem-2-2026",
      label: "Semester 2 - 2026",
      totalFee: 1300,
      installments: [
        {
          id: "hd-4",
          label: "Payment 1",
          dueDate: "2026-06-10",
          amount: 500,
          paidAmount: 0,
          status: "Pending",
        },
        {
          id: "hd-5",
          label: "Payment 2",
          dueDate: "2026-07-10",
          amount: 400,
          paidAmount: 0,
          status: "Pending",
        },
        {
          id: "hd-6",
          label: "Payment 3",
          dueDate: "2026-08-10",
          amount: 400,
          paidAmount: 0,
          status: "Pending",
        },
      ],
    },
  ],
};

export const scholarshipPrograms: ScholarshipProgram[] = [
  {
    studyType: "Scholarship",
    programType: "Foundation",
    programTitle: "Pre-University Foundation",
    duration: "4 months",
    totalFee: 200,
    status: "Active",
    installments: [
      {
        id: "sc-1",
        label: "Payment 1",
        dueDate: "2026-02-10",
        amount: 80,
        paidAmount: 80,
        paidDate: "2026-02-08",
        method: "Bank",
        status: "Paid",
      },
      {
        id: "sc-2",
        label: "Payment 2",
        dueDate: "2026-04-05",
        amount: 120,
        paidAmount: 40,
        paidDate: "2026-03-28",
        method: "Cash",
        status: "Partial",
      },
    ],
  },
  {
    studyType: "Scholarship",
    programType: "ITP",
    programTitle: "IT Professional Scholarship",
    duration: "5 months",
    totalFee: 350,
    status: "Active",
    installments: [
      {
        id: "sc-3",
        label: "Payment 1",
        dueDate: "2026-04-15",
        amount: 150,
        paidAmount: 0,
        status: "Pending",
      },
      {
        id: "sc-4",
        label: "Payment 2",
        dueDate: "2026-05-15",
        amount: 200,
        paidAmount: 0,
        status: "Pending",
      },
    ],
  },
];

export const paymentHistory: PaymentHistoryItem[] = [
  {
    date: "Jan 12, 2026",
    description: "Bachelor IT / Payment 1",
    amount: 400,
    method: "Bank",
    studyType: "High-degree",
  },
  {
    date: "Feb 08, 2026",
    description: "Foundation / Payment 1",
    amount: 80,
    method: "Bank",
    studyType: "Scholarship",
  },
  {
    date: "Feb 17, 2026",
    description: "Bachelor IT / Payment 2",
    amount: 250,
    method: "Cash",
    studyType: "High-degree",
  },
  {
    date: "Mar 28, 2026",
    description: "Foundation / Payment 2",
    amount: 40,
    method: "Cash",
    studyType: "Scholarship",
  },
];
