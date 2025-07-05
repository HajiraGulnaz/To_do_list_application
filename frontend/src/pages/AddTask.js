import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/tasks/add", task)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/view-tasks");
        }, 1500);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80')",
          filter: "brightness(0.75)", // Darkens the background slightly
        }}
      ></div>

      {/* Success Message Popup - Moved to Center Top */}
      {success && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slideIn">
          ✅ Task Added Successfully!
        </div>
      )}


      {/* Task Form */}
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl w-96 animate-fadeIn backdrop-blur-md bg-opacity-90">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Category</option>
            <option value="Work">📂 Work</option>
            <option value="Personal">🏠 Personal</option>
            <option value="Urgent">⚠️ Urgent</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
