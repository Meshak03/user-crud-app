import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper
} from "@mui/material";
import UserForm from "./components/userForm";
import UserList from "./components/userList";
import {type  User } from "./types/userTypes";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "./service/userService";
import "./App.css";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      setError("Failed to fetch users, connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSubmit = async (data: User) => {
  try {
    setError("");

    // 🔎 Check if email already exists
    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.id !== editUser?.id 
    );

    if (emailExists) {
      setError("Email is already registered");
      return;
    }

    if (editUser?.id) {
      await updateUser(editUser.id, data);
      setEditUser(null);
    } else {
      await createUser(data);
    }

    fetchUsers();
  } catch {
    setError("Operation failed");
  }
};


  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            User Management
          </Typography>

          <UserForm
            onSubmit={handleSubmit}
            editUser={editUser}
          />

          {loading && <p>Loading...</p>}
          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          <UserList
            users={users}
            onEdit={(user) => setEditUser(user)}
            onDelete={handleDelete}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
