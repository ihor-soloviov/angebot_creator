import producerStore, { Producer } from "../stores/producer-store";
import { formatSingleServices } from "../utils/formatService";
import {
  CalculatorServices,
  Module,
} from "../components/Calculator/calculator-types";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestData = Record<string, unknown> | null;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const apiUrl = import.meta.env.VITE_API_URL;

const request = async <T>(
  url: string,
  method: RequestMethod = "GET",
  data: RequestData = null
): Promise<T> => {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = headers;
    options.credentials = "include";
  }

  const response = await fetch(apiUrl + url, options);

  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error ${response.status}: ${jsonResponse.message || response.statusText}`
    );
  }

  return jsonResponse;
};

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: RequestData) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: RequestData) => request<T>(url, "PATCH", data),
  delete: (url: string) => request(url, "DELETE"),
};

export const fetchServicesByTableName = async (tableName: string) => {
  const { producer } = producerStore;
  const brand = producer === Producer.enphase ? "Pulsar Plus" : producer;
  return client.get<Module[]>(
    `/getCalculatorModules?table_name=${tableName}&producer=${brand}`
  );
};

export const fetchServicesBySection = async (section: string) =>
  client.get<CalculatorServices>(`/usual_service/${section}`);

export const getComponents = async () => {
  const components = await client.get<Module[]>("/getAllModules");
  return formatSingleServices(components);
};
