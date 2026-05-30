import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Software, open-source and AI/ML projects by Damien Ostler.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Projects
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 640 }}>
          A selection of platforms, libraries and experiments I&apos;ve built — from
          self-hosted .NET products to open-source packages and AI/ML tooling.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {projects.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard project={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
