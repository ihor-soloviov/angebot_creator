export const getUnNormalShownPrice = (price: number, priceCount: number) => {
  switch (priceCount) {
    case 1:
      return price;

    case 2:
    case 3:
      return 500 * priceCount;

    default:
      return 350 * priceCount;
  }
};
