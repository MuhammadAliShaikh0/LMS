import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 240;

const pages = [
  { title: 'Students', subItems: ['Student Registration', 'Student List'] },
  { title: 'Teachers', subItems: ['Teacher Registration', 'Teacher List'] },
  { title: 'Subjects', subItems: ['Subjects Add', 'Subject List'] },
  { title: 'Syllabus', subItems: ['Syllabus Form', 'Syllabus List'] },
  { title: 'School', subItems: ['Student Registration', 'Teacher Registration'] },
  { title: 'Class', subItems: ['Class Form', 'Class List'] },
  { title: 'Fees', subItems: ['Fee Structure', 'Fee Voucher', 'Fee Submission'] },
  { title: 'Admission', subItems: ['Admission Form'] },
  { title: 'Exam', subItems: ['Exam Schedule', 'Exam Result'] },
];

const settings = ['Logout'];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({});
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isSmallScreen = useMediaQuery('(max-width:900px)');

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const navigate = useNavigate();

  const handleToggleDropdown = (index) => {
    setOpenDropdown((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleCloseUserMenu();
    navigate("/")
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'green' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
            {isSmallScreen && (
              <IconButton
                size="large"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleToggleDrawer}
                sx={{ display: { xs: 'block', sm: 'block' }, mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <SchoolIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: { xs: '0.9rem', sm: '1.2rem' },
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {isSmallScreen ? 'LMS' : 'Learning Management System'}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

    
      <Box sx={{ mt: '64px' }} />

      <Drawer
        variant={isSmallScreen ? 'temporary' : 'persistent'}
        anchor="left"
        open={isSmallScreen ? drawerOpen : true}
        onClose={isSmallScreen ? handleToggleDrawer : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            mt: 0,
            top: '64px',
            height: 'calc(100% - 64px)',
            overflowY: 'auto',
          },
        }}
      >
        <List>
          {pages.map((page, index) => (
            <div key={page.title}>
              <ListItem button onClick={() => handleToggleDropdown(index)}>
                <MailIcon sx={{ mr: 2, color: 'green' }} />
                <ListItemText primary={page.title} sx={{ color: 'green' }} />
                {openDropdown[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openDropdown[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {page.subItems.map((subItem) => (
                    <ListItem button key={subItem} sx={{ pl: 4 }} component={Link} to={`/${subItem.replace(/\s+/g, '')}`}>
                      <ListItemText primary={subItem} sx={{ color: 'green' }} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
