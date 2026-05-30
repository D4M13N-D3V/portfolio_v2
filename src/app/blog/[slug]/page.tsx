import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import Markdown from '@/components/Markdown';
import { getPost, getPosts } from '@/lib/content';
import { fileUrl } from '@/lib/pocketbase';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };
  const image = post.cover ? fileUrl('posts', post.id, post.cover) : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const tags = post.expand?.tags ?? [];
  const cover = post.cover ? fileUrl('posts', post.id, post.cover) : '';

  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Button
        component={Link}
        href="/blog"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4, color: 'text.secondary' }}
      >
        Back to blog
      </Button>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {tags.map((t) => (
          <Chip
            key={t.id}
            label={t.name}
            size="small"
            color="primary"
            variant="outlined"
            component={Link}
            href={`/blog?tag=${t.slug}`}
            clickable
          />
        ))}
      </Box>

      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : ''}
        {post.reading_minutes ? ` · ${post.reading_minutes} min read` : ''}
      </Typography>

      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <Box
          component="img"
          src={cover}
          alt={post.title}
          sx={{ width: '100%', borderRadius: 3, mt: 3, border: '1px solid rgba(255,255,255,0.08)' }}
        />
      )}

      <Divider sx={{ my: 4 }} />

      <Markdown>{post.content}</Markdown>
    </Container>
  );
}
