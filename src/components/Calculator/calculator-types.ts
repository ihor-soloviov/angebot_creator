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
