export const getUnNormalShownPrice = (price: number, priceCount: number) => {
  if (priceCount < 4) {
    return price * priceCount;
  } else {
    const baseItems = 3; // перші три айтеми
    const additionalItems = priceCount - baseItems; // додаткові айтеми
    const additionalItemPrice = 100;
    return (price * baseItems) + (additionalItemPrice * additionalItems);
  }
};
