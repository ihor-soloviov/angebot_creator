import React, { useEffect } from "react";
import "./PlusMinusHandler.scss";
import { updateTotalPrice } from "../../utils/updateTotalPrice";

interface Props {
  priceСount: number
  setPriceСount: (value: number | ((prev: number) => number)) => void;
  setTotalPrice: (value: number) => void
}

export const PlusMinusHandler: React.FC<Props> = ({ priceСount, setPriceСount, setTotalPrice }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;
    if (!isNaN(inputValue)) {
      setPriceСount(inputValue);
    }

    else {
      setPriceСount(0);
    }
  };

  const decrement = () => {
    setPriceСount(prev => prev > 0 ? prev - 1 : prev)
  }

  const increment = () => {
    setPriceСount(prev => prev + 1)
  }

  useEffect(() => {
    updateTotalPrice(setTotalPrice);
  }, [priceСount, setTotalPrice]);

  return (
    <div className="plusMinusHandler">
      <button className="buttonHandler" onClick={decrement}>
        <svg width="17" height="2" viewBox="0 0 17 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L16 1" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <input
        value={priceСount === 0 ? "" : priceСount}
        onChange={handleInputChange}
        type="number"
      />
      <button className="buttonHandler" onClick={increment}>
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11L18 11" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
          <path d="M10.5 18.5L10.5 3.5" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
