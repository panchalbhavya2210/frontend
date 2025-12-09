import { Outfit } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import ReduxProvider from "@/store/ReduxStoreProvieder";

const outfitSans = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "blue";
  const mode = cookieStore.get("mode")?.value || "light";

  const themeClass = mode === "dark" ? `theme-${theme}-dark` : `theme-${theme}`;
  return (
    <html lang="en" className={themeClass}>
      <body
        className={`${outfitSans.variable} ${outfitSans.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
