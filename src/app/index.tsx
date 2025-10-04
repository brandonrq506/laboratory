import {
  AccountSettingsPage,
  CategorySettingsPage,
  NotificationSettingsPage,
  SettingsPage,
} from "@/pages/settings";
import {
  ActivitiesPage,
  EditActivityPage,
  NewActivityPage,
} from "@/pages/Activities";
import {
  DeleteCategoryPage,
  EditCategoryPage,
  NewCategoryPage,
} from "@/pages/categories";
import {
  DeleteRoutinePage,
  EditRoutinePage,
  NewRoutinePage,
  RoutinesPage,
} from "@/pages/routines";
import {
  EditTaskPage,
  HistoryPage,
  NewTaskPage,
  NewTodayCompletedTaskPage,
} from "@/pages/Tasks";
import { MainErrorPage, MainLayout } from "@/components/layout";
import { Navigate, createBrowserRouter } from "react-router";
import { AppProvider } from "./provider";
import { ExcelPage } from "@/pages/Excel";
import { LoginPage } from "@/pages/auth";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Projects } from "@/pages/Projects";
import { RouterProvider } from "react-router/dom";
import { TestingModal } from "@/pages/TestingModal";
import { TimerPage } from "@/pages/timer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <MainErrorPage />,
    children: [
      { index: true, element: <Navigate to="/timer" /> },
      {
        path: "activities",
        element: <ActivitiesPage />,
        children: [
          { path: "new", element: <NewActivityPage /> },
          { path: "edit/:activityId", element: <EditActivityPage /> },
        ],
      },
      { path: "excel", element: <ExcelPage /> },
      {
        path: "history",
        element: <HistoryPage />,
        children: [
          { path: "edit/:taskId", element: <EditTaskPage /> },
          { path: "new", element: <NewTaskPage /> },
        ],
      },
      {
        path: "routines",
        element: <RoutinesPage />,
        children: [
          { path: "new", element: <NewRoutinePage /> },
          { path: "edit/:routineId", element: <EditRoutinePage /> },
          { path: "delete/:routineId", element: <DeleteRoutinePage /> },
        ],
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          { index: true, element: <Navigate to="account" /> },
          { path: "account", element: <AccountSettingsPage /> },
          {
            path: "categories",
            element: <CategorySettingsPage />,
            children: [
              { path: "new", element: <NewCategoryPage /> },
              { path: "edit/:categoryId", element: <EditCategoryPage /> },
              { path: "delete/:categoryId", element: <DeleteCategoryPage /> },
            ],
          },
          { path: "notifications", element: <NotificationSettingsPage /> },
        ],
      },
      {
        path: "timer",
        element: <TimerPage />,
        children: [
          { path: "edit/:taskId", element: <EditTaskPage /> },
          { path: "new", element: <NewTodayCompletedTaskPage /> },
        ],
      },
      { path: "projects", element: <Projects /> },
      { path: "modal-testing", element: <TestingModal /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};
