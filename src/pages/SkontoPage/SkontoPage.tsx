import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import img from "../../assets/skonko.png"
import "./SkontoPage.scss";
import { ButtonNext } from "../../components/ButtonNext";

export const SkontoPage: React.FC = () => {
  const [value, setValue] = useState('')
  return (
    <div className="skontoPage">
      <Header />
      <div className="skontoPage__inner">
        <div className="skonto__item">
          <h3>Skonto</h3>
          <h4>Скидка</h4>
          <div className="customService__input skonto-input">
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Введите скидку в %" />
          </div>
          <div className="skonto-result">
            
          </div>
          <ButtonNext />
        </div>
      </div>
      <Footer />
    </div>
  );
}
