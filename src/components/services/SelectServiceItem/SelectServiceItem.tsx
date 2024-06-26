import React, { useCallback, useMemo, useState } from "react";
import "./SelectServiceItem.scss";
import { DropdownServices, IndividualService, ServiceSpecific } from "../../../types/calculator-types";
import { CustomSelect } from "../../Inputs/CustomSelect";
import classNames from "classnames";

interface Props {
  services: DropdownServices
  addSelectedService: (selectObject: IndividualService) => void
}

const defaultOption: IndividualService = {
  title: 'Выберете вариант',
  price: 0,
  count: 0,
  specific: ServiceSpecific.Select,
  angebotSection: "",
  appSection: ""
}

export const SelectServiceItem: React.FC<Props> = React.memo(({ services, addSelectedService }) => {
  const [selectedOption, setSelectedOption] = useState<IndividualService>(defaultOption);

  const { label, options } = services;
  const valuesForCustomSelect = useMemo(() => options.map(obj => obj.title), [options]);

  const changeSelectedValue = useCallback((newValue: string) => {
    const selectedService = options.find(s => s.title === newValue) || defaultOption;
    setSelectedOption(selectedService);
  }, [options]);

  const handleAddServiceClick = useCallback(() => {
    addSelectedService({ ...selectedOption, count: 1 });
    setSelectedOption(defaultOption);
  }, [selectedOption, addSelectedService]);

  return (
    <div className="selectServiceItem">
      {label && <p className="label">{label}</p>}
      <div className="selectService">
        <div className="selectService__left">
          <CustomSelect
            width={460}
            selectedValue={selectedOption.title}
            changeSelectedValue={changeSelectedValue}
            values={valuesForCustomSelect}
          />
          <button
            className={classNames("button__add", { add: selectedOption !== defaultOption })}
            disabled={selectedOption === defaultOption}
            onClick={handleAddServiceClick}>
            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11L18 11" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
              <path d="M10.5 18.5L10.5 3.5" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="selectService__right">
          <p className="service_price">{selectedOption.price}.00 €</p>
        </div>
      </div>
    </div>
  );
})