import axios from "axios";
import producerStore from "../stores/producer-store";
import { formatSingleServices } from "../utils/formatService";

type El = {
  model: string;
  price: string;
};

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchData = async (method: string, url: string) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error; // Перепроброс помилки для обробки на вищому рівні
  }
};

export const fetchSingleItems = async (tableName: string, brand = "") => {
  const { producer } = producerStore;

  try {
    const link =
      brand !== ""
        ? `https://api.creator.work-set.eu/getCalculatorModules?table_name=${tableName}&producer=${brand}`
        : `https://api.creator.work-set.eu/getCalculatorModules?table_name=${tableName}&producer=${producer}`;

    const result = await axios.get(link, { headers });

    if (!result) {
      return null;
    }

    return result.data.map((el: El) => ({
      title: el.model,
      price: +el.price,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchServicesByTableName = async (tableName: string) => {
  const { producer } = producerStore;
  try {
    const url = `${apiUrl}/getCalculatorModules?table_name=${tableName}&producer=${producer}`;
    const response = await fetchData(HttpMethod.GET, url);
    return response;
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const fetchServicesBySection = async (
  section: string
) => {
  try {
    const url = `${apiUrl}/usual_service/${section}`;
    const response = await fetchData(HttpMethod.GET, url);
    return response;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

export const getComponents = async () => {
  const url = `${apiUrl}/getAllModules`;
  const components = await fetchData(HttpMethod.GET, url);
  return formatSingleServices(components);
};