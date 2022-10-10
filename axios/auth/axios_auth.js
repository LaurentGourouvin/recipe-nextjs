import register from "../../pages/authentification/register";
import { postRequest } from "../axios";

export const loginUser = async (user) => {
  try {
    const login = await postRequest("/auth/login", user);
    return login;
  } catch (error) {
    console.error(error);
    return { codeStatus: error.response.status, message: error.response.data };
  }
};

export const registerUser = async (user) => {
  try {
    const register = await postRequest("/auth/register", user);
    return register;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await postRequest("/auth/getcurrentuser");
    return currentUser.data;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  try {
    const resultLogout = await postRequest("/auth/logout");
    return resultLogout;
  } catch (error) {
    console.error(error);
  }
};
