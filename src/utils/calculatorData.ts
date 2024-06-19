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

export const calculatePrices = (
  calculatorData: CalculatorData,
  profit: number
) => {
  const travelCost = 500; //Anfahrt
  let dcPrice = travelCost;
  let acPrice = 0;
  let zusaPrice = 0;

  Object.entries(calculatorData).forEach(([calculatorStep, services]) => {
    if (!Array.isArray(services)) {
      return;
    }

    const totalSum = calculateTotalSum(services, profit);
    
    if (dcTable.includes(calculatorStep)) {
      dcPrice += totalSum;
    } else if (acTable.includes(calculatorStep)) {
      acPrice += totalSum;
    } else if (calculatorStep === "zusatzarbeiten") {
      zusaPrice += totalSum;
    }
  });

  return { dcPrice, acPrice, zusaPrice };
};
