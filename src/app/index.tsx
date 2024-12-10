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
import { EditTaskPage, TasksPage } from "@/pages/Tasks";
import {
  FirstTableAttempt,
  GlobalSearchTable,
  SortableTable,
  TanstackTableExperimentsPage,
} from "@/pages/TanstackTable";
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
      { path: "history", element: <TasksPage /> },
      {
        path: "timer",
        element: <TimerPage />,
        children: [{ path: "edit/:taskId", element: <EditTaskPage /> }],
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
      { path: "excel", element: <ExcelPage /> },
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
      { path: "table-projects", element: <TanstackTableExperimentsPage /> },
      { path: "table-projects/first-attempt", element: <FirstTableAttempt /> },
      { path: "table-projects/global-search", element: <GlobalSearchTable /> },
      { path: "table-projects/sorting", element: <SortableTable /> },
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
