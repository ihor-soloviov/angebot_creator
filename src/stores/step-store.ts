import { makeAutoObservable } from "mobx";
import producerStore from "./producer-store";

export enum Steps {
  welcome,
  angebotType,
  pvsolFile,
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
  skonto,
}

class StepStore {
  step = Steps.welcome;

  arraysOfSteps = {
    Huawei: [
      Steps.welcome,
      Steps.angebotType,
      Steps.pvsolFile,
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
    ],
    Enphase: [
      Steps.welcome,
      Steps.angebotType,
      Steps.pvsolFile,
      Steps.producer,
      Steps.montage,
      Steps.underConstructions,
      Steps.pvModule,
      Steps.optimizer,
      Steps.invertor,
      Steps.iqCombiner,
      Steps.battery,
      Steps.wallbox,
      Steps.taubenschutz,
      Steps.zusatzarbeiten,
    ],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setStep = (value: Steps) => {
    this.step = value;
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
  
    const prevStepIndex = stepsArray.findIndex((el, index) => el === activeStep && index > 0);
  
    // Перевірка, чи був знайдений попередній крок
    if (prevStepIndex !== -1) {
      return stepsArray[prevStepIndex - 1];
    }
  
    // Якщо вже на першому кроці або крок не знайдено
    return null;
  };
}

export default new StepStore();
