import React, { useState } from "react";
import "./PlusMinusHandler.scss";

export const PlusMinusHandler: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;
    if (!isNaN(inputValue)) {
      setCount(inputValue);
    }

    else {
      setCount(0);
    }
  };

  return (
    <div className="plusMinusHandler">
      <button onClick={() => setCount(prev => prev - 1)}>
        <svg width="17" height="2" viewBox="0 0 17 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L16 1" stroke="#8F9AA5" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <input
        value={count === 0 ? "" : count}
        onChange={handleInputChange}
        type="number"
      />
      <button onClick={() => setCount(prev => prev + 1)}>
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11L18 11" stroke="#8F9AA5" stroke-width="2" stroke-linecap="round" />
          <path d="M10.5 18.5L10.5 3.5" stroke="#8F9AA5" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  );
}
