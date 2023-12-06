import { makeAutoObservable } from "mobx";

export enum Producer {
  huawei = "Huawei",
  enphase = "Enphase",
}

class ProducerStore {
  producer = "" ;

  constructor() {
    makeAutoObservable(this);
  }

  setProducer = (value: Producer) => {
    if (value) {
      this.producer = value;
    }
  };
}

export default new ProducerStore();
