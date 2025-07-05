import axios from "axios";

const API_URL = "http://localhost:8080"; // Base URL

// Axios Instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 📝 Fetch All Tasks
export const getTasks = () =>
  axiosInstance.get("/tasks/all")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching tasks:", error);
      throw error;
    });

// ➕ Add New Task
export const addTask = (task) =>
  axiosInstance.post("/tasks/add", task)
    .then(response => response.data)
    .catch(error => {
      console.error("Error adding task:", error);
      throw error;
    });

// ✏️ Update Task
export const updateTask = (id, updatedTask) =>
  axiosInstance.put(`/tasks/update/${id}`, updatedTask)
    .then(response => response.data)
    .catch(error => {
      console.error("Error updating task:", error);
      throw error;
    });

// 🗑️ Delete Task
export const deleteTask = (id) =>
  axiosInstance.delete(`/tasks/delete/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error deleting task:", error);
      throw error;
    });
