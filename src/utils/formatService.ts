import { IndividualService, ServiceSpecific } from "../types/calculator-types";

export const formatSingleServices = (servicesFromDatabase: IndividualService[]) =>
  servicesFromDatabase.map((el: IndividualService) => ({
    ...el,
    count: 0,
    specific: ServiceSpecific.Single,
  }));

export const formatSelectServices = (servicesFromDatabase: IndividualService[]) =>
  servicesFromDatabase.map((el: IndividualService) => ({
    ...el,
    specific: ServiceSpecific.Select,
  }));
