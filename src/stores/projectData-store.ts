import { makeAutoObservable } from "mobx";
import {
  SelectService,
  SingleService,
} from "../components/Calculator/calculator-types";

export type CombinedServiceArray = (SingleService | SelectService)[];

interface Data {
  [key: string]: CombinedServiceArray;
}

class ProjectDataStore {
  projectData: Data = {};

  constructor() {
    makeAutoObservable(this);
  }

  addNewItemToProjectData = (key: string, data: CombinedServiceArray) => {
    this.projectData[key] = data;
  };
}

export default new ProjectDataStore();
