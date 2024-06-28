import { AppSteps } from "../stores/step-store";
import {
  CalculatedSteps,
  ItemsByStep,
  CalculatorItem,
} from "../types/calculator-types";

const getItemPrice = (item: CalculatorItem, profit: number) => {
  const profitChangePriceArray = [
    "DC-Montage je Modul",
    "Montage & Verkabelung je Wechselrichter",
    "Montage & Verkabelung je Stromspeicher",
    "Anschluss der PV-Anlage an der Hausverteilung",
    "Netzanmeldung",
  ];
  return profitChangePriceArray.includes(item.title)
    ? item.price * profit
    : item.price;
};

const countNoChangesArray = [
  "Montage & Verkabelung je Wechselrichter",
  "Montage & Verkabelung je Stromspeicher",
];

export const roundUp = (num: number) => {
  const precision = Math.pow(10, 2);
  return Math.ceil(num * precision) / precision;
};

const dcTable = [
  AppSteps.dcMontage,
  AppSteps.underConstructions,
  AppSteps.pvModule,
];

export const getDcWorkPriceArray = (itemsBySteps: ItemsByStep): CalculatorItem[] => {
  return dcTable.reduce((acc, step) => {
    const stepItems = itemsBySteps[step];
    if (stepItems) {
      acc.push(...stepItems);
    }
    return acc;
  }, [] as CalculatorItem[]);
};

const acTable = [
  AppSteps.acMontage,
  AppSteps.inbetriebnahme,
  AppSteps.invertor,
  AppSteps.optimizer,
  AppSteps.battery,
  AppSteps.iqCombiner,
];

export const getAcWorkPriceArray = (itemsBySteps: ItemsByStep): CalculatorItem[] => {
  return acTable.reduce((acc, step) => {
    const stepItems = itemsBySteps[step];
    if (stepItems) {
      acc.push(...stepItems);
    }
    return acc;
  }, [] as CalculatorItem[]);
};

export const calculateTotalSum = (
  arr: CalculatorItem[],
  profit: number = 1
) => {
  if (arr.length === 0) {
    return 0;
  }

  const totalSum = arr.reduce((total, item) => {
    const price = getItemPrice(item, profit);
    const count = item.count || 1;
    return total + price * count;
  }, 0);

  return totalSum;
};

export const calculateProfitPrices = (calculatorData: CalculatedSteps) => {
  let dcPrice = 0;
  let acPrice = 0;
  let zusaPrice = 0;

  Object.entries(calculatorData).forEach(([calculatorStep, stepPrice]) => {
    const step = calculatorStep as AppSteps;
    const price = stepPrice as number;
    if (dcTable.includes(step)) {
      dcPrice += price;
    } else if (acTable.includes(step)) {
      acPrice += price;
    } else {
      zusaPrice += price;
    }
  });

  return {
    dcPrice: roundUp(dcPrice),
    acPrice: roundUp(acPrice),
    zusaPrice: roundUp(zusaPrice),
  };
};

export const calculateTotalWithoutProfit = (arr: CalculatorItem[]) => {
  if (arr.length === 0) {
    return 0;
  }
  const totalSum = arr.reduce((total, item) => {
    const count = item.count || 1;
    return total + item.price * count;
  }, 0);

  return roundUp(totalSum);
};

export const calculatePricesWithoutProfit = (
  calculatorData: CalculatedSteps
) => {
  let total = 175; //Projektierung price
  Object.values(calculatorData).forEach((stepPrice) => (total += stepPrice));

  return roundUp(total);
};

export const calculatePricesBySteps = (
  calculatorData: ItemsByStep,
  profit: number = 1
) => {
  const additionWorks = ["wallbox", "zusatzarbeiten"];
  let additionWorksPrice = 0;

  const formatedCalculatorData: CalculatedSteps = {};

  Object.entries(calculatorData).forEach(([calculatorStep, stepServices]) => {
    const step = calculatorStep as AppSteps;
    if (!Array.isArray(stepServices)) {
      return;
    }

    const total = calculateTotalSum(stepServices, profit);

    if (additionWorks.includes(step)) {
      additionWorksPrice += total;
      formatedCalculatorData.zusatzarbeiten = additionWorksPrice;
      return;
    }

    formatedCalculatorData[step] = roundUp(total);
  });
  return formatedCalculatorData;
};

const getWorkPrice = (service: CalculatorItem, count: number = 1): number => {
  if (service.angebotSection === "Components") {
    return 0;
  }
  switch (service.title) {
    case "Quermontage (SL Rack)":
      return getQuermontageWorkPrice(count);
    case "Hochmontage (Türk.)":
      return getHochmontage(count);
    default:
      return service.workPrice || 0;
  }
};

const calculateServiceTotal = (service: CalculatorItem): number => {
  const count = countNoChangesArray.includes(service.title)
    ? 1
    : service?.count || 1;
  const primePrice = service.primePrice || 0;
  const workPrice = getWorkPrice(service, count);

  const total = count * (primePrice + workPrice);
  return roundUp(total);
};

export const calculateExpence = (calculatorData: ItemsByStep): number => {
  const projectingPrimePrice = 375;
  const startValue = projectingPrimePrice;
  return Object.values(calculatorData).reduce((total, serviceArray) => {
    const serviceTotal = serviceArray.reduce((arrayTotal, service) => {
      return service.appSection === "pvModule"
        ? arrayTotal
        : arrayTotal + calculateServiceTotal(service);
    }, 0);
    return total + serviceTotal;
  }, startValue);
};

export const calculateTotalWorkDc = (arr: CalculatorItem[]) => {
  if (arr.length === 0) {
    return 0;
  }

  const totalSum = arr.reduce((total, item) => {
    let workPrice = getWorkPrice(item, item.count);
    if (item.appSection === "pvModule") {
      workPrice = item.primePrice || 0;
    }
    const count = item.count || 1;
    return total + workPrice * count;
  }, 0);

  return roundUp(totalSum);
};

export const calculateTotalWorkAc = (arr: CalculatorItem[]) => {
  if (arr.length === 0) {
    return 0;
  }

  const totalSum = arr.reduce((total, item) => {
    let workPrice = item.workPrice || 0;
    let count = 1;
    if (item.angebotSection === "Components") {
      workPrice = item.primePrice || 0;
      count = item.count || 1;
    }
    if (item.appSection === "Zusatzarbeiten" || item.appSection === "wallbox") {
      if (item.description && item.description === "дополнительные батареи") {
        const work = item.workPrice || 0;
        const prime = item.primePrice || 0;
        workPrice = work + prime;
        count = item.count || 1;
      } else {
        workPrice = 0;
        count = 0;
      }
    }
    return total + workPrice * count;
  }, 0);

  return roundUp(totalSum);
};

const getQuermontageWorkPrice = (count: number) => {
  return count > 20 ? 70 : 78;
};

const getHochmontage = (count: number) => {
  return count > 30 ? 60 : count < 15 ? 78 : 67;
};
