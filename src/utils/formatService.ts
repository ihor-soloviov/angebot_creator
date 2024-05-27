import {
  Module,
  ServiceSpecific,
} from "../components/Calculator/calculator-types";

export const formatSingleServices = (servicesFromDatabase: Module[]) =>
  servicesFromDatabase.map((el: Module) => ({
    ...el,
    title: el.model,
    count: 0,
    specific: ServiceSpecific.Single,
  }));

export const formatSelectServices = (servicesFromDatabase: Module[]) =>
  servicesFromDatabase.map((el: Module) => ({
    ...el,
    title: el.model,
    specific: ServiceSpecific.Select,
  }));
