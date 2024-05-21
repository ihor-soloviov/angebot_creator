import React from "react";
import "./CustomCheckbox.scss";
import classNames from "classnames";

interface Props {
  isChecked: boolean
  setIsChecked: (value: boolean) => void
}

export const CustomCheckbox: React.FC<Props> = ({ isChecked, setIsChecked }) => {

  return (
    <label className="customCheckbox">
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <span
        className={classNames("checkbox", { "active": isChecked })}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
      />
      Remember me!
    </label>
  );
}
