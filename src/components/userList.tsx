import { type User } from "../types/userTypes";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList = ({ users, onEdit, onDelete }: Props) => {
  return (
    <>
      {users.map((user) => (
        <Card key={user.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone}</Typography>

            <Button
              onClick={() => onEdit(user)}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(user.id!)}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default UserList;
