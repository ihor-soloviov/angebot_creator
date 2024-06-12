import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./PriceInput.scss";
import { updateServicePrice } from "../../../api/fetch";
import { IndividualService } from "../../../types/calculator-types";

interface Props {
  item: IndividualService,
  currentPrice: number,
  showSuccess: () => void,
}

const PriceInput: React.FC<Props> = React.memo(
  ({ item, currentPrice, showSuccess }) => {
    const formattedCurrentPrice = currentPrice.toFixed(2);
    const [price, setPrice] = useState<string>('');
    const [isPriceShown, setIsPriceShown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.replace(/[^0-9.]/g, '');
      setPrice(value);
    };

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
      if (!item.id) {
        return
      }

      const numericPrice = parseFloat(price);
      if (!isNaN(numericPrice)) {
        setPrice(numericPrice.toFixed(2));
        showSuccess()
        updateServicePrice(item, numericPrice)
      } else {
        setPrice('');
      }
    };

    const handleFocus = () => setIsPriceShown(true);

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
)

export default PriceInput
