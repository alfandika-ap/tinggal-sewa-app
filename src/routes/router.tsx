import PrivateRoute from "@/components/private-route";
import UnprivateRoute from "@/components/unprivate-route";
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";
import FavoritesPage from "./favorites";
import LoginPage from "./login";
import NotFound from "./not-found";
import ProfileSettingPage from "./profile-setting";
import RegisterPage from "./register";

const router = createBrowserRouter([
  {
    element: <UnprivateRoute />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ]
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          }
        ]
      },
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/profile-setting",
            element: <ProfileSettingPage />,
          },
          {
            path: "favorites",
            element: <FavoritesPage />
          }
        ]
      }
    ]
  }
]);

export default router; 