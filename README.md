## What You Can Do
- ✅ Create, update, delete, and view your to-do tasks  
- ✅ View tasks for a specific user  
- ✅ Clean and reliable REST API  
- ✅ Data is saved using MongoDB  
- ✅ Works perfectly with the React frontend (CORS enabled)
## API Routes (Backend)
| Method | Endpoint                | What it does                     |
|--------|--------------------------|----------------------------------|
| POST   | `/tasks/add`             | Add a new task                   |
| GET    | `/tasks/all`             | Get all tasks                    |
| GET    | `/tasks/{id}`            | Get one task by its ID           |
| PUT    | `/tasks/update/{id}`     | Update an existing task          |
| DELETE | `/tasks/delete/{id}`     | Delete a task by its ID          |
| GET    | `/tasks/user/{userId}`   | Get all tasks for a user         |
## How to Run the Project
### What You Need Before You Start
- **Node.js** and **npm** for the React frontend
- **Java 17** or above for the Spring Boot backend
- **Maven** for building the backend
- **MongoDB** running locally or use MongoDB Atlas (cloud)
### To Start the Frontend (React)
cd frontend
npm install       # Only the first time
npm start         # Runs the React app on http://localhost:3000
### Start the Backend (Spring Boot)
cd backend
mvnw.cmd spring-boot:run
