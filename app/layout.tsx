import { Inter, Noto_Nastaliq_Urdu, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const nastaliq = Noto_Nastaliq_Urdu({ subsets: ['arabic'], variable: '--font-urdu' });
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${nastaliq.variable} ${arabic.variable}`}>
      <body className="font-sans antialiased bg-madrasa-bg">
        <AuthProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
