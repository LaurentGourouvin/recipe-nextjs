import { useState, useEffect } from "react";
import { getRequest, postRequest, deleteRequest } from "../axios";
import axios from "axios";

export const useGetAllRecipe = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    getRequest("/recipe", { cancelToken: source.token })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));

    return () => {
      source.cancel();
    };
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

export const getRecipeByName = async (recipeName) => {
  try {
    const searchRecipe = await getRequest(`/recipe/${recipeName}`);

    console.log(recipeName);
    console.log("je suis dans getRecipeByName");
    console.log(searchRecipe);
    return searchRecipe;
  } catch (error) {
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};
export const createRecipe = async (recipe) => {
  try {
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

export const deleteRecipe = async (payload) => {
  try {
    const deleteOneRecipe = await deleteRequest(`/recipe/delete`, payload);
    return deleteOneRecipe;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};
