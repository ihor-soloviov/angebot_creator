import { SingleService } from "../components/Calculator/calculator-types";
import { SelectService } from "../components/Calculator/calculator-types";

type GetSavedService = (
  serviceStorageName: string,
  setPriceСount: (value: number | ((prev: number) => number)) => void,
  service: SingleService
) => void;

type AddOrUpdateService = (
  serviceStorageName: string,
  name: string,
  count: number,
  price: number
) => void;

export const getSavedServiceCount = (
  pageName,
  serviceArrayName,
  setPriceCount,
  service
) => {
  const pageData = sessionStorage.getItem(pageName);

  if (!pageData) {
    return;
  }

  try {
    const parsedPage = JSON.parse(pageData);
    const services = parsedPage[serviceArrayName];
    if (!services) {
      return;
    }

    const currentItem = services.find(
      ({ blackTitle }) => blackTitle === service.blackTitle
    );

    if (currentItem) {
      setPriceCount(currentItem.count);
    }
  } catch (error) {
    console.error("Error parsing JSON from sessionStorage:", error);
  }
};

export const addOrUpdateSingleService = (
  pageName,
  serviceArrayName,
  blackTitle,
  count,
  price
) => {
  const pageData = sessionStorage.getItem(pageName);
  let pageObj = pageData ? JSON.parse(pageData) : {};

  let services = pageObj[serviceArrayName] || [];

  const serviceIndex = services.findIndex((service) => service.blackTitle === blackTitle);

  if (count > 0) {
    if (serviceIndex !== -1) {
      services[serviceIndex] = { ...services[serviceIndex], count, price };
    } else {
      services.push({ blackTitle, count, price });
    }
  } else if (serviceIndex !== -1) {
    services.splice(serviceIndex, 1);
  }

  pageObj[serviceArrayName] = services;
  sessionStorage.setItem(pageName, JSON.stringify(pageObj));
};