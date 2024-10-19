import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { adminRoutes } from './admin.routes';
import { teacherRoutes } from './teacher.routes';
import Login from '../shared/components/Login';


const router = createBrowserRouter([
    {
        path: '/teacher',
        element: <App />,
        children: teacherRoutes
    },
    {
        path: '/admin',
        element: <App />,
        children: adminRoutes
    },
    {
        path: '/',
        element: <Login />,
    }

]);

export default router;