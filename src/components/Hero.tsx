'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SocialIcons from '@/components/SocialIcons';
import { ACCENT } from '@/components/ThemeRegistry/theme';
import { profile } from '@/data/resume';

const phrases = [
  'Senior Full Stack .NET Developer',
  'Microservices & cloud-native engineer',
  'AI / MLOps tinkerer',
  'Self-hosting enthusiast',
];

// A lightweight type/delete cycling animation for the hero subtitle.
function useTypewriter(words: string[], typing = 70, deleting = 35, pause = 1600) {
  const [text, setText] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<'typing' | 'pausing' | 'deleting'>('typing');

  React.useEffect(() => {
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typing);
      } else {
        timeout = setTimeout(() => setPhase('deleting'), pause);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), deleting);
      } else {
        setIndex((i) => i + 1);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, words, typing, deleting, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(phrases);

  return (
    <Box sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>
          {profile.location}
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          sx={{ mt: 1, fontSize: { xs: '2.4rem', md: '3.6rem' } }}
        >
          Hi, I&apos;m{' '}
          <Box
            component="span"
            sx={{
              color: ACCENT,
              textShadow: '0 0 18px rgba(79,209,255,0.35)',
            }}
          >
            {profile.name}
          </Box>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mt: 2,
            color: 'text.secondary',
            minHeight: '2.2rem',
          }}
        >
          {typed}
          <Box component="span" sx={{ color: ACCENT, animation: 'blink 1s step-end infinite' }}>
            _
          </Box>
        </Typography>

        <Typography sx={{ mt: 3, maxWidth: 640, color: 'text.secondary' }}>
          {profile.summary}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 4, alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Button component={Link} href="/projects" variant="contained" size="large">
            View Projects
          </Button>
          <Button component={Link} href="/blog" variant="outlined" size="large">
            Read the Blog
          </Button>
          <SocialIcons />
        </Stack>
      </Container>

      <style jsx global>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
}
