import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Base Daily Check-in',
  description: 'Daily check-in on Base Network',
  other: {
    // Твой App ID из панели Base Dev
    'base:app_id': '69d6b9690b55e7382276f4de', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}