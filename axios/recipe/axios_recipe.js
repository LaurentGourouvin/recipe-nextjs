import { useState, useEffect } from "react";
import { getRequest, postRequest } from "../axios";

export const useGetAllRecipe = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getRequest("/recipe")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, []);

  return { data, error, loading };
};

export const useGetRecipeByUserId = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getRequest(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, [url]);

  return { data, error, loading };
};

export const useGetRecipeById = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getRequest(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, [url]);

  return { data, error, loading };
};

export const createRecipe = async (recipe) => {
  try {
    console.log("AXIOS CREATE RECIPTE", recipe);
    const newRecipe = await postRequest("/recipe/create", recipe);
    return newRecipe;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};
