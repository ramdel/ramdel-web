import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata = {
  title: 'Mario de Jesus - DevSecOps Engineer',
  description: 'DevSecOps Engineer specializing in AI-powered security automation. Based in Montreal, QC.',
  keywords: 'DevSecOps, Security, AI, Montreal, AWS, Python, Automation',
};

// Generate static params for all supported locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'fr' }
  ];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-terminal-black text-terminal-green font-mono antialiased">
        <div className="terminal-scanlines"></div>
        <NextIntlClientProvider messages={messages}>
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}