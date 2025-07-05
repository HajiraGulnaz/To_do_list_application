package com.smart.todolist.service;

import com.smart.todolist.model.Task;
import com.smart.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // ✅ Add a task with logging
    public Task addTask(Task task) {
        System.out.println("✅ Saving task: " + task);
        return taskRepository.save(task);
    }

    // ✅ Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // ✅ Get a task by ID
    public Optional<Task> getTaskById(String id) {
        if (id == null || id.isEmpty()) return Optional.empty();
        return taskRepository.findById(id);
    }

    // ✅ Update a task safely
    public Optional<Task> updateTask(String id, Task updatedTask) {
        if (!taskRepository.existsById(id)) return Optional.empty();

        return taskRepository.findById(id).map(existingTask -> {
            if (updatedTask.getTitle() != null) existingTask.setTitle(updatedTask.getTitle());
            if (updatedTask.getDescription() != null) existingTask.setDescription(updatedTask.getDescription());
            if (updatedTask.getCategory() != null) existingTask.setCategory(updatedTask.getCategory());
            if (updatedTask.getDueDate() != null) existingTask.setDueDate(updatedTask.getDueDate());
            existingTask.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(existingTask);
        });
    }

    // ✅ Delete a task safely
    public boolean deleteTaskById(String id) {
        if (id == null || !taskRepository.existsById(id)) return false;
        taskRepository.deleteById(id);
        return true;
    }

    // ✅ Get tasks by user ID
    public List<Task> getTasksByUserId(String userId) {
        return taskRepository.findByUserId(userId);
    }
}
