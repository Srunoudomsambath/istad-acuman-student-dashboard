import type { CertificateDetail } from "@/lib/types/student";

export const studentCertificates: CertificateDetail[] = [
  {
    uuid: "certificate-9spf5",
    code: "9SPF5",
    certificateId: "9SPF5",
    certificateType: "quiz",
    title: "Build a Blockchain and a Cryptocurrency from Scratch",
    issuedAt: "11 Thu 2024",
    studentName: "Chan Chhaya",
    platformName: "ISTAD",
    instructorName: "Mr. Sokha",
    courseCode: "WEB DEVELOPMENT",
    courseDescription: "Learn HTML, CSS, JavaScript and modern frontend workflows.",
    description: "Certificate earned for quiz completion in the blockchain course.",
    backgroundImage: "/certificate.jpg",
  },
  {
    uuid: "certificate-fwd-2024",
    code: "FWD-2024-01",
    certificateId: "FWD-2024-01",
    certificateType: "bootcamp",
    title: "Full-Stack Web Development",
    issuedAt: "18 May 2024",
    studentName: "Chan Chhaya",
    platformName: "ISTAD",
    instructorName: "Mr. Sokha",
    courseCode: "FWD",
    courseDescription: "Completed the Web Development Bootcamp track.",
    description: "Certificate earned after completing the bootcamp track.",
    backgroundImage: "/certificate.jpg",
  },
  {
    uuid: "certificate-fmd-2024",
    code: "FMD-2024-02",
    certificateId: "FMD-2024-02",
    certificateType: "bootcamp",
    title: "Flutter Mobile Development",
    issuedAt: "08 Dec 2024",
    studentName: "Chan Chhaya",
    platformName: "ISTAD",
    instructorName: "Mr. Sokha",
    courseCode: "FMD",
    courseDescription: "Completed the Mobile App Development track.",
    description: "Certificate earned after completing the mobile track.",
    backgroundImage: "/certificate.jpg",
  },
];

export function getCertificateById(id: string) {
  return studentCertificates.find((certificate) => certificate.certificateId === id);
}
