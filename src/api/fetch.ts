import producerStore, { Producer } from "../stores/producer-store";
import { formatSingleServices } from "../utils/formatService";
import {
  CalculatorServices,
  IndividualService,
  Module,
} from "../components/Calculator/calculator-types";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";
type RequestData = Record<string, unknown> | null;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const apiUrl = import.meta.env.VITE_API_URL;
const calcRoute = "/calc";
const admRoute = "/adm";

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

const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: RequestData) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: RequestData) => request<T>(url, "PATCH", data),
  delete: (url: string) => request(url, "DELETE"),
};

export const fetchServices = async () => {
  const components = await client.get<Module[]>(calcRoute + "/getServices");
  return formatSingleServices(components);
};

export const fetchModulesByTable = async (tableName: string) => {
  const { producer } = producerStore;
  const brand = producer === Producer.enphase ? "Pulsar Plus" : producer;
  const queries = `?table_name=${tableName}&producer=${brand}`;
  return client.get<Module[]>(calcRoute + "/getModulesByTable" + queries);
};

export const fetchServicesByTable = async (section: string) => {
  const result = await client.get<CalculatorServices>(
    calcRoute + `/getServicesBySection/${section}`
  );
  console.log(result);
  return result;
};

export const updateServicePrice = async (
  item: IndividualService,
  newPrice: number
) => {
  const responseData: { id: number; newPrice: number; table_name?: string } = {
    id: item.id || 0,
    newPrice,
  };

  if (item.table_name) {
    responseData.table_name = item.table_name;
  }

  await client.patch<Module>(admRoute + "/changePrice", responseData);
};
