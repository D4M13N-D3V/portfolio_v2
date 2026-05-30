import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import theme from '@/components/ThemeRegistry/theme';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Damien Ostler · d4m13n.dev',
    template: '%s · d4m13n.dev',
  },
  description:
    'Senior Full Stack .NET Developer. Projects, writing on AI-assisted development, MLOps, and cloud-native engineering.',
  openGraph: {
    title: 'Damien Ostler · d4m13n.dev',
    description:
      'Senior Full Stack .NET Developer. Projects and writing on AI, MLOps and cloud-native engineering.',
    url: siteUrl,
    siteName: 'd4m13n.dev',
    type: 'website',
  },
  alternates: {
    types: { 'application/rss+xml': `${siteUrl}/rss.xml` },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <Nav />
              <Box component="main" sx={{ flex: 1, width: '100%' }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
