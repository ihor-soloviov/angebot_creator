import React, { useEffect, useRef, useState } from "react";
import arr from "../../assets/selectArr.svg";
import "./CustomSelect.scss";
import classNames from "classnames";

interface Props {
  selectedValue: string
  changeSelectedValue: (newValue: string) => void
  values: string[]
}

export const CustomSelect: React.FC<Props> = ({ selectedValue, changeSelectedValue, values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSelect = (newValue: string) => {
    setIsOpen(false);
    changeSelectedValue(newValue)
  }

  const isPlaceholderSelected = selectedValue === 'Выберете тип предложения';

  return (
    <div className="customSelect__inner" ref={selectRef}>
      <div onClick={() => setIsOpen(prev => !prev)}
        className="customSelect">
        <p style={{ color: isPlaceholderSelected ? "#8f9aa5" : "black" }}>{selectedValue}</p>
        <img src={arr} alt="arrow" />
      </div>
      <div className={classNames("customSelect__dropdown", { isOpened: isOpen })}>
        {values.map(type => (
          <p key={type} onClick={() => handleSelect(type)}>{type}</p>
        ))}
      </div>
    </div>
  );
}
