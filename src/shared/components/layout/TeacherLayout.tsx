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
import DatabaseIcon from '../Icons/DatabaseIcon';
import DashboardIcon from '../Icons/DashboardIcon';
import ProstutiLogo from '../Icons/ProstutiLogo';
import MyCourseIcon from '../Icons/MyCourseIcon';
import MessagesIcon from '../Icons/MessagesIcon';
import FlashCardIcon from '../Icons/FlashCardIcon';
import ProfileIcon from '../Icons/ProfileIcon';
import LogOutIcon from '../Icons/LogOutIcon';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Welcome from '../Welcome';

const drawerWidth = 256;
const teacherDashboardMenus = [
    {
        path: '/teacher/dashboard',
        name: 'Dashboard',
        icon: <DashboardIcon />
    },
    {
        path: '/teacher/my-course',
        name: 'My Course',
        icon: <MyCourseIcon />
    },
    {
        path: '/teacher/messages',
        name: 'Messages',
        icon: <MessagesIcon />
    },
    {
        path: '/teacher/flashcard',
        name: 'Flashcard',
        icon: <FlashCardIcon />
    },
    {
        path: '/teacher/question-database',
        name: 'Question Database',
        icon: <DatabaseIcon />
    },
    {
        path: '/teacher/profile',
        name: 'Profile',
        icon: <ProfileIcon />
    },
];

export const TeacherLayout = () => {
    const location = useLocation();
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
            </AppBar>
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 2, ml: 2 }}>
                    <ProstutiLogo />
                </Box>
                {/* logo end */}
                {/* sidebar menu start */}
                <List sx={{ ml: 2, }}>
                    {teacherDashboardMenus.map((item, index) => (
                        <ListItem key={index} disablePadding >
                            {/* navlink comes from react router dom */}
                            <NavLink to={item.path as string} style={({ isActive }) => {
                                return isActive ? { textDecoration: 'none', width: '93%', color: '#2970FF', backgroundColor: '#EFF4FF', borderRadius: '10px' } : { color: '#9CA3AF', textDecoration: 'none', width: '93%' };
                            }}
                            >
                                <ListItemButton sx={{ '&:hover': { color: '#2970FF', backgroundColor: '#EFF4FF', borderRadius: '10px' } }}>
                                    <ListItemIcon sx={{ mr: -3 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                    {/* logout button */}
                    <ListItem disablePadding>
                        <Box sx={{ width: '93%' }}>
                            <ListItemButton sx={{ color: '#9CA3AF', '&:hover': { color: '#2970FF', backgroundColor: '#EFF4FF', borderRadius: '10px' } }}
                                onClick={() => console.log('Logging out')}>
                                <ListItemIcon sx={{ mr: -3 }}>
                                    <LogOutIcon />
                                </ListItemIcon>
                                <ListItemText primary='Log Out' />
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
                sx={{ flexGrow: 1, bgcolor: 'background.default', px: 4 }}
            >
                <Toolbar />
                {/* sidebar menu main content will show here */}
                {
                    location.pathname === '/' ? <Welcome /> : <Outlet />
                }
            </Box>
            {/* main content ends */}
        </Box >
    );
};

export default TeacherLayout;