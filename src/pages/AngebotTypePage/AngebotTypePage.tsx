import React, { useEffect, useState } from "react";
import img from "../../assets/angebotTypePicture.png"
import { Header } from "../../components/Header";
import { CustomSelect } from "../../components/CustomSelect";
import "./AngebotTypePage.scss";
import { SearchInput } from "../../components/SearchInput";
import { ButtonNext } from "../../components/ButtonNext";
import stepStore from "../../stores/step-store";

export const AngebotTypePage: React.FC = React.memo(() => {
  const { step, setAngebotId } = stepStore;

  const [selectedValue, setSelectedValue] = useState('Выберете тип предложения');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const angebotTypes = ['Vorläufiges Angebot', 'Wirtschaftsanalyse'];

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue)
  };

  useEffect(() => {
    if (selectedId && selectedValue) {
      sessionStorage.setItem(step, JSON.stringify([selectedValue, selectedId]))
      setAngebotId(selectedId)
      setIsDisabled(false)
    }
  }, [selectedValue, selectedId, setAngebotId, step])


  return (
    <div className="angebotTypePage">
      <Header />
      <div className="angebotTypePage__inner">
        <div className="angebotType">
          <div className="angebotType__inner">
            <p className="label">Тип предложения</p>
            <CustomSelect
              selectedValue={selectedValue}
              changeSelectedValue={changeSelectedValue}
              values={angebotTypes}
            />
            <p className="label angebotTypeLabel">ID ангебота</p>
            <SearchInput setSelectedId={setSelectedId} />
            <ButtonNext isDisabled={isDisabled} />
          </div>
        </div>
        <img className="angebotImage" src={img} alt="girl with notebook" />
      </div>
    </div>
  );
})
