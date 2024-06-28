import { AppSteps } from "../stores/step-store";

export type Title = {
  title: string;
  description?: string;
};

export type Item = Title & {
  price: number;
};

export type CalculatorItem = Item & {
  specific: ItemSpecific;
  count?: number;
  _id: string;
  producer?: string;
  primePrice?: number;
  workPrice?: number;
  available?: string;
  appSection: string;
  angebotSection: string;
};

export type DropdownItems = {
  label?: string;
  options: CalculatorItem[];
};

export enum ItemSpecific {
  Select = "select",
  Single = "single",
}

export type CalculatorItems = {
  single: CalculatorItem[];
  select: CalculatorItem[];
};

export type ItemsByStep = {
  [key in AppSteps]?: CalculatorItem[];
};

export type CalculatedSteps = {
  [key in AppSteps]?: number;
};
