import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const font = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata = {
  title: "Ishma — Portfolio",
  description: "Interactive portfolio with projects, interfaces and education.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}