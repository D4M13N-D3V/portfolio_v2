import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import { getProjects, getPosts } from '@/lib/content';

export const revalidate = 60;

function SectionHeader({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        mb: 3,
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Button component={Link} href={href} endIcon={<ArrowForwardIcon />}>
        {cta}
      </Button>
    </Box>
  );
}

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <Hero />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SectionHeader title="Featured Projects" href="/projects" cta="All projects" />
        <Grid container spacing={3}>
          {featured.map((p) => (
            <Grid key={p.id} size={{ xs: 12, md: 4 }}>
              <ProjectCard project={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SectionHeader title="Latest Writing" href="/blog" cta="All posts" />
        {latestPosts.length === 0 ? (
          <Typography color="text.secondary">No posts yet — check back soon.</Typography>
        ) : (
          <Grid container spacing={3}>
            {latestPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, md: 4 }}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            border: '1px solid rgba(79,209,255,0.25)',
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            background:
              'linear-gradient(135deg, rgba(79,209,255,0.08), rgba(79,209,255,0))',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ alignItems: { md: 'center' }, justifyContent: 'space-between' }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                Want the full picture?
              </Typography>
              <Typography color="text.secondary">
                Experience, the stack I work in, and how to reach me.
              </Typography>
            </Box>
            <Button component={Link} href="/about" variant="contained" size="large">
              About me
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
