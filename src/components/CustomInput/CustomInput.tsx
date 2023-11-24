import React from "react";

import "./CustomInput.scss";

interface Props {
  placeholder: string
  img: string
  value: string | number
  setValue: (e: string) => void
}

export const CustomInput: React.FC<Props> = ({ placeholder, img, value, setValue }) => {
  return (
    <div className="customInput">
      <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder={placeholder} />
      <img src={img} alt="icon" />
    </div>
  );
}
