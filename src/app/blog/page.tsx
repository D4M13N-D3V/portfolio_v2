import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import PostCard from '@/components/PostCard';
import { getPosts, getTags } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Writing on AI-assisted development, MLOps, self-hosting and cloud-native .NET engineering.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [posts, tags] = await Promise.all([getPosts(tag), getTags()]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Blog
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 640 }}>
          Notes on AI-assisted development, MLOps, self-hosting and modern .NET.
        </Typography>
      </Box>

      {tags.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
          <Chip
            label="All"
            component={Link}
            href="/blog"
            clickable
            color={!tag ? 'primary' : 'default'}
            variant={!tag ? 'filled' : 'outlined'}
          />
          {tags.map((t) => (
            <Chip
              key={t.id}
              label={t.name}
              component={Link}
              href={`/blog?tag=${t.slug}`}
              clickable
              color={tag === t.slug ? 'primary' : 'default'}
              variant={tag === t.slug ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      )}

      {posts.length === 0 ? (
        <Typography color="text.secondary">No posts found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
