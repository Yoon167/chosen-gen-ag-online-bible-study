import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaRegister } from "@/components/pwa-register";
import { TEXT_SIZE_BOOT_SCRIPT } from "@/lib/text-size-boot";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const heading = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gideon-app.web.app"),
  title: "GIDEON — Strengthening Faith. Growing Disciples.",
  description:
    "GIDEON is an all-in-one Christian discipleship and ministry platform: Bible reading plans, daily devotion, prayer, spiritual journey, notes, and more.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "GIDEON",
    title: "GIDEON — A Christian Journey",
    description: "Bible, daily devotion, prayer, testimony and teaching recaps for AG members.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "GIDEON — A Christian Journey",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GIDEON",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#131226" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${heading.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEXT_SIZE_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <PwaRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
