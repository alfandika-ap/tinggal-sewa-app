import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/auth-store';

const UnprivateRoute = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticated) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default UnprivateRoute; 