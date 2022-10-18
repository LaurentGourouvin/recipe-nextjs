import { useState, useEffect } from "react";
import { getRequest, postRequest, deleteRequest } from "../axios";

export const useGetAllIngredients = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getRequest("/ingredient")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, []);

  return { data, error, loading };
};

export const useGetIngredientsByRecipe = (recipeId) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getRequest(`/ingredient/${recipeId}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, [recipeId]);

  return { data, error, loading };
};

export const getIngredientByRecipeId = async (id) => {
  try {
    const searchIngredient = await getRequest(`/ingredient/${id}`);
    return searchIngredient;
  } catch (error) {
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const getAllIngredients = async () => {
  try {
    const searchIngredients = await getRequest(`/ingredient`);
    return searchIngredients;
  } catch (error) {
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};
