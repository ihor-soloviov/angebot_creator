import React, { useState } from "react";
import "./ProducerPage.scss";
import { Header } from "../../components/Header";
import { CustomSelect } from "../../components/CustomSelect";
import { ButtonNext } from "../../components/ButtonNext";

export const ProducerPage: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('Выберете производителя');
  const [isDisabled, setIsDisabled] = useState(true);
  const producerValues = ["HUAWEI", "TYGO", "ENPHASE"]

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue)
    setIsDisabled(false)
  }

  return (
    <div className="producerPage">
      <Header />
      <div className="producerPage__container">
        <div className="producer__inner">
          <p className="label">Производитель</p>
          <CustomSelect
            selectedValue={selectedValue}
            changeSelectedValue={changeSelectedValue}
            values={producerValues}
          />
          <ButtonNext width={532} isDisabled={isDisabled} />
        </div>
      </div>
    </div>
  );
}
