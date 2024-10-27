import { ReactNode } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { TUser } from '../../../types/types';
import { RootState } from '../../../redux/store';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: string[]; // Allowed roles for the route
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { token } = useAppSelector((state) => state.auth);
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);
    console.log(user);
    if (!token) {
        return <Navigate to='/' replace={true} />;
    }

    //^ checking whether the role is correct
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to='/' replace={true} />;
    }

    return (<>{children}</>);
};

export default ProtectedRoute;