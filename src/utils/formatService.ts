import {
  CalculatorServices,
  IndividualService,
  ServiceSpecific,
} from "../types/calculator-types";

export const formatSingleServices = (
  servicesFromDatabase: IndividualService[]
) =>
  servicesFromDatabase.map((el: IndividualService) => ({
    ...el,
    count: el.count || 0,
    specific: ServiceSpecific.Single,
  }));

export const formatSelectServices = (
  servicesFromDatabase: IndividualService[]
) =>
  servicesFromDatabase.map((el: IndividualService) => ({
    ...el,
    specific: ServiceSpecific.Select,
  }));

export const filterServicesByProducer = (
  services: CalculatorServices,
  producer: string
): CalculatorServices => {
  const filterByProducer = (service: IndividualService) =>
    service?.available === 'all' || service.producer === producer;

  return {
    single: services.single.filter(filterByProducer),
    select: services.select.filter(filterByProducer),
  };
};
