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
  id?: string;
  producer?: string;
  sections?: string
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
