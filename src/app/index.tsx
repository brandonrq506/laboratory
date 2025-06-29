import {
  AsyncFormState,
  ControllerOne,
  ControllerTwo,
  DynamicPassword,
  FormState,
  FormsPage,
  GetFieldState,
  LastName,
  ProviderForm,
  ResetPartial,
  ResetSubmit,
  SetError,
  Trigger,
  Unregister,
} from "@/pages/forms";

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
import { AsyncValidation } from "@/experiments/forms";
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
      { path: "form-projects", element: <FormsPage /> },
      { path: "form-projects/shouldunregister-1", element: <LastName /> },
      { path: "form-projects/deps-1", element: <DynamicPassword /> },
      { path: "form-projects/unregister", element: <Unregister /> },
      { path: "form-projects/formstate", element: <FormState /> },
      { path: "form-projects/formstate-async", element: <AsyncFormState /> },
      { path: "form-projects/reset-partial", element: <ResetPartial /> },
      { path: "form-projects/reset-submit", element: <ResetSubmit /> },
      { path: "form-projects/set-error", element: <SetError /> },
      { path: "form-projects/get-field-state", element: <GetFieldState /> },
      { path: "form-projects/trigger", element: <Trigger /> },
      { path: "form-projects/controller-one", element: <ControllerOne /> },
      { path: "form-projects/controller-two", element: <ControllerTwo /> },
      { path: "form-projects/context-provider", element: <ProviderForm /> },
      { path: "form-projects/async-validation", element: <AsyncValidation /> },
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
