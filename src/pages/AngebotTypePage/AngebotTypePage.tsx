import React, { useState } from "react";
import img from "../../assets/angebotTypePicture.png"
import { Header } from "../../components/Header";
import { CustomSelect } from "../../components/CustomSelect";
import "./AngebotTypePage.scss";
import { SearchInput } from "../../components/SearchInput";
import { ButtonNext } from "../../components/ButtonNext";

export const AngebotTypePage: React.FC = () => {
  const [selectValue, setSelectValue] = useState('')
  return (
    <div className="angebotTypePage">
      <Header />
      <div className="angebotTypePage__inner">
        <div className="angebotType">
          <div className="angebotType__inner">
            <p className="label">Тип предложения</p>
            <CustomSelect />
            <p className="label">ID клиента</p>
            <SearchInput />
            <ButtonNext />
          </div>
        </div>
        <img className="angebotImage" src={img} alt="girl with notebook" />
      </div>
    </div>
  );
}
