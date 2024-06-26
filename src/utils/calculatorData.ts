import { CalculatorData, IndividualService } from "../types/calculator-types";

const profitChangePriceArray = [
  "DC-Montage je Modul",
  "Montage & Verkabelung je Wechselrichter",
  "Montage & Verkabelung je Stromspeicher",
  "Anschluss der PV-Anlage an der Hausverteilung",
  "Anfahrt Elektriker",
  "Netzanmeldung",
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

export const calculateTotalSum = (arr: IndividualService[], profit: number = 1) => {
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
      console.log(calculatorStep, stepPrice)
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
  Object.entries(calculatorData).forEach(([step, stepPrice]) => {
    console.log(step, stepPrice)
    return (total += stepPrice)
  });

  return roundUp(total);
};

export const calculatePricesBySteps = (
  calculatorData: CalculatorData,
  profit: number
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

export const calculateExpence = (calculatorData: CalculatorData) => {
  return Object.values(calculatorData).reduce((total, serviceArray) => {
    return (
      total +
      serviceArray.reduce((arrayTotal, service) => {
        const count = service?.count || 1;
        const primePrice = service.primePrice || 0;
        let workPrice;

        if (service.title === "Quermontage (SL Rack)") {
          workPrice = getQuermontageWorkPrice(count);
        } else if (service.title === "Hochmontage (Türk.)") {
          workPrice = getHochmontage(count);
        } else {
          workPrice = service.workPrice || 0;
        }
        const result = arrayTotal + count * primePrice + count * workPrice;
        return roundUp(result);
      }, 0)
    );
  }, 0);
};

export const calculateTotalWorkDc = (
  arr: IndividualService[],
  profit: number
) => {
  if (arr.length === 0) {
    return 0;
  }

  const totalSum = arr.reduce((total, item) => {
    let workPrice: number = 0;
    if (item.appSection === "pvModule") {
      workPrice = item.primePrice || 0;
    }
    workPrice = item.workPrice || 0;
    const price = profitChangePriceArray.includes(item.title)
      ? workPrice * profit
      : workPrice;
    const count = item.count || 1;
    return total + price * count;
  }, 0);

  return roundUp(totalSum);
};

export const calculateTotalWorkAc = (
  arr: IndividualService[],
  profit: number
) => {
  if (arr.length === 0) {
    return 0;
  }

  const totalSum = arr.reduce((total, item) => {
    let workPrice: number = 0;
    if (item.angebotSection === "Components") {
      workPrice = item.primePrice || 0;
    }
    workPrice = item.workPrice || 0;
    const price = profitChangePriceArray.includes(item.title)
      ? workPrice * profit
      : workPrice;
    const count = item.count || 1;
    return total + price * count;
  }, 0);

  return roundUp(totalSum);
};

const getQuermontageWorkPrice = (count: number) => {
  return count > 20 ? 70 : 78;
};

const getHochmontage = (count: number) => {
  return count > 30 ? 60 : count < 15 ? 78 : 67;
};
