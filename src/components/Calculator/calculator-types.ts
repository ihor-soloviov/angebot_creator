export type Title = {
  blackTitle: string;
  greyTitle?: string;
};

export type SingleService = Title & {
  price: number;
  count?: number;
  id?: number
};

export type SelectService = {
  label?: string;
  select: SelectServiceOption[];
};

type SelectServiceOption = {
  value: string;
  price: number;
};

export type SelectedServiceOption = {
  value: string;
  price: number;
  count: number;
};
