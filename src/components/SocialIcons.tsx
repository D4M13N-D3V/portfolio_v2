'use client';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import StorageIcon from '@mui/icons-material/Storage';
import { profile } from '@/data/resume';

const items = [
  { label: 'GitHub', href: profile.socials.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedInIcon },
  { label: 'Gitea', href: profile.socials.gitea, Icon: StorageIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: EmailIcon },
];

export default function SocialIcons({ size = 'medium' }: { size?: 'small' | 'medium' }) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {items.map(({ label, href, Icon }) => (
        <Tooltip key={label} title={label}>
          <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            size={size}
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <Icon fontSize={size === 'small' ? 'small' : 'medium'} />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
