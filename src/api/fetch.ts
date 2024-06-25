import producerStore, { Producer } from "../stores/producer-store";
import { formatSingleServices } from "../utils/formatService";
import {
  CalculatorData,
  CalculatorServices,
  IndividualService,
  Module,
} from "../types/calculator-types";
import calculatorStore from "../stores/calculator-store";
import stepStore, { AppSteps } from "../stores/step-store";

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
  data: RequestData | null = null,
  formData: FormData | null = null
): Promise<T> => {
  const options: RequestInit = { method };

  if (formData) {
    options.body = formData;
    options.credentials = "include";
  } else if (data) {
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
  postForm: <T>(url: string, formData: FormData) =>
    request<T>(url, "POST", null, formData),
  patch: <T>(url: string, data: RequestData) => request<T>(url, "PATCH", data),
  delete: (url: string) => request(url, "DELETE"),
};

export const fetchServices = async () => {
  const components = await client.get<IndividualService[]>("/getServices");
  return formatSingleServices(components);
};

export const fetchComponentsBySection = async (section: string) => {
  const { producer } = producerStore;
  const { appStep } = stepStore;
  let brand: string = producer;
  if (appStep === AppSteps.wallbox) {
    brand = producer === Producer.enphase ? "Pulsar Plus" : producer;
  } 
  const queries = `?section=${section}&producer=${brand}`;
  return client.get<IndividualService[]>("/getComponentsBySection" + queries);
};

export const fetchServicesBySection = async (section: string) => {
  const result = await client.get<CalculatorServices>(
    `/getServicesBySection/${section}`
  );
  return result;
};

export const updateServicePrice = async (id: string, newPrice: number) => {
  const requestData = {
    id,
    newPrice,
  };

  await client.patch<Module>("/changePrice", requestData);
};

export const uploadMainImage = async (
  mainImage: File,
  angebot_id: string,
  dir: string
): Promise<void> => {
  const formData = new FormData();
  formData.append("mainImage", mainImage);

  await client.postForm(`/${dir}/${angebot_id}/${dir}`, formData);
};

export const sendDataToGenerator = async () => {
  const { calculatorData, angebotType, pvsolFileData } = calculatorStore;
  const { id } = stepStore;

  const responseData = {
    ...calculatorData,
    angebotType: angebotType,
    angebotId: id.toString(),
    pvsolFileData: pvsolFileData,
  };

  type Response = {
    message: string;
    data: CalculatorData;
  };

  await client.post<Response>(
    "/saveAngebotData",
    responseData
  );

};

export const getNextProjectVersion = async (
  angebotId: string
): Promise<string> => {
  const response = await client.get<string>(
    `/getProjectVersion?angebotId=${angebotId}`
  );
  return response;
};
