import {
  Module,
  ServiceSpecific,
} from "../components/Calculator/calculator-types";

export const formatSingleServices = (servicesFromDatabase: Module[]) =>
  servicesFromDatabase.map((el: Module) => ({
    title: el.model,
    price: el.price,
    count: 0,
    specific: ServiceSpecific.Single,
  }));

export const formatSelectServices = (servicesFromDatabase: Module[]) =>
  servicesFromDatabase.map((el: Module) => ({
    title: el.model,
    price: el.price,
    specific: ServiceSpecific.Select,
  }));
