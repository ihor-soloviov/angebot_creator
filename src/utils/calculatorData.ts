import { CalculatorData, IndividualService } from "../types/calculator-types";

const profitChangePriceArray = [
  "DC-Montage je Modul",
  "Montage & Verkabelung je Wechselrichter",
  "Montage & Verkabelung je Stromspeicher",
  "Anschluss der PV-Anlage an der Hausverteilung",
  "Anfahrt Elektriker",
];

const dcTable = ["dcMontage", "underConstructions", "pvModule"];

const acTable = [
  "acMontage",
  "inbetriebnahme",
  "invertor",
  "optimizer",
  "battery",
  "iqCombiner",
];

export const calculateTotalSum = (arr: IndividualService[], profit: number) => {
  if (arr.length === 0) {
    return 0;
  }

  return arr.reduce((total, item) => {
    const price = profitChangePriceArray.includes(item.title)
      ? item.price * profit
      : item.price;
    const count = item.count || 1;
    return total + price * count;
  }, 0);
};

export const calculatePrices = (calculatorData: Record<string, number>) => {
  const travelCost = 500; //Anfahrt
  let dcPrice = travelCost;
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

  return { dcPrice, acPrice, zusaPrice };
};

export const calculateTablePrices = (
  calculatorData: CalculatorData,
  profit: number
) => {
  const additionWorks = ["wallbox", "zusatzarbeiten"];
  let additionWorksPrice = 0;

  const tablePrices: { [key: string]: number } = {};

  Object.entries(calculatorData).forEach(([calculatorStep, stepServices]) => {
    if (!Array.isArray(stepServices)) {
      return;
    }

    const totalSum = calculateTotalSum(stepServices, profit);

    if (additionWorks.includes(calculatorStep)) {
      additionWorksPrice += totalSum;
      tablePrices.zusatzarbeiten = additionWorksPrice;
      return;
    }

    tablePrices[calculatorStep] = totalSum;
  });

  return tablePrices;
};
