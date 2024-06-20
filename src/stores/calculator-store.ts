import { makeAutoObservable } from "mobx";
import { IndividualService } from "../types/calculator-types";

export enum AngebotType {
  previous = "Vorläufiges Angebot",
  analyse = "Wirtschaftsanalyse",
  oriented = "Richtpreisangebot",
  individual = 'Individuelles Angebot',
  default = "",
}

export interface PvsolFileItem {
  title: string;
  price: string;
  measurement: string;
}

class CalculatorStore {
  calculatorData: { [key: string]: IndividualService[] } = {};
  angebotData: { [key: string]: IndividualService[] } = {};
  angebotType: AngebotType = AngebotType.default;
  pvsolFileData: PvsolFileItem[] | null = null;
  pricesTable = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCount = (
    stepName: string,
    service: IndividualService,
    count: number
  ) => {
    if (!this.calculatorData[stepName]) {
      this.calculatorData[stepName] = [];
    }

    const stepServices = this.calculatorData[stepName];
    const selectedServiceIndex = stepServices.findIndex(
      (s) => s.title === service.title
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

  stepTotalPrice = (stepName: string) => {
    const stepServices = this.calculatorData[stepName] || [];
    return stepServices.reduce((total, service) => {
      const count = service.count || 0;
      return total + service.price * count;
    }, 0);
  };

  getService = (
    stepName: string,
    serviceTitle: string
  ): IndividualService | undefined => {
    const stepServices = this.calculatorData[stepName] || [];
    return stepServices.find((s) => s.title === serviceTitle);
  };

  setAngebotType = (type: AngebotType) => (this.angebotType = type);

  setPvsolFileData = (dataFromParse: PvsolFileItem[]) =>
    (this.pvsolFileData = dataFromParse);
}

export default new CalculatorStore();