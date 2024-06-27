import { makeAutoObservable } from "mobx";
import producerStore from "./producer-store";

export enum AppSteps {
  angebotType = "angebotType",
  pvsolFile = "pvsolFile",
  projectImages = "projectImages",
  producer = "producer",
  dcMontage = "dcMontage",
  underConstructions = "underConstructions",
  pvModule = "pvModule",
  acMontage = "acMontage",
  inbetriebnahme = "inbetriebnahme",
  optimizer = "optimizer",
  invertor = "invertor",
  iqCombiner = "iqCombiner",
  battery = "battery",
  wallbox = "wallbox",
  zusatzarbeiten = "zusatzarbeiten",
  checkout = "checkout",
  gewin = "gewin",
  bravo = "bravo",
}

export enum ProducerStepsCount {
  huawei = 10,
  enphase = 9,
}

class StepStore {
  appStep = AppSteps.producer;
  calculatorSteps = 10;
  calculatorStep = 1;
  angebotId = "";

  arrayOfProducerSteps = {
    Huawei: [
      AppSteps.angebotType,
      // AppSteps.pvsolFile,
      // AppSteps.projectImages,
      AppSteps.producer,
      AppSteps.dcMontage,
      AppSteps.underConstructions,
      AppSteps.pvModule,
      AppSteps.acMontage,
      AppSteps.inbetriebnahme,
      AppSteps.optimizer,
      AppSteps.invertor,
      AppSteps.wallbox,
      AppSteps.battery,
      AppSteps.zusatzarbeiten,
      AppSteps.checkout,
      AppSteps.gewin,
      AppSteps.bravo,
    ],
    Enphase: [
      AppSteps.angebotType,
      // AppSteps.pvsolFile,
      // AppSteps.projectImages,
      AppSteps.producer,
      AppSteps.dcMontage,
      AppSteps.underConstructions,
      AppSteps.pvModule,
      AppSteps.acMontage,
      AppSteps.inbetriebnahme,
      AppSteps.invertor,
      AppSteps.iqCombiner,
      AppSteps.wallbox,
      AppSteps.battery,
      AppSteps.zusatzarbeiten,
      AppSteps.checkout,
      AppSteps.gewin,
      AppSteps.bravo,
    ],
  };

  constructor() {
    makeAutoObservable(this);
  }

  get steps() {
    return this.arrayOfProducerSteps;
  }

  setStep = (value: AppSteps) => {
    this.appStep = value;
  };

  setCalculatorSteps = (value: number) => {
    this.calculatorSteps = value;
  };

  get rangeIndex() {
    const activeStep = this.appStep;
    const stepsArray = this.arrayOfProducerSteps[producerStore.producer];
    const currentStepIndex = stepsArray.findIndex(
      (el, index) => el === activeStep && index < stepsArray.length - 1
    );

    return currentStepIndex - 1;
  }

  generateNextStep = () => {
    const activeStep = this.appStep;
    const stepsArray = this.arrayOfProducerSteps[producerStore.producer];
    const currentStepIndex = stepsArray.findIndex(
      (el, index) => el === activeStep && index < stepsArray.length - 1
    );
    if (currentStepIndex !== -1) {
      return stepsArray[currentStepIndex + 1];
    }
    // Якщо вже на останньому кроці або крок не знайдено
    return null;
  };

  generatePrevStep = () => {
    const activeStep = this.appStep;
    const stepsArray = this.arrayOfProducerSteps[producerStore.producer];
    const currentStepIndex = stepsArray.findIndex(
      (el, index) => el === activeStep && index > 0
    );

    if (currentStepIndex !== -1) {
      return stepsArray[currentStepIndex - 1];
    }
    // Якщо вже на першому кроці або крок не знайдено
    return null;
  };

  setAngebotId = (value: string) => {
    this.angebotId = value;
  };

  get id() {
    return this.angebotId;
  }
}

export default new StepStore();
