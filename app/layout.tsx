import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BloodLink India | Every Drop Connects a Life",
  description: "Connect voluntary blood donors with patients and licensed hospitals across India.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  themeColor: "#d92332",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🩸</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
