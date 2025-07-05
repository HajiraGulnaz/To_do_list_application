import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ViewTasks from "./pages/ViewTasks";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/view-tasks" element={<ViewTasks />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/update-task/:id" element={<UpdateTask />} />
    </Routes>
  );
}
