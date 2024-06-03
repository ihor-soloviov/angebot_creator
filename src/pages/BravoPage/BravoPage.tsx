import React from "react";
import { Header } from "../../components/Header";
import stepStore from "../../stores/step-store";
import "./BravoPage.scss";
import { sendDataToGenerator } from "../../api/fetch";

export const BravoPage: React.FC = () => {
  const { id } = stepStore;

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
