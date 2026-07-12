import '../../styles/globals.css';
import { getDictionary } from '../../lib/i18n/getDictionary';
import type { Locale } from '../../lib/i18n/config';
import { ReactNode } from 'react';
import Link from 'next/link';
import SmoothScroll from '../../components/SmoothScroll';
import GSAPInitializer from '../../components/GSAPInitializer';

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  // Initialize dictionary or global contexts here if needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dictionary = await getDictionary(typedLocale);

  return (
    <html lang={typedLocale}>
      <head>
        <title>Sandra Jabalera</title>
        <meta name="description" content="Historias que merecen ser escuchadas." />
      </head>
      <body>
        <div className="language-selector" style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 100, display: 'flex', gap: '1rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          <Link href="/es" style={{ color: 'inherit', textDecoration: 'none' }}>ES</Link>
          <Link href="/en" style={{ color: 'inherit', textDecoration: 'none' }}>EN</Link>
          <Link href="/fr" style={{ color: 'inherit', textDecoration: 'none' }}>FR</Link>
        </div>
        
        {/* The Red Thread Global Container (Will be replaced by SVG later) */}
        <div style={{ position: 'fixed', pointerEvents: 'none', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}></div>
        
        <GSAPInitializer />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
