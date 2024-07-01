import "./globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers/app-providers";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/providers/WalletProvider";


export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-full w-full")}>
        <WalletProvider>
          <AppProviders>
            {children}
          </AppProviders>
        </WalletProvider>
        <Toaster />
      </body>
    </html>
  );
}
