import React, { KeyboardEvent, useRef } from "react";
import "./PlusMinusHandler.scss";

interface Props {
  priceСount: number
  setPriceСount: (value: number | ((prev: number) => number)) => void;
  selectedValue?: string
}

export const PlusMinusHandler: React.FC<Props> = React.memo(
  ({ priceСount, setPriceСount, selectedValue }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = +e.target.value;
      if (isNaN(inputValue)) {
        setPriceСount(0);
        return
      }

      if (inputValue < 0) {
        setPriceСount(0);
        return
      }

      else {
        setPriceСount(inputValue);
      }
    };

    const decrement = () => {
      selectedValue !== 'Выберете вариант' &&
        setPriceСount(prev => prev > 0 ? prev - 1 : prev)
    }

    const increment = () => {
      selectedValue !== 'Выберете вариант' &&
        setPriceСount(prev => prev + 1)
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (inputRef.current?.value) {
          setPriceСount(+inputRef.current?.value);
          inputRef.current.blur();
        }
      }
    };

    return (
      <div className="plusMinusHandler">
        <button className="buttonHandler" onClick={decrement}>
          <svg width="17" height="2" viewBox="0 0 17 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L16 1" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <input
          disabled={selectedValue === 'Выберете вариант'}
          value={priceСount === 0 ? "" : priceСount}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          type="number"
          ref={inputRef}
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
)
