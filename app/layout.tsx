import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";
import GitHubActivity from "@/components/layout/GitHubActivity";
import EasterEgg from "@/components/layout/EasterEgg";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackgroundCanvas from "@/components/ui/BackgroundCanvas";
import { ThemeProvider } from "@/lib/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: 'Om Patel - "Software Developer"Building web apps, exploring ML & data ',
  description: "Portfolio of Om Patel - Full Stack Developer, Data Scientist, and ML Engineer",
  keywords: ["Om Patel", "Full Stack Developer", "Data Scientist", "Machine Learning", "Portfolio"],
  authors: [{ name: "Om Patel" }],
  openGraph: {
    title: "Om Patel - Full Stack Developer & Data Scientist",
    description: "Portfolio showcasing projects and experience in web development and data science",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>
        <ThemeProvider>
          <BackgroundCanvas />
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
          <GitHubActivity />
          <EasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
