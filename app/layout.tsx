import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sauer.tattoos",
  description: "Landing page artística e brutalista para o estúdio sauer.tattoos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
