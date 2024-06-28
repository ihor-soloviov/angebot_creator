import { AppSteps } from "../stores/step-store";

export type Title = {
  title: string;
  description?: string;
};

export type Module = Title & {
  price: number;
};

export type IndividualService = Module & {
  specific: ServiceSpecific;
  count?: number;
  _id?: string;
  producer?: string;
  primePrice?: number;
  workPrice?: number;
  available?: string;
  appSection: string;
  angebotSection: string;
};

export type DropdownServices = {
  label?: string;
  options: IndividualService[];
};

export enum ServiceSpecific {
  Select = "select",
  Single = "single",
}

export type CalculatorServices = {
  single: IndividualService[];
  select: IndividualService[];
};

export type ServicesByStep = {
  [key in AppSteps]: IndividualService[];
};

export type CalculatedSteps = {
  [key in AppSteps]: number;
};
