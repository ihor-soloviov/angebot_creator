import { makeAutoObservable } from "mobx";

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

  constructor() {
    makeAutoObservable(this);
  }

  setStep = (value: Steps) => {
    this.step = value;
  };
}

export default new StepStore();
