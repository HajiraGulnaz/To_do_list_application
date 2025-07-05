import { useEffect, useState } from "react";
import axios from "axios";
import { MdWork, MdHome, MdWarning, MdSchool, MdEvent } from "react-icons/md";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get("http://localhost:8080/tasks/all")
      .then((response) => {
        const todayTasks = response.data.filter((task) => task.dueDate === today);
        setTasks(todayTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));

    // Fetch a random motivational quote
    const quotes = [
      "Believe you can and you're halfway there.",
      "Your only limit is your mind.",
      "Push yourself, because no one else will do it for you.",
      "Every day is a new opportunity to be better.",
      "Success is the sum of small efforts, repeated day in and day out.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Icons for Task Categories
  const categoryIcons = {
    Work: <MdWork size={24} className="text-blue-500" />,
    Personal: <MdHome size={24} className="text-green-500" />,
    Urgent: <MdWarning size={24} className="text-red-500" />,
    Study: <MdSchool size={24} className="text-yellow-500" />,
    Event: <MdEvent size={24} className="text-purple-500" />,
  };

  // Separate tasks into completed and pending
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-white shadow-lg">📌 Tasks for Today</h2>
        <p className="text-lg italic text-gray-300 mt-2 mb-6">"{quote}"</p>

        {/* Pending Tasks Section */}
        <h3 className="text-2xl font-bold text-yellow-300 mb-3">⏳ Pending Tasks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {pendingTasks.length === 0 ? (
            <p className="text-white text-lg bg-white bg-opacity-30 p-4 rounded-lg shadow-lg">
              No pending tasks! 🎉
            </p>
          ) : (
            pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg flex items-start gap-3 transition-transform transform hover:scale-105 backdrop-blur-md border-l-4 border-yellow-500"
              >
                {/* Task Icon */}
                {categoryIcons[task.category] || <MdEvent size={24} className="text-gray-500" />}

                {/* Task Content */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                  <p className="text-sm text-gray-700">{task.description}</p>
                  <p className="text-xs text-gray-600 font-semibold">📅 Due: {task.dueDate}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Completed Tasks Section */}
        <h3 className="text-2xl font-bold text-green-400 mb-3">✅ Completed Tasks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {completedTasks.length === 0 ? (
            <p className="text-white text-lg bg-white bg-opacity-30 p-4 rounded-lg shadow-lg">
              No completed tasks yet! Keep going 🚀
            </p>
          ) : (
            completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-200 p-4 rounded-lg shadow-md flex items-start gap-3 opacity-70 border-l-4 border-green-500"
              >
                {/* Task Icon */}
                {categoryIcons[task.category] || <MdEvent size={24} className="text-gray-500" />}

                {/* Task Content */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-900 text-lg line-through">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-500 font-semibold">📅 Due: {task.dueDate}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
