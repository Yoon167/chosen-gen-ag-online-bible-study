import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaRegister } from "@/components/pwa-register";
import { OpenInBrowserBanner } from "@/components/open-in-browser";
import { OPEN_IN_BROWSER_BOOT_SCRIPT } from "@/lib/open-in-browser";
import { TEXT_SIZE_BOOT_SCRIPT } from "@/lib/text-size-boot";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const heading = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
});

/** iPhone screen sizes in points and pixel ratio; files live in public/splash. */
const LAUNCH_SCREENS: [number, number, number][] = [
  [440, 956, 3],
  [402, 874, 3],
  [430, 932, 3],
  [393, 852, 3],
  [428, 926, 3],
  [390, 844, 3],
  [375, 812, 3],
  [414, 896, 3],
  [414, 896, 2],
  [375, 667, 2],
  [414, 736, 3],
];

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
    // Launch screens for installed iPhones (portrait), generated from the app icon.
    startupImage: LAUNCH_SCREENS.map(([w, h, dpr]) => ({
      url: `/splash/launch-${w * dpr}x${h * dpr}.png`,
      media: `(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`,
    })),
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
        <script dangerouslySetInnerHTML={{ __html: OPEN_IN_BROWSER_BOOT_SCRIPT }} />
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
          <OpenInBrowserBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
