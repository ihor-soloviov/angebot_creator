import { SingleService } from "../components/Calculator/calculator-types";
import { SelectService } from "../components/Calculator/calculator-types";

type GetSavedSingleService = (setPriceСount: (value: number | ((prev: number) => number)) => void,
  service: SingleService) => void

type GetSavedSelectService = (label: string, setPriceСount: (value: number | ((prev: number) => number)) => void,
  service: SingleService) => void

type AddOrUpdateSingleService = (name: string, count: number, price: number) => void

export const getSavedSingleServiceCount: GetSavedSingleService = (setPriceСount, service) => {
  const servicesFromStorage = sessionStorage.getItem('singleServices');

  if (!servicesFromStorage || servicesFromStorage.trim() === "") {
    return;
  }

  try {
    const parsedServices = JSON.parse(servicesFromStorage);
    const currentItem = parsedServices.find(({ name }) => name === service.blackTitle);

    if (currentItem) {
      setPriceСount(currentItem.count);
    }
  } catch (error) {
    console.error("Error parsing JSON from sessionStorage:", error);
  }
};

export const addOrUpdateSingleService: AddOrUpdateSingleService = (name, count, price) => {
  const servicesFromStorage = sessionStorage.getItem('singleServices');
  let services = [];

  if (servicesFromStorage) {
    services = JSON.parse(servicesFromStorage);
  }

  const serviceIndex = services.findIndex(service => service.name === name);

  if (count > 0) {
    if (serviceIndex !== -1) {
      // Оновлення існуючого елементу
      services[serviceIndex] = { ...services[serviceIndex], count, price };
    } else {
      // Додавання нового елементу
      services.push({ name, count, price });
    }
  } else {
    // Видалення елементу, якщо count = 0
    if (serviceIndex !== -1) {
      services.splice(serviceIndex, 1);
    }
  }

  // Збереження оновленого масиву назад у sessionStorage
  sessionStorage.setItem('singleServices', JSON.stringify(services));
};

export const getSavedSelectServiceCount = (label: string, addNewSelectService) => {
  const servicesFromStorage = sessionStorage.getItem('selectServices');

  if (!servicesFromStorage || servicesFromStorage.trim() === "") {
    return;
  }

  try {
    const parsedServices = JSON.parse(servicesFromStorage);
    console.log(parsedServices, parsedServices.label, label)
    if (parsedServices[0].label === label) {
      parsedServices[0].items.forEach(el => addNewSelectService({
        label: "Леса",
        select: [
          { value: "<5m", price: 400 },
          { value: "5m - 8m", price: 500 },
          { value: ">8m", price: 600 }
        ]
      }))
    }
  } catch (error) {
    console.error("Error parsing JSON from sessionStorage:", error);
  }
}