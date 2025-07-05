import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import ViewTasks from "./pages/ViewTasks";
import UpdateTask from "./pages/UpdateTask";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/view-tasks" element={<ViewTasks />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
