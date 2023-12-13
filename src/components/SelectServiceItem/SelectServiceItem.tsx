import React, { useEffect, useState } from "react";
import "./SelectServiceItem.scss";
import { SelectService } from "../Calculator/calculator-types";
import { CustomSelect } from "../CustomSelect";
import { PlusMinusHandler } from "../PlusMinusHandler";
import stepStore from "../../stores/step-store";

interface Props {
  service: SelectService
  index: number
  addNewSelectService?: (selectObject: SelectService) => void
  setTotalPrice: (value: number) => void
}

[{ "label": "Леса", "items": [{ "label": "Леса", "select": [{ "value": "<5m", "price": 400 }, { "value": "5m - 8m", "price": 500 }, { "value": ">8m", "price": 600 }], "selected": { "value": ">8m", "price": 600, "count": 3 } }, { "label": "Леса", "select": [{ "value": "<5m", "price": 400 }, { "value": "5m - 8m", "price": 500 }, { "value": ">8m", "price": 600 }], "selected": { "value": "5m - 8m", "price": 500, "count": 3 } }, { "label": "Леса", "select": [{ "value": "<5m", "price": 400 }, { "value": "5m - 8m", "price": 500 }, { "value": ">8m", "price": 600 }], "selected": { "value": "<5m", "price": 400, "count": 1 } }] }]

export const SelectServiceItem: React.FC<Props> = React.memo(({ service, addNewSelectService, index, setTotalPrice }) => {

  const [selectedValue, setSelectedValue] = useState(service.selected?.value || 'Выберете вариант');
  const [optionPrice, setOptionPrice] = useState(service.selected?.price || 0)
  const [priceСount, setPriceСount] = useState(service.selected?.count || 0);
  const [countedPrice, setCountedPrice] = useState(0)

  const { label, select } = service;
  const valuesForSelect = select.map(obj => obj.value);

  useEffect(() => {
    const newPrice = priceСount === 0 ? 0 : optionPrice * priceСount
    setCountedPrice(newPrice)
  }, [optionPrice, priceСount])

  const changeSelectedValue: (value: string) => void = (newValue) => {
    setSelectedValue(newValue)
  }

  useEffect(() => {
    if (selectedValue !== 'Выберете вариант') {
      const newPrice = select.find(el => el.value === selectedValue)?.price || 0;
      setOptionPrice(newPrice);
    }
  }, [selectedValue, select])


  return (
    <div className="selectServiceItem">
      {label && <p className="label">{label} {index + 1}</p>}
      <div className="selectService">
        <div className="selectService__left">
          <CustomSelect width={460} selectedValue={selectedValue} changeSelectedValue={changeSelectedValue} values={valuesForSelect} />
          <button className="button__add" onClick={() => {
            if (addNewSelectService) {
              addNewSelectService(service)
            }
          }}>
            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11L18 11" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
              <path d="M10.5 18.5L10.5 3.5" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="selectService__right">
          <PlusMinusHandler priceСount={priceСount} setPriceСount={setPriceСount} setTotalPrice={setTotalPrice} />
          <p className="service_price">{countedPrice}.00 €</p>
        </div>
      </div>
    </div>
  );
})