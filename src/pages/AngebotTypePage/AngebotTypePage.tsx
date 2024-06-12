/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import img from "../../assets/angebotTypePicture.png"
import { Header } from "../../components/Header";
import { CustomSelect } from "../../components/Inputs/CustomSelect";
import { SearchInput } from "../../components/Inputs/SearchInput";
import { ButtonNext } from "../../components/Buttons/ButtonNext";
import stepStore from "../../stores/step-store";
import { SearchResult } from "../../types/dealsTypes";
import { observer } from "mobx-react-lite";
import calculatorStore, { AngebotType } from "../../stores/calculator-store";
import { getNextProjectVersion } from "../../api/fetch";
import "./AngebotTypePage.scss";

export const AngebotTypePage: React.FC = observer(() => {
  const { setAngebotId } = stepStore;
  const { setAngebotType } = calculatorStore;

  const [selectedValue, setSelectedValue] = useState('Выберете тип предложения');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const angebotTypes = ['Vorläufiges Angebot', 'Wirtschaftsanalyse', 'Individuelles Angebot', "Richtpreisangebot"];

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue);
    setAngebotType(newValue as AngebotType)
  };

  useEffect(() => {
    if (selectedId && selectedValue) {
      getNextProjectVersion(selectedId).then(res => setAngebotId(res))
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
            <CustomSelect
              selectedValue={selectedValue}
              changeSelectedValue={changeSelectedValue}
              values={angebotTypes}
            />
            <p className="label angebotTypeLabel">ID ангебота</p>
            <SearchInput searchResult={searchResult} setSearchResult={setSearchResult} setSelectedId={setSelectedId} />
            <ButtonNext isDisabled={isDisabled} />
          </div>
        </div>
        <img className="angebotImage" src={img} alt="girl with notebook" />
      </div>
    </div>
  );
})
