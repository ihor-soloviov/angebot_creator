import { makeAutoObservable } from "mobx";
import producerStore, { Producer } from "./producer-store";

export enum Steps {
  welcome,
  angebotType,
  pvsolFile,
  projectImages,
  producer,
  montage,
  underConstructions,
  pvModule,
  optimizer,
  invertor,
  iqCombiner,
  battery,
  wallbox,
  backupBox,
  taubenschutz,
  zusatzarbeiten,
  checkout,
  bravo,
}

const { producer } = producerStore;

class StepStore {
  step = Steps.producer;
  stepFromMontage = 6;

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

  setStep = (value: Steps) => {
    this.step = value;
  };

  getStepNumber = () => {

    const index = this.arraysOfSteps[producer].indexOf(this.step);

  if (index === -1) {
    return null; // Якщо крок не знайдений в масиві, повертаємо null
  }
    const arrayOfStepsLength = producer === Producer.huawei ? 12 : 11;
    const stepCount = index - this.stepFromMontage + 2;

    return [arrayOfStepsLength, stepCount];
  };

  generateNextStep = () => {
    const activeStep = this.step;

    const stepsArray = this.arraysOfSteps[producerStore.producer];

    const nextStepIndex = stepsArray.findIndex(
      (el, index) => el === activeStep && index < stepsArray.length - 1
    );

    if (nextStepIndex !== -1) {
      return stepsArray[nextStepIndex + 1];
    }

    // Якщо вже на останньому кроці або крок не знайдено
    return null;
  };

  generatePrevStep = () => {
    const activeStep = this.step;
    const stepsArray = this.arraysOfSteps[producerStore.producer];

    const prevStepIndex = stepsArray.findIndex(
      (el, index) => el === activeStep && index > 0
    );

    // Перевірка, чи був знайдений попередній крок
    if (prevStepIndex !== -1) {
      return stepsArray[prevStepIndex - 1];
    }

    // Якщо вже на першому кроці або крок не знайдено
    return null;
  };
}

export default new StepStore();
