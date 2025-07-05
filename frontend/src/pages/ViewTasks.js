import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdWork, MdHome, MdWarning } from "react-icons/md";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/tasks/all")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const categoryIcons = {
    Work: <MdWork className="text-blue-500" size={20} />,
    Personal: <MdHome className="text-green-500" size={20} />,
    Urgent: <MdWarning className="text-red-500" size={20} />,
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:8080/tasks/delete/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error("Error deleting task:", error));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);
    setTasks(newTasks);

    axios.put("http://localhost:8080/tasks/reorder", newTasks)
      .catch(error => console.error("Error updating task order:", error));
  };

  return (
    <div className="min-h-screen p-8 bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=1920&auto=format&fit=crop&q=80')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-5xl mt-10">
        <h2 className="text-3xl font-bold text-center text-white mb-6">📌 Your Tasks</h2>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.length === 0 ? (
                  <p className="text-center text-white bg-white bg-opacity-30 p-4 rounded-lg shadow-lg">
                    No tasks available. Start by adding a new one! 🚀
                  </p>
                ) : (
                  tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white bg-opacity-90 p-5 rounded-lg shadow-lg w-full transition-transform transform hover:scale-105 backdrop-blur-md"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              {categoryIcons[task.category]}
                              <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                            </div>
                            <p className="text-sm text-gray-700">{task.description}</p>
                            <p className="text-xs text-gray-600 font-semibold">📅 Due: {task.dueDate}</p>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${task.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                              {task.completed ? "✅ Completed" : "⏳ Pending"}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              onClick={() => navigate(`/update-task/${task.id}`)}
                            >
                              <FaEdit size={18} /> Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 flex items-center gap-1"
                              onClick={() => deleteTask(task.id)}
                            >
                              <FaTrash size={18} /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ViewTasks;