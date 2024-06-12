import { Module, ServiceSpecific } from "../types/calculator-types";

export const formatSingleServices = (servicesFromDatabase: Module[]) =>
  servicesFromDatabase.map((el: Module) => ({
    ...el,
    count: 0,
    specific: ServiceSpecific.Single,
  }));

export const formatSelectServices = (servicesFromDatabase: Module[]) =>
  servicesFromDatabase.map((el: Module) => ({
    ...el,
    specific: ServiceSpecific.Select,
  }));
