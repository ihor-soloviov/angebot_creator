import { makeAutoObservable } from "mobx";
import { CalculatorItem, ItemsByStep } from "../types/calculator-types";
import { AppSteps } from "./step-store";

export enum AngebotType {
  previous = "Vorläufiges Angebot",
  analyse = "Wirtschaftsanalyse",
  oriented = "Richtpreisangebot",
  individual = "Individuelles Angebot",
  default = "",
}

export interface PvsolFileItem {
  title: string;
  price: string;
  measurement: string;
}

class CalculatorStore {
  calculatorData: Partial<ItemsByStep> = {};
  angebotData: { [key: string]: CalculatorItem[] } = {};
  angebotType: AngebotType = AngebotType.default;
  pvsolFileData: PvsolFileItem[] | null = null;
  pricesTable = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCount = (
    stepName: AppSteps,
    service: CalculatorItem,
    count: number
  ) => {
    if (!this.calculatorData[stepName]) {
      this.calculatorData[stepName] = [];
    }

    const stepServices = this.calculatorData[stepName];
    if (!stepServices) {
      return;
    }
    const selectedServiceIndex = stepServices.findIndex(
      (s) => s._id === service._id
    );

    if (count > 0) {
      if (selectedServiceIndex === -1) {
        stepServices.push({ ...service, count });
      } else {
        stepServices[selectedServiceIndex].count = count;
      }
    } else {
      if (selectedServiceIndex !== -1) {
        stepServices.splice(selectedServiceIndex, 1);
      }
    }
  };

  get totalPrice() {
    return Object.values(this.calculatorData)
      .flat()
      .reduce((total, service) => {
        const count = service.count || 0;
        return total + service.price * count;
      }, 0);
  }

  stepTotalPrice = (stepName: AppSteps) => {
    const stepServices = this.calculatorData[stepName] || [];
    return stepServices.reduce((total, service) => {
      const count = service.count || 0;
      return total + service.price * count;
    }, 0);
  };

  getService = (
    stepName: AppSteps,
    serviceId: string
  ): CalculatorItem | undefined => {
    const stepServices = this.calculatorData[stepName] || [];
    return stepServices.find((s) => s._id === serviceId);
  };

  setAngebotType = (type: AngebotType) => (this.angebotType = type);

  setPvsolFileData = (dataFromParse: PvsolFileItem[]) =>
    (this.pvsolFileData = dataFromParse);
}

export default new CalculatorStore();
