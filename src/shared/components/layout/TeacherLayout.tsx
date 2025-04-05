import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DatabaseIcon from '../../../assets/Dashboard-SVGs/database.svg?react';
import DashboardIcon from '../../../assets/Dashboard-SVGs/dashboard-icon.svg?react';
import ProstutiLogo from '../../../assets/Dashboard-SVGs/Prostuti-logo.svg?react';
import MyCourseIcon from '../../../assets/Dashboard-SVGs/my-courses.svg?react';
import MessagesIcon from '../../../assets/Dashboard-SVGs/messages.svg?react';
import FlashCardIcon from '../../../assets/Dashboard-SVGs/flashcard.svg?react';
import ProfileIcon from '../../../assets/Dashboard-SVGs/profile.svg?react';
import LogOutIcon from '../../../assets/Dashboard-SVGs/logout.svg?react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Welcome from '../Welcome';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/features/auth/authSlice';

const drawerWidth = 256;
const teacherDashboardMenus = [
  {
    path: '/teacher/dashboard',
    name: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    path: '/teacher/my-course',
    name: 'My Course',
    icon: <MyCourseIcon />,
  },
  {
    path: '/teacher/messages',
    name: 'Messages',
    icon: <MessagesIcon />,
  },
  {
    path: '/teacher/flashcard',
    name: 'Flashcard',
    icon: <FlashCardIcon />,
  },
  {
    path: '/teacher/question-database',
    name: 'Question Database',
    icon: <DatabaseIcon />,
  },
  {
    path: '/teacher/profile',
    name: 'Profile',
    icon: <ProfileIcon />,
  },
];

export const TeacherLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      {/* sidebar starts */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* logo */}
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-start', p: 2, ml: 2 }}
        >
          <ProstutiLogo />
        </Box>
        {/* logo end */}
        {/* sidebar menu start */}
        <List sx={{ ml: 2 }}>
          {teacherDashboardMenus.map((item, index) => (
            <ListItem key={index} disablePadding>
              {/* navlink comes from react router dom */}
              <NavLink
                to={item.path as string}
                style={({ isActive }) => {
                  return isActive
                    ? {
                      textDecoration: 'none',
                      width: '93%',
                      color: '#2970FF',
                      backgroundColor: '#EFF4FF',
                      borderRadius: '10px',
                    }
                    : {
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      width: '93%',
                    };
                }}
              >
                <ListItemButton
                  sx={{
                    '&:hover': {
                      color: '#2970FF',
                      backgroundColor: '#EFF4FF',
                      borderRadius: '10px',
                    },
                  }}
                >
                  <ListItemIcon sx={{ mr: -3 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
          {/* logout button */}
          <ListItem disablePadding>
            <Box sx={{ width: '93%' }}>
              <ListItemButton
                sx={{
                  color: '#9CA3AF',
                  '&:hover': {
                    color: '#2970FF',
                    backgroundColor: '#EFF4FF',
                    borderRadius: '10px',
                  },
                }}
                onClick={() => dispatch(logout())}
              >
                <ListItemIcon sx={{ mr: -3 }}>
                  <LogOutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </Box>
          </ListItem>
        </List>
        {/* sidebar menu start */}
      </Drawer>
      {/* sidebar ends */}
      {/* main content section */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#FAFAFA', px: 4, minHeight: '100vh' }}
      >
        <Toolbar />
        {/* sidebar menu main content will show here */}
        {location.pathname === '/teacher' ? <Welcome /> : <Outlet />}
        <Toolbar />
      </Box>
      {/* main content ends */}
    </Box>
  );
};

export default TeacherLayout;
