import React from "react";
import { Header } from "../../components/Header";
import producerStore from "../../stores/producer-store";
import stepStore from "../../stores/step-store";
import "./BravoPage.scss";

export const BravoPage: React.FC = () => {
  const { producer } = producerStore;
  const { arraysOfSteps, id } = stepStore;

  const sendDataToGenerator = () => {
    const pagesByProducer = [...arraysOfSteps[producer]].filter((page: string) => {
      const unavailablePages = [
        "welcome",
        "projectImages",
        "producer",
        "checkout",
        "bravo"
      ];
      return !unavailablePages.includes(page);
    });

    const dataToGenerator = [];

    if (!pagesByProducer) {
      return;
    }

    pagesByProducer.forEach(el => {
      const storageForPage = sessionStorage.getItem(el);
      if (!storageForPage) {
        return;
      }
      dataToGenerator.push(JSON.parse(storageForPage))
    })

    if (dataToGenerator.length > 0) {
      console.log(dataToGenerator)
    }
  }


  return (
    <div className="bravoPage">
      <Header />
      <div className="bravoPage__container">
        <h1>Браво!</h1>
        <p>Ваше предложение ID {id} v.1 <br /> полностью готово</p>
        <h3>Желаете ознакомиться?</h3>
        <button onClick={sendDataToGenerator} className="downloadButton">Загрузить в формате PDF</button>
      </div>
    </div>
  );
}
