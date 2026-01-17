import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";

export const metadata = {
  title: "Harmil Goti | Frontend Developer",
  description:
    "Frontend Developer with 3+ years of experience in React.js and Next.js, building scalable, high-performance web applications.",
  openGraph: {
    title: "Harmil Goti | Frontend Developer",
    description:
      "React & Next.js developer focused on scalable, high-quality web applications.",
    url: "https://your-domain.vercel.app",
    siteName: "Harmil Goti Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Harmil Goti Portfolio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
