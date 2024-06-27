import { CalculatorData, IndividualService } from "../types/calculator-types";

const profitChangePriceArray = [
  "DC-Montage je Modul",
  "Montage & Verkabelung je Wechselrichter",
  "Montage & Verkabelung je Stromspeicher",
  "Anschluss der PV-Anlage an der Hausverteilung",
  "Netzanmeldung",
];

const countNoChangesArray = [
  "Montage & Verkabelung je Wechselrichter",
  "Montage & Verkabelung je Stromspeicher",
];

export const roundUp = (num: number) => {
  const precision = Math.pow(10, 2);
  return Math.ceil(num * precision) / precision;
};

const dcTable = ["dcMontage", "underConstructions", "pvModule"];

const acTable = [
  "acMontage",
  "inbetriebnahme",
  "invertor",
  "optimizer",
  "battery",
  "iqCombiner",
];

export const calculateTotalSum = (
  arr: IndividualService[],
  profit: number = 1
) => {
  if (arr.length === 0) {
    return 0;
  }

  const totalSum = arr.reduce((total, item) => {
    const price = profitChangePriceArray.includes(item.title)
      ? item.price * profit
      : item.price;
    const count = item.count || 1;
    return total + price * count;
  }, 0);

  return totalSum;
};

export const calculateProfitPrices = (
  calculatorData: Record<string, number>
) => {
  let dcPrice = 0;
  let acPrice = 0;
  let zusaPrice = 0;

  Object.entries(calculatorData).forEach(([calculatorStep, stepPrice]) => {
    if (dcTable.includes(calculatorStep)) {
      dcPrice += stepPrice;
    } else if (acTable.includes(calculatorStep)) {
      acPrice += stepPrice;
    } else {
      zusaPrice += stepPrice;
    }
  });

  return {
    dcPrice: roundUp(dcPrice),
    acPrice: roundUp(acPrice),
    zusaPrice: roundUp(zusaPrice),
  };
};

export const calculateTotalWithoutProfit = (arr: IndividualService[]) => {
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
  calculatorData: Record<string, number>
) => {
  let total = 175; //Projektierung price
  Object.values(calculatorData).forEach((stepPrice) => (total += stepPrice));

  return roundUp(total);
};

export const calculatePricesBySteps = (
  calculatorData: CalculatorData,
  profit: number = 1
) => {
  const additionWorks = ["wallbox", "zusatzarbeiten"];
  let additionWorksPrice = 0;

  const formatedCalculatorData: { [key: string]: number } = {};

  Object.entries(calculatorData).forEach(([calculatorStep, stepServices]) => {
    if (!Array.isArray(stepServices)) {
      return;
    }

    const total = calculateTotalSum(stepServices, profit);

    if (additionWorks.includes(calculatorStep)) {
      additionWorksPrice += total;
      formatedCalculatorData.zusatzarbeiten = additionWorksPrice;
      return;
    }

    formatedCalculatorData[calculatorStep] = roundUp(total);
  });
  return formatedCalculatorData;
};

const getWorkPrice = (
  service: IndividualService,
  count: number = 1
): number => {
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

const calculateServiceTotal = (service: IndividualService): number => {
  const count = countNoChangesArray.includes(service.title)
    ? 1
    : service?.count || 1;
  const primePrice = service.primePrice || 0;
  const workPrice = getWorkPrice(service, count);

  const total = count * (primePrice + workPrice);
  return roundUp(total);
};

export const calculateExpence = (calculatorData: CalculatorData): number => {
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

export const calculateTotalWorkDc = (arr: IndividualService[]) => {
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

export const calculateTotalWorkAc = (arr: IndividualService[]) => {
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
        count = 0
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
