export const updateTotalPrice = (setTotalPrice: (value: number) => void) => {
  const allPricesElements = [
    ...document.getElementsByClassName("service_price"),
  ];
  if (allPricesElements.length > 0) {
    const prices = allPricesElements.map((el) => {
      if (el.textContent) {
        return +el.textContent.split(".")[0];
      }
      return 0; // Default value if textContent is not available
    });

    const sumArray = (numbers: number[]): number => {
      return numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    };

    const result = sumArray(prices);
    setTotalPrice(result);
  }
};
