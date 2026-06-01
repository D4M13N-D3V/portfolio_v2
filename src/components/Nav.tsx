'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { ACCENT } from '@/components/ThemeRegistry/theme';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box
            component={Link}
            href="/"
            sx={{
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'text.primary',
              letterSpacing: '0.5px',
            }}
          >
            <Box component="span" sx={{ color: ACCENT }}>
              d4m13n
            </Box>
            .dev
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {links.map((l) => (
              <Button
                key={l.href}
                component={Link}
                href={l.href}
                sx={{
                  color: isActive(l.href) ? ACCENT : 'text.secondary',
                  fontWeight: 500,
                  '&:hover': { color: ACCENT, background: 'transparent' },
                }}
              >
                {l.label}
              </Button>
            ))}
          </Box>

          <IconButton
            aria-label="menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {links.map((l) => (
              <ListItemButton
                key={l.href}
                component={Link}
                href={l.href}
                selected={isActive(l.href)}
              >
                <ListItemText primary={l.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
