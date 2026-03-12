import "./globals.css";
import { ThemeProvider } from "next-themes";

const siteUrl = "https://harmil-portfolio.netlify.app";

export const metadata = {
  title: "Harmil Goti | Frontend Developer",
  description:
    "Harmil Goti is a Frontend Developer with 3+ years of experience in React.js and Next.js, building scalable and high-performance web applications.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  authors: [{ name: "Harmil Goti", url: siteUrl }],
  creator: "Harmil Goti",
  keywords: [
    "Harmil Goti",
    "Harmil",
    "Harmil Goti Developer",
    "React Developer Harmil",
    "Next.js Developer",
    "Frontend Developer India",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
    images: [`${siteUrl}/og.png`],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harmil Goti",
              url: siteUrl,
              jobTitle: "Frontend Developer",
              sameAs: [
                "https://www.linkedin.com/in/harmilgoti",
                "https://github.com/harmil-goti",
              ],
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
