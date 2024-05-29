export type Title = {
  title: string;
  description?: string;
};

export type Module = Title & {
  price: number;
};

export type IndividualService = Module & {
  price: number;
  specific: ServiceSpecific;
  count?: number;
  id?: number;
  producer?: string;
  table_name?: string
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

export enum ServiceSpecific {
  Select = "select",
  Single = "single",
}

export type CalculatorServices = {
  single: IndividualService[];
  select: IndividualService[];
};
