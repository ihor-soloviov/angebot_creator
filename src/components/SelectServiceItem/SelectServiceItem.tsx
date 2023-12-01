import React, { useEffect, useState } from "react";
import "./SelectServiceItem.scss";
import { SelectService } from "../Calculator/calculator-types";
import { CustomSelect } from "../CustomSelect";
import { PlusMinusHandler } from "../PlusMinusHandler";

interface Props {
  service: SelectService
}

export const SelectServiceItem: React.FC<Props> = ({ service }) => {
  const [selectedValue, setSelectedValue] = useState('Выберете высоту');
  const [optionPrice, setOptionPrice] = useState(0)
  const { label, select } = service;
  const valuesForSelect = select.map(obj => obj.value);

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue)
  }

  useEffect(() => {
    if (selectedValue !== 'Выберете высоту') {
      const newPrice = select.find(el => el.value === selectedValue)?.price || 0;
      setOptionPrice(newPrice);
    }
  }, [selectedValue, select])


  return (
    <div className="selectServiceItem">
      <p>{label}</p>
      <div className="selectService">
        <div className="selectService__left">
          <CustomSelect selectedValue={selectedValue} changeSelectedValue={changeSelectedValue} values={valuesForSelect} />
          <button>
            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11L18 11" stroke="#8F9AA5" stroke-width="2" stroke-linecap="round" />
              <path d="M10.5 18.5L10.5 3.5" stroke="#8F9AA5" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div className="selectService__right">
          <PlusMinusHandler />
          <p>{optionPrice}.00 €</p>
        </div>
      </div>
    </div>
  );
}
