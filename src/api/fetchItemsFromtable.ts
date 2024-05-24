import axios from "axios";
import producerStore from "../stores/producer-store";

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

// export const fetchSelectItems = async (tableName: string) => {
//   const { producer } = producerStore;
//   try {
//     const params = `producer=${brand || producer}`;
//     const url = `${apiUrl}/getCalculatorModules?table_name=${tableName}&${query}`;
//     const result = await axios.get(
//       `https://api.creator.work-set.eu/getCalculatorModules?table_name=${tableName}&producer=${producer}`,
//       { headers }
//     );

//     console.log(result);

//     // const services = result.data.map((el: El) => ({
//     //   value: el.model,
//     //   price: +el.price,
//     // }));

//     // console.log(services);

//     // setSelectService({ options: services });
//   } catch (error) {
//     console.log(error);
//   }
// };

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

export const fetchServicesBySection = async (section: string) => {
  try {
    const url = `${apiUrl}/usual_service/${section}`;
    const response = await fetchData(HttpMethod.GET, url);
    return response;
  } catch (error) {
    console.error("There was an error!", error);
  }
};
