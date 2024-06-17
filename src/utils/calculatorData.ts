import {
  AngebotData,
  CalculatorData,
  IndividualService,
} from "../types/calculator-types";

export const calculateTotalPrices = (calcData: CalculatorData) => {
  const totalPrices: AngebotData = {};

  function processArray(array: IndividualService[]) {
    array.forEach((item) => {
      const { angebotSection, price, count } = item;
      const itemCount = count || 1;
      const totalPrice = price * itemCount;

      if (!totalPrices[angebotSection]) {
        totalPrices[angebotSection] = { totalPrice: 0, count: 0 };
      }

      totalPrices[angebotSection].totalPrice += totalPrice;
      totalPrices[angebotSection].count += itemCount;
    });
  }

  for (const key in calcData) {
    if (Array.isArray(calcData[key])) {
      processArray(calcData[key] as IndividualService[]);
    }
  }

  // Формування масиву з результатами
  const result = Object.keys(totalPrices).map((section) => ({
    calculatorSection: section,
    totalPrice: totalPrices[section],
  }));

  return result;
};
