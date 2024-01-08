import React, { useEffect, useState } from "react";
import img from "../../assets/angebotTypePicture.png"
import { Header } from "../../components/Header";
import { CustomSelect } from "../../components/CustomSelect";
import "./AngebotTypePage.scss";
import { SearchInput } from "../../components/SearchInput";
import { ButtonNext } from "../../components/ButtonNext";
import stepStore from "../../stores/step-store";
import { SearchResult } from "../../types/dealsTypes";

export const AngebotTypePage: React.FC = React.memo(() => {
  const { step, setAngebotId } = stepStore;

  const [selectedValue, setSelectedValue] = useState('Выберете тип предложения');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const angebotTypes = ['Vorläufiges Angebot', 'Wirtschaftsanalyse'];

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue)
  };

  useEffect(() => {
    if (selectedId && selectedValue) {
      sessionStorage.setItem(step, JSON.stringify({
        ...searchResult,
        angebotId: selectedId,
        angebotType: selectedValue,
      }))
      setAngebotId(selectedId)
      
      console.log({
        ...searchResult,
        angebotId: selectedId,
        angebotType: selectedValue,
      })

      setIsDisabled(false)
    }
  }, [selectedValue, selectedId, setAngebotId, step, searchResult])


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
