import React from "react";
import "./BravoPage.scss";
import { Header } from "../../components/Header";

export const BravoPage: React.FC = () => {
  return (
    <div className="bravoPage">
      <Header />
      <div className="bravoPage__container">
        <h1>Браво!</h1>
        <p>Ваше предложение ID 806 v.1 <br /> полностью готово</p>
        <h3>Желаете ознакомится?</h3>
        <button className="downloadButton">Загрузить в формате PDF</button>
      </div>
    </div>
  );
}
