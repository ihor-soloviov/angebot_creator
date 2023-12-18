import { makeAutoObservable } from "mobx";
import { PictureWithTable } from "../pages/ProjectImagesPage";

class PicturesStore {
  mainPictureOfObject = {};
  picturesWithTables: PictureWithTable[] = [];

  constructor() {
    makeAutoObservable(this);
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
      console.log([...this.picturesWithTables]);
    }, 1000);
  };
}

export default new PicturesStore();
