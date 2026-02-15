import { useForm } from "react-hook-form";
import {  type User } from "../types/userTypes";
import { userFields } from "../config/userFeilds";
import { TextField, Button, Box } from "@mui/material";
import { useEffect } from "react";

interface Props {
  onSubmit: (data: User) => void;
  editUser?: User | null;
}

const UserForm = ({ onSubmit, editUser }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<User>();

  // ✅ IMPORTANT FIX
  useEffect(() => {
    if (editUser) {
      reset(editUser);   // set form values when editing
    } else {
      reset({});         // clear form when not editing
    }
  }, [editUser, reset]);

  const submitHandler = (data: User) => {
    onSubmit(data);
    reset(); // clear after submit
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      {userFields.map((field) => (
        <TextField
          key={field.name}
          placeholder={field.label}
          type={field.type}
          fullWidth
          margin="normal"
          {...register(field.name as keyof User, {
            required: field.required
              ? `${field.label} is required`
              : false,
            pattern:
              field.name === "email"
                ? {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format"
                  }
                : field.name === "phone"
                ? {
                    value: /^[0-9]{10}$/,
                    message: "Phone must be 10 digits"
                  }
                : undefined
          })}
          error={!!errors[field.name as keyof User]}
          helperText={
            errors[field.name as keyof User]?.message as string
          }
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        {editUser ? "Update User" : "Add User"}
      </Button>
    </Box>
  );
};

export default UserForm;

