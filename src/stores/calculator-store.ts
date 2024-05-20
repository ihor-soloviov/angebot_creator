import { makeAutoObservable } from "mobx";
import { IndividualService } from "../components/Calculator/calculator-types";

class CalculatorStore {
  targetServices = [];

  constructor() {
    makeAutoObservable(this);
  }

}

module.exports = new CalculatorStore();
