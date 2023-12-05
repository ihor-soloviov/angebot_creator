import { makeAutoObservable } from "mobx";

export enum Producer {
  tigo = "Tigo",
  huawei = "Huawei",
  enphase = "Enphase",
}

class ProducerStore {
  producer = Producer.tigo;

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
