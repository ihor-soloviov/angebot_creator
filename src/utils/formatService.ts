import {
  CalculatorItems,
  CalculatorItem,
  ItemSpecific,
} from "../types/calculator-types";

export const formatSingleServices = (dbServices: CalculatorItem[]) =>
  dbServices.map((el: CalculatorItem) => ({
    ...el,
    count: el.count || 0,
    specific: ItemSpecific.Single,
  }));

export const formatSelectServices = (dbServices: CalculatorItem[]) =>
  dbServices.map((el: CalculatorItem) => ({
    ...el,
    specific: ItemSpecific.Select,
  }));

export const filterServicesByProducer = (
  services: CalculatorItems,
  producer: string
): CalculatorItems => {
  const filterByProducer = (service: CalculatorItem) =>
    service?.available === "all" || service.producer === producer;

  return {
    single: services.single.filter(filterByProducer),
    select: services.select.filter(filterByProducer),
  };
};
