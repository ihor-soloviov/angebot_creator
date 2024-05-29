export type Title = {
  title: string;
  description?: string;
};

export enum ServiceSpecific {
  Select = "select",
  Single = "single",
}

export type IndividualService = Title & {
  price: number;
  specific: ServiceSpecific;
  count?: number;
  id?: number;
  producer?: string;
};

export type DropdownServices = {
  label?: string;
  options: IndividualService[];
};

export type SelectedServiceOption = {
  value: string;
  price: number;
  count: number;
};

export type CalculatorServices = {
  single: IndividualService[];
  select: IndividualService[];
};

export type Module = {
  model: string;
  price: number;
};

export type ComponentsFromDatabase = IndividualService & {
  table_name: string;
};
