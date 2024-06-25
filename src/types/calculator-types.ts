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
  calculatorSection: string;
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

// export type BaseCalculatorData = {
//   angebotType: AngebotType;
//   angebotId: string;
//   pvsolFileData: PvsolFileItem[] | null;
// };

// export type CalculatorData = BaseCalculatorData & {
//   [key: string]: IndividualService[];
// };

export type CalculatorData = {
  [key: string]: IndividualService[];
};