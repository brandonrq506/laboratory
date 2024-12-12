import {
  AsyncFormState,
  ControllerOne,
  ControllerTwo,
  DynamicPassword,
  FormState,
  FormsPage,
  GetFieldState,
  LastName,
  NewLocation,
  NewNoteForm,
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
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AppProvider } from "./provider";
import { AsyncValidation } from "@/experiments/forms";
import { MainLayout } from "@/components/layout";
import { Projects } from "@/pages/Projects";
import { TasksPage } from "@/pages/Tasks";
import { TestingModal } from "@/pages/TestingModal";
import { TimerPage } from "@/pages/timer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      { path: "tasks", element: <TasksPage /> },
      { path: "timer", element: <TimerPage /> },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          { index: true, element: <Navigate to="account" /> },
          { path: "account", element: <AccountSettingsPage /> },
          { path: "categories", element: <CategorySettingsPage /> },
          { path: "notifications", element: <NotificationSettingsPage /> },
        ],
      },
      { path: "projects", element: <Projects /> },
      { path: "modal-testing", element: <TestingModal /> },
      { path: "form-projects", element: <FormsPage /> },
      { path: "form-projects/new-location", element: <NewLocation /> },
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
      { path: "form-projects/new-note", element: <NewNoteForm /> },
      { path: "form-projects/async-validation", element: <AsyncValidation /> },
    ],
  },
]);

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};
