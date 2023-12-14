import { makeAutoObservable } from "mobx";
import producerStore from "./producer-store";

export enum Steps {
  welcome = "welcome",
  angebotType = "angebotType",
  pvsolFile = "pvsolFile",
  projectImages = "projectImages",
  producer = "producer",
  montage = "montage",
  underConstructions = "underConstructions",
  pvModule = "pvModule",
  optimizer = "optimizer",
  invertor = "invertor",
  iqCombiner = "iqCombiner",
  battery = "battery",
  wallbox = "wallbox",
  backupBox = "backupBox",
  taubenschutz = "taubenschutz",
  zusatzarbeiten = "zusatzarbeiten",
  checkout = "checkout",
  bravo = "bravo",
}

export enum ProducerSteps {
  huawei = 10,
  enphase = 9,
}

class StepStore {
  step = Steps.producer;
  calculatorSteps = 10;
  calculatorStep = 1;

  arraysOfSteps = {
    Huawei: [
      Steps.welcome,
      Steps.angebotType,
      Steps.pvsolFile,
      Steps.projectImages,
      Steps.producer,
      Steps.montage,
      Steps.underConstructions,
      Steps.pvModule,
      Steps.optimizer,
      Steps.invertor,
      Steps.battery,
      Steps.wallbox,
      Steps.backupBox,
      Steps.taubenschutz,
      Steps.zusatzarbeiten,
      Steps.checkout,
      Steps.bravo,
    ],
    Enphase: [
      Steps.welcome,
      Steps.angebotType,
      Steps.pvsolFile,
      Steps.projectImages,
      Steps.producer,
      Steps.montage,
      Steps.underConstructions,
      Steps.pvModule,
      Steps.invertor,
      Steps.iqCombiner,
      Steps.battery,
      Steps.wallbox,
      Steps.taubenschutz,
      Steps.zusatzarbeiten,
      Steps.checkout,
      Steps.bravo,
    ],
  };

  constructor() {
    makeAutoObservable(this);
  }

  get steps() {
    return this.arraysOfSteps;
  }
  setStep = (value: Steps) => {
    this.step = value;
  };

  setCalculatorSteps = (value: number) => {
    this.calculatorSteps = value;
  };

  getCurrectRangeIndex = () => {
    const activeStep = this.step;
    const stepsArray = this.arraysOfSteps[producerStore.producer];
    const currentStepIndex = stepsArray.findIndex(
      (el, index) => el === activeStep && index < stepsArray.length - 1
    );

    return currentStepIndex - 4;
  };

  generateNextStep = () => {
    const activeStep = this.step;
    const stepsArray = this.arraysOfSteps[producerStore.producer];
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
    const activeStep = this.step;
    const stepsArray = this.arraysOfSteps[producerStore.producer];
    const currentStepIndex = stepsArray.findIndex(
      (el, index) => el === activeStep && index > 0
    );

    if (currentStepIndex !== -1) {
      return stepsArray[currentStepIndex - 1];
    }
    // Якщо вже на першому кроці або крок не знайдено
    return null;
  };
}

export default new StepStore();
