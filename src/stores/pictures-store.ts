import { makeAutoObservable, toJS } from "mobx";
import { PictureWithTable } from "../pages/ProjectImagesPage";

class PicturesStore {
  mainPictureOfObject = {};
  picturesWithTables: PictureWithTable[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get picObject() {
    return this.mainPictureOfObject;
  }

  get picArray() {
    return this.picturesWithTables;
  }

  setMainProjectPhoto = (file: File) => {
    this.mainPictureOfObject = file;
    setTimeout(() => {
      console.log(this.mainPictureOfObject);
    }, 1000);
  };

  setPictureWithTableArray = (array: PictureWithTable[]) => {
    this.picturesWithTables = array;
    setTimeout(() => {
      console.log(toJS(this.picturesWithTables));
    }, 1000);
  };
}

export default new PicturesStore();
