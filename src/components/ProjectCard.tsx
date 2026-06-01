import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import type { Project } from '@/lib/types';

// Render a description, turning any inline http(s) URLs into clickable links.
function renderDescription(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+?)(?=[.,;:)]?(?:\s|$))/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <Link
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ wordBreak: 'break-word' }}
      >
        {part}
      </Link>
    ) : (
      part
    ),
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" component="h3">
            {project.title}
          </Typography>
          {project.featured && (
            <Chip label="Featured" size="small" color="primary" variant="outlined" />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {renderDescription(project.description)}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {project.technologies.map((t) => (
            <Chip key={t} label={t} size="small" />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
        {project.repo_url && (
          <Button
            size="small"
            startIcon={<GitHubIcon />}
            component="a"
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Button>
        )}
        {project.demo_url && (
          <Button
            size="small"
            startIcon={<LaunchIcon />}
            component="a"
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
