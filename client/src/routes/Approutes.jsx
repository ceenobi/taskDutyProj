import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "../pages/Home";
import { LazySpinner } from "../components/Spinner";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAuth } from "../store";
import NewTask from "../pages/NewTask";
import AllTasks from "../pages/AllTasks";
import EditTask from "../pages/EditTask";
import MyTask from "../pages/MyTask";

const RootLayout = lazy(() => import("../layouts/RootLayout"));

export default function Approutes() {
  const { token, checking } = useAuth();
  if (checking) {
    return <LazySpinner />;
  }
  const routes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: token ? <Navigate to="/" replace /> : <Login />,
        },
        {
          path: "register",
          element: token ? <Navigate to="/" replace /> : <Register />,
        },
        {
          path: "new-task",
          element: token ? <NewTask /> : <Navigate to="/" replace />,
        },
        {
          path: "my-task",
          element: token ? <MyTask /> : <Navigate to="/" replace />,
        },
        {
          path: "all-task",
          element: token ? <AllTasks /> : <Navigate to="/" replace />,
        },
        {
          path: "note/:noteId",
          element: token ? <EditTask /> : <Navigate to="/" replace />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
