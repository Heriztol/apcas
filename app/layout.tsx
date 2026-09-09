import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "APCAS SCMS", description: "APCAS Student Council Management System" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
