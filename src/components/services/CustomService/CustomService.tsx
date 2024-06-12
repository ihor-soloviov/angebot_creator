import React, { Dispatch, SetStateAction, useState } from "react";
import { IndividualService, ServiceSpecific } from "../../../types/calculator-types";
import "./CustomService.scss";

interface Props {
  setSingleServices?: Dispatch<SetStateAction<IndividualService[]>>
}

export const CustomService: React.FC<Props> = ({ setSingleServices }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);

  const addNewSingleService = () => {
    if (!setSingleServices) {
      return
    }
    if (title === "" || price === 0) {
      return
    }

    setSingleServices(
      (prev: IndividualService[]) => [...prev, { title, price, specific: ServiceSpecific.Single, count: 1 }]
    )
  }

  return (
    <div className="customService">
      <div className="left">
        <div className="customService__input">
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите свой вариант" />
        </div>
        <button
          onClick={addNewSingleService}>
          <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11L18 11" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
            <path d="M10.5 18.5L10.5 3.5" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="right">
        <input
          value={price === 0 ? "" : price}
          onChange={(e) => setPrice(+e.target.value)}
          className="customService__price"
          type="number"
          placeholder="Цена" />
      </div>
    </div>
  );
}
