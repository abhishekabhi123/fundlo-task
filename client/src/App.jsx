import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Secret from "./pages/home/Secret";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import { Products } from "./pages/products/Products";
import Tables from "./Tables";
import SideNavBar from "./components/sideNavBar/SideNavBar";
import { useCookies } from "react-cookie";
import Profile from "./components/profile/Profile";

function App() {
  const Layout = () => {
    return (
      <div style={{ display: "flex" }}>
        <SideNavBar style={{ flex: "3" }} />
        <div style={{ flex: "8" }}>
          <Outlet />
        </div>
      </div>
    );
  };
  const [cookies, setCookies, deleteCookies] = useCookies([]);

  const ProtectedRoute = ({ children }) => {
    console.log(cookies.jwt);
    if (!cookies.jwt) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <AdminDashboard />,
        },

        {
          path: "/users",
          element: <Tables />,
        },
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Secret />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
