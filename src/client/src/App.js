import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import TrainerPage from "./pages/TrainerPage/TrainerPage";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import ContentPage from "./pages/ContentPage/ContentPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import PlansPage from "./pages/PlansPage/PlansPage";
import TrainerViewPage from "./pages/TrainerPage/View/ViewPage";
import NewPlanPage from "./pages/TrainerPage/View/NewPlanPage/NewPlanPage";
import ProgressPage from "./pages/ProgressPage/ProgressPage";
import TrainerLoginPage from "./pages/TrainerLoginPage/TrainerLoginPage";
import TrainerRegisterPage from "./pages/TrainerLoginPage/TrainerRegisterPage";
import EditPlanPage from "./pages/TrainerPage/View/EditPlanPage/EditPlanPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "content", element: <ContentPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "plans", element: <PlansPage /> },
      { path: "progress", element: <ProgressPage />},
      { path: "progress", element: <ProgressPage />}
    ],
    errorElement: <ErrorPage />,
  },
  { path: "login", element: <LoginPage />, errorElement: <ErrorPage /> },
  { path: "register", element: <RegisterPage />, errorElement: <ErrorPage /> },
  {
    path: "trainer-dashboard",
    element: <TrainerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "trainer-login",
    element: <TrainerLoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "trainer-register",
    element: <TrainerRegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "trainer-dashboard/view/:clientId",
    element: <TrainerViewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "trainer-dashboard/view/:clientId/new-plan/",
    element: <NewPlanPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "trainer-dashboard/view/:clientId/edit-plan/:epid",
    element: <EditPlanPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
