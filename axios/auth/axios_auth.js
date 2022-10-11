import register from "../../pages/authentification/register";
import { postRequest, putRequest } from "../axios";

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

export const updateUser = async (user) => {
  try {
    const resultUpdateUser = await putRequest("/auth/update", user);
    return resultUpdateUser;
  } catch (error) {
    console.error(error);
  }
};
