# user-crud-app
user cred application

# React CRUD User Management App

This is a simple React + TypeScript CRUD application to manage user data.  
It allows creating, viewing, updating, and deleting users using a mock API.

---

## 🚀 Tech Stack

- React (Vite)
- TypeScript
- Material UI
- Axios
- React Hook Form
- JSON Server (Mock API)

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

npm install

### 2. Run Frontend

npm run dev

Frontend runs at:
http://localhost:5173

### 3. Run Mock API

Make sure db.json exists in the root folder.

npm run server

API runs at:
http://localhost:3001/users

---

## ✅ Features

- Create User
- View All Users
- Update User
- Delete User
- Required field validation
- Email format validation
- Loading and error handling

---

## 🧠 Extensibility

The form fields are defined in:

src/config/userFields.ts

To add a new field:

1. Add a new object in userFields.ts
2. Update the User interface in src/types/user.ts

No UI logic changes are required.  
The form is generated dynamically from the configuration.

---

## 📌 Assumptions

- JSON Server is used as a mock backend.
- IDs are auto-generated.
- Application is built with modular folder structure for maintainability.

---

## 👨‍💻 Author

Meshak Raj
