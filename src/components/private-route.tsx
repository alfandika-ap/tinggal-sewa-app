import { useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/auth-store';

const PrivateRoute = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute; 