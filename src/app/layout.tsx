import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple TPB Client',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="mx-auto text-center mt-8 mb-5 text-sm">
          <a
            href="https://github.com/Anubisss/simple-tpb-client"
            className="text-gray-500 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Simple TPB Client
          </a>
        </footer>
      </body>
    </html>
  );
}
