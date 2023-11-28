import React, { useEffect, useState } from "react";
import img from "../../assets/angebotTypePicture.png"
import { Header } from "../../components/Header";
import { CustomSelect } from "../../components/CustomSelect";
import "./AngebotTypePage.scss";
import { SearchInput } from "../../components/SearchInput";
import { ButtonNext } from "../../components/ButtonNext";

export const AngebotTypePage: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('Выберете тип предложения');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue)
  }

  useEffect(() => {
    if (selectedId && selectedValue) {
      setIsDisabled(false)
    }
  }, [selectedValue, selectedId])


  return (
    <div className="angebotTypePage">
      <Header />
      <div className="angebotTypePage__inner">
        <div className="angebotType">
          <div className="angebotType__inner">
            <p className="label">Тип предложения</p>
            <CustomSelect selectedValue={selectedValue} changeSelectedValue={changeSelectedValue} />
            <p className="label">ID клиента</p>
            <SearchInput setSelectedId={setSelectedId} />
            <ButtonNext isDisabled={isDisabled} nextStep={3} />
          </div>
        </div>
        <img className="angebotImage" src={img} alt="girl with notebook" />
      </div>
    </div>
  );
}
