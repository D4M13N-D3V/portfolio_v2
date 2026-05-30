import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import SocialIcons from '@/components/SocialIcons';
import { profile, skillGroups, experience } from '@/data/resume';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Damien Ostler — Senior Full Stack .NET Developer. Experience, skills and contact.',
};

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 760, fontSize: '1.1rem' }}>
          {profile.summary}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <SocialIcons />
        </Box>
      </Box>

      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Skills
      </Typography>
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {skillGroups.map((g) => (
          <Grid key={g.category} size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 3, height: '100%', backgroundImage: 'none' }} variant="outlined">
              <Typography variant="subtitle1" color="primary" gutterBottom>
                {g.category}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {g.skills.map((s) => (
                  <Chip key={s} label={s} size="small" />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Experience
      </Typography>
      <Box sx={{ position: 'relative' }}>
        {experience.map((job, i) => (
          <Box
            key={`${job.company}-${i}`}
            sx={{
              position: 'relative',
              pl: { xs: 3, md: 4 },
              pb: 4,
              borderLeft: '2px solid rgba(79,209,255,0.25)',
              '&:last-of-type': { borderLeft: '2px solid transparent', pb: 0 },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: -7,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                boxShadow: '0 0 12px rgba(79,209,255,0.6)',
              }}
            />
            <Typography variant="h6">{job.role}</Typography>
            <Typography color="primary" sx={{ fontWeight: 500 }}>
              {job.company}
              {job.location ? ` · ${job.location}` : ''}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {job.period}
            </Typography>
            <Box component="ul" sx={{ mt: 1.5, pl: 2.5, color: 'text.secondary' }}>
              {job.highlights.map((h, j) => (
                <Box component="li" key={j} sx={{ mb: 0.75 }}>
                  {h}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 6 }} />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Let&apos;s talk
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Reach me at{' '}
          <Box component="a" href={`mailto:${profile.email}`} sx={{ color: 'primary.main' }}>
            {profile.email}
          </Box>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SocialIcons />
        </Box>
      </Box>
    </Container>
  );
}
