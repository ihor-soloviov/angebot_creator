import { SingleService } from "../components/Calculator/calculator-types";
import { SelectService } from "../components/Calculator/calculator-types";
import stepStore from "../stores/step-store";

type GetSavedService = (
  serviceStorageName: string,
  setPriceСount: (value: number | ((prev: number) => number)) => void,
  service: SingleService
) => void;

type AddOrUpdateSingleService = (
  pageName: string,
  serviceArrayName: string,
  blackTitle: string,
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

export const addOrUpdateSingleService: AddOrUpdateSingleService = (
  pageName,
  serviceArrayName,
  blackTitle,
  count,
  price
) => {
  const pageData = sessionStorage.getItem(pageName);
  let pageObj = pageData ? JSON.parse(pageData) : {};

  let services = pageObj[serviceArrayName] || [];

  const serviceIndex = services.findIndex(
    (service) => service.blackTitle === blackTitle
  );

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

export const getSavedSelectServicesWithCount = (setSelectServices) => {
  const selectsByStep = JSON.parse(
    sessionStorage.getItem(stepStore.step) || "{}"
  );
  const typedSelects = selectsByStep["selectServices"]?.map(
    ({ blackTitle, price, count }) => ({ blackTitle, price, count })
  );

  if (typedSelects) {
    setSelectServices(typedSelects);
  }
};
