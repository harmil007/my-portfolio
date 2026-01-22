import "./globals.css";
import { ThemeProvider } from "next-themes";

const siteUrl = "https://harmil-portfolio.netlify.app";

export const metadata = {
  title: "Harmil Goti | Frontend Developer",
  description:
    "Harmil Goti is a Frontend Developer with 3+ years of experience in React.js and Next.js, building scalable and high-performance web applications.",

  openGraph: {
    title: "Harmil Goti | Frontend Developer",
    description:
      "React & Next.js developer focused on building scalable, high-quality web applications.",
    url: siteUrl,
    siteName: "Harmil Goti Portfolio",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Harmil Goti Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Harmil Goti | Frontend Developer",
    description:
      "Frontend Developer with expertise in React.js & Next.js, creating high-performance web apps.",
    images: [`${siteUrl}/og.png`], // ✅ ABSOLUTE URL
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
