export type Title = {
  blackTitle: string;
  greyTitle: string;
};

export type SingleService = Title & {
  price: number;
};

export type SelectService = {
  label: string;
  select: SelectServiceOption[];
};

type SelectServiceOption = {
  value: string;
  price: number;
};
