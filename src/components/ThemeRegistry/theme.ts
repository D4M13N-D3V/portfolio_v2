'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Brand accent carried over from d4m13n.dev.
export const ACCENT = '#4fd1ff';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT },
    background: {
      default: '#0a0e12',
      paper: '#11161c',
    },
    text: {
      primary: '#e7edf3',
      secondary: '#9fb0c0',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            'radial-gradient(1200px 600px at 50% -10%, rgba(79,209,255,0.08), transparent)',
          backgroundAttachment: 'fixed',
        },
        a: { color: ACCENT, textDecoration: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10,14,18,0.7)',
          backdropFilter: 'blur(10px)',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'transform .2s ease, border-color .2s ease, box-shadow .2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(79,209,255,0.4)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});

export default theme;
