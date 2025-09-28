import Register from "./auth/Register.jsx";
import Layout from "./layout/Layout.jsx";
import Login from "./auth/Login.jsx";
import "./index.css";
import ActivitiesPage from "./activities/ActivitiesPage.jsx";
import ActivityInfo from "./activities/ActivityInfo.jsx";
import Error404 from "./Error404.jsx";
import { Routes, Route } from "react-router";
import Routines from "./routines/Routines.jsx";
import RoutinePage from "./routines/RoutinePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityInfo />} />

        <Route path="/routines" element={<RoutinePage />} />
        <Route path="/routines/:id" element={<Routines />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
