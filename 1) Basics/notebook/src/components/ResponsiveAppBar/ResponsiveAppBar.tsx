import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Link from '@mui/material/Link';

import { useNavigate } from "react-router-dom";

// Main Component ==================================================

interface IProps {
  pages: Array<string>
}

const ResponsiveAppBar = ({ pages }: IProps) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const name = "Notebook";

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>, page:string) => {
    if (page !== "backdropClick") navigate(page);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileMenuPages data={{handleOpenNavMenu, anchorElNav, handleCloseNavMenu, pages}}/>
          {/* <DesktopIcon name={name}/> */}
          <MobileIcon name={name}/>
          {/* <DesktopPages data={{handleCloseNavMenu, pages}}/> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// =================================================================
// Aux Components ==================================================

let DesktopIcon = ({name}:{name:string}) => (
  <>
    <SchoolRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
    <Typography
      variant="h6"
      noWrap
      href='/'
      component={Link}
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      {name}
    </Typography>
  </>
);

let MobileMenuPages = (props: any) => {
  let { handleOpenNavMenu, anchorElNav, handleCloseNavMenu, pages } = props.data;
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block' },
          }}
        >
          {pages.map((page:string) => (
            <MenuItem key={page} onClick={(ev:any) => handleCloseNavMenu(ev, page)}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  )
};

let MobileIcon = ({name}:{name:string}) => (
  <>
    <SchoolRoundedIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        href='/'
        component={Link}
        sx={{
          mr: 2,
          display: { xs: 'flex' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {name}
      </Typography>
  </>
);

let DesktopPages = (props: any) => {
  let { handleCloseNavMenu, pages } = props.data;
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page:string) => (
          <Button
            key={page}
            onClick={(ev:any) => handleCloseNavMenu(ev, page)}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  )
};

// =================================================================

export default ResponsiveAppBar;
