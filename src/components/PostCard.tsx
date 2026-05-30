import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import type { Post } from '@/lib/types';
import { fileUrl } from '@/lib/pocketbase';

export default function PostCard({ post }: { post: Post }) {
  const cover = post.cover ? fileUrl('posts', post.id, post.cover, '600x340') : '';
  const tags = post.expand?.tags ?? [];

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        component={Link}
        href={`/blog/${post.slug}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {cover && (
          <CardMedia component="img" image={cover} alt={post.title} sx={{ height: 180 }} />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
            {tags.map((t) => (
              <Chip key={t.id} label={t.name} size="small" color="primary" variant="outlined" />
            ))}
          </Box>
          <Typography variant="h6" component="h3" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.excerpt}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : ''}
            {post.reading_minutes ? ` · ${post.reading_minutes} min read` : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
