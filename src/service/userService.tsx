import axios from "axios";
import type { User } from "../types/userTypes";

const API_URL = "http://localhost:3001/users";

export const getUsers = async () => {
  return await axios.get<User[]>(API_URL);
};

export const createUser = async (user: User) => {
  return await axios.post<User>(API_URL, user);
};

export const updateUser = async (id: number, user: User) => {
  return await axios.put<User>(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};
