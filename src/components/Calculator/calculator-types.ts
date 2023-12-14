export type Title = {
  blackTitle: string;
  greyTitle?: string;
};

export type SingleService = Title & {
  price: number;
  count?: number;
};

export type SelectService = {
  label?: string;
  select: SelectServiceOption[];
  selected?: SelectedServiceOption;
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
