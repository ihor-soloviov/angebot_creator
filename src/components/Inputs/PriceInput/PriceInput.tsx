import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./PriceInput.scss";

interface Props {
  currentPrice: number,
}

const PriceInput: React.FC<Props> = ({ currentPrice }) => {
  const formattedCurrentPrice = currentPrice.toFixed(2);
  const [price, setPrice] = useState<string>('');
  const [isPriceShown, setIsPriceShown] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setPrice(value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    formatAndSavePrice();
    setIsPriceShown(false)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      formatAndSavePrice();
      setIsPriceShown(false)
    }
  };

  const formatAndSavePrice = () => {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
      setPrice(numericPrice.toFixed(2));
      // Можна також додати виклик функції для збереження значення на сервер тут, якщо потрібно.
    } else {
      setPrice('');
    }
  };

  const handleFocus = () => {
    console.log('Інпут активний!');
    setIsPriceShown(true)
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);

    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
      }
    };
  }, []);


  return (
    <div className="priceInput">
      <input
        ref={inputRef}
        type="text"
        value={price ? price : ''}
        placeholder={`${formattedCurrentPrice}€`}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <p className={classNames("actualPrice", { shown: isPriceShown })}>{formattedCurrentPrice}€</p>
    </div>
  )
}

export default PriceInput
