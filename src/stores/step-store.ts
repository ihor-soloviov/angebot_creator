import { makeAutoObservable } from "mobx";

class StepStore {
  step = 2;

  constructor() {
    makeAutoObservable(this);
  }

  setStep = (value: number) => {
    this.step = value;
  };
}

export default new StepStore();
