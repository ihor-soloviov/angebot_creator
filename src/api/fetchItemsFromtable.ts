import axios from "axios";
import producerStore from "../stores/producer-store";
import { DropdownServices } from "../components/Calculator/calculator-types";

type El = {
  modell: string;
  preis: string;
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

const fetchData = async (method: string, url: string) => {
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
        ? `https://api.creator.work-set.eu/getTable?table_name=${tableName}&hersteller=${brand}`
        : `https://api.creator.work-set.eu/getTable?table_name=${tableName}&hersteller=${producer}`;

    const result = await axios.get(link, { headers });

    if (!result) {
      return null;
    }

    return result.data.map((el: El) => ({
      title: el.modell,
      price: +el.preis,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectItems = async (
  tableName: string,
  setSelectService: (value: DropdownServices) => void
) => {
  const { producer } = producerStore;
  try {
    const result = await axios.get(
      `https://api.creator.work-set.eu/getTable?table_name=${tableName}&hersteller=${producer}`,
      { headers }
    );

    const services = result.data.map((el: El) => ({
      value: el.modell,
      price: +el.preis,
    }));

    console.log(services);

    setSelectService({ options: services });
  } catch (error) {
    console.log(error);
  }
};

export const fetchServicesByTableName = async (
  tableName: string,
  brand?: string
) => {
  const { producer } = producerStore;
  try {
    const query = `hersteller=${brand || producer}`;
    const url = `${apiUrl}/getTable?table_name=${tableName}&${query}`;

    const response = await fetchData(HttpMethod.GET, url);
    console.log(response);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const fetchServicesBySection = async (section: string) => {
  try {
    const url = `${apiUrl}/usual_service/${section}`;
    const response = await fetchData(HttpMethod.GET, url);
    console.log(response);
    return response;
  } catch (error) {
    console.error("There was an error!", error);
  }
};
