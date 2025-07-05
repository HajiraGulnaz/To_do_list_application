import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md">
      <h1 className="text-xl font-bold">Smart To-Do List</h1>
      <div className="space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition duration-300 ${isActive ? "text-yellow-400 font-semibold" : "hover:text-gray-400"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/view-tasks"
          className={({ isActive }) =>
            `transition duration-300 ${isActive ? "text-yellow-400 font-semibold" : "hover:text-gray-400"}`
          }
        >
          View Tasks
        </NavLink>
        <NavLink
          to="/add-task"
          className={({ isActive }) =>
            `transition duration-300 ${isActive ? "text-yellow-400 font-semibold" : "hover:text-gray-400"}`
          }
        >
          Add Task
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
