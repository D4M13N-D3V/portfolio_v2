import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Box from '@mui/material/Box';

/**
 * Renders post markdown with GitHub-flavored markdown, raw HTML passthrough,
 * heading anchors and syntax-highlighted code blocks. Styling is scoped here so
 * post bodies read consistently regardless of the source.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <Box
      sx={{
        color: 'text.primary',
        lineHeight: 1.75,
        fontSize: '1.05rem',
        '& h2': { mt: 5, mb: 2, fontSize: '1.6rem', fontWeight: 700 },
        '& h3': { mt: 4, mb: 1.5, fontSize: '1.3rem', fontWeight: 600 },
        '& p': { my: 2 },
        '& a': { color: 'primary.main', textDecoration: 'underline' },
        '& ul, & ol': { pl: 3, my: 2 },
        '& li': { my: 0.75 },
        '& blockquote': {
          borderLeft: '3px solid',
          borderColor: 'primary.main',
          pl: 2,
          ml: 0,
          color: 'text.secondary',
          fontStyle: 'italic',
        },
        '& code': {
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.9em',
          background: 'rgba(255,255,255,0.06)',
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
        },
        '& pre': {
          my: 3,
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        },
        '& pre code': { background: 'transparent', p: 0, fontSize: '0.875rem' },
        '& img': { maxWidth: '100%', borderRadius: 2 },
        '& table': { borderCollapse: 'collapse', width: '100%', my: 3 },
        '& th, & td': { border: '1px solid rgba(255,255,255,0.12)', px: 1.5, py: 1 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
}
