import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { adminRoutes } from './admin.routes';
import { teacherRoutes } from './teacher.routes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: teacherRoutes
    },
    {
        path: '/admin',
        element: <App />,
        children: adminRoutes
    }

]);

export default router;