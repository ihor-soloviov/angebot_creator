import React, { useEffect, useState } from "react";
import producerImg from "../../assets/producerImg.svg"

import { Header } from "../../components/Header";
import { CustomSelect } from "../../components/CustomSelect";
import { ButtonNext } from "../../components/ButtonNext";
import { ButtonPrev } from "../../components/ButtonPrev";
import "./ProducerPage.scss";
import producerStore, { Producer } from "../../stores/producer-store";
import stepStore from "../../stores/step-store";

export const ProducerPage: React.FC = React.memo(() => {
  const [selectedValue, setSelectedValue] = useState<string>('Выберете производителя');
  const [isDisabled, setIsDisabled] = useState(true);
  const producerValues = Object.values(Producer);

  const { setCalculatorSteps } = stepStore;
  const { setProducer } = producerStore;

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue)
    setIsDisabled(false)
  }

  useEffect(() => {
    if (selectedValue !== 'Выберете производителя') {
      setProducer(selectedValue as Producer);
    }

    if (selectedValue === Producer.enphase) {
      setCalculatorSteps(9)
    }
  }, [selectedValue, setProducer, setCalculatorSteps]);


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
        <img className="producerPage__image" src={producerImg} alt="..." />
      </div>
      <ButtonPrev />
    </div>
  );
})
