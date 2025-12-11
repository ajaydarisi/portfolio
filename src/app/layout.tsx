import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ajay Darisi | Software Developer",
  description: "Portfolio of Ajay Darisi - Software Developer specializing in ReactJS, NextJS, and Scalable Web Architectures.",
  openGraph: {
    title: "Ajay Darisi | Software Developer",
    description: "Portfolio of Ajay Darisi - Software Developer specializing in ReactJS, NextJS, and Scalable Web Architectures.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Darisi | Software Developer",
    description: "Portfolio of Ajay Darisi - Software Developer specializing in ReactJS, NextJS, and Scalable Web Architectures.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
