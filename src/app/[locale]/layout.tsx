import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'Mario de Jesus — DevSecOps Engineer & Technical Lead',
  description:
    'DevSecOps Engineer and Technical Lead with 15+ years of experience in cloud security, AWS architecture, and AI-powered automation. Based in Montreal, QC.',
  keywords:
    'DevSecOps, Cloud Security, AWS, Technical Lead, Montreal, Python, Automation, CI/CD, Security Engineering',
  openGraph: {
    title: 'Mario de Jesus — DevSecOps Engineer & Technical Lead',
    description:
      'DevSecOps Engineer and Technical Lead with 15+ years of experience in cloud security, AWS architecture, and AI-powered automation.',
    siteName: 'ramdel.dev',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'fr' }];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
