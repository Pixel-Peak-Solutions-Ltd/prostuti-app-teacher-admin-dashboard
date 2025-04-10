import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { adminRoutes } from './admin.routes';
import { teacherRoutes } from './teacher.routes';
import Login from '../shared/components/Login';
import ProtectedRoute from '../shared/components/layout/ProtectedRoute';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/teacher',
        element: (
            <ProtectedRoute allowedRoles={['teacher']}>
                <App />
            </ProtectedRoute>
        ),
        children: teacherRoutes
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <App />
            </ProtectedRoute>
        ),
        children: adminRoutes
    },

]);

export default router;