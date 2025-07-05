import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    completed: false,
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.error("Error fetching task:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/tasks/update/${id}`, task)
      .then(() => navigate("/view-tasks"))
      .catch(error => console.error("Error updating task:", error));
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661776946043-cd5b2190a616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHdvcmt8ZW58MHx8MHx8fDA%3D')" }}
    >
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-900 text-center">✏️ Update Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Title Input */}
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />

          {/* Description Input */}
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none resize-none"
          ></textarea>

          {/* Category Dropdown */}
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="Work">📌 Work</option>
            <option value="Personal">🏡 Personal</option>
            <option value="Urgent">⚠️ Urgent</option>
          </select>

          {/* Due Date Input */}
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />

          {/* Completed Checkbox */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center border-2 rounded transition-all ${
                task.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-400"
              }`}
            >
              {task.completed && "✔"}
            </div>
            <span className="text-gray-700 font-semibold">Mark as Completed</span>
          </label>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg shadow-md hover:opacity-80 transition-all"
          >
            ✅ Update Task
          </button>
        </form>
      </div>

      {/* Fade-in Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default UpdateTask;
