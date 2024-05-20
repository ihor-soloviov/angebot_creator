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

export type DropdownService = {
  label?: string;
  select: DropdownServiceOption[];
};

type DropdownServiceOption = {
  value: string;
  price: number;
};

export type SelectedServiceOption = {
  value: string;
  price: number;
  count: number;
};
