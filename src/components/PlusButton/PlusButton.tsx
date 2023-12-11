import React from "react";
import "./PlusButton.scss";

interface Props {
  handler: () => void
}

export const PlusButton: React.FC<Props> = ({ handler }) => {
  return (
    <button onClick={handler}>
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11L18 11" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
        <path d="M10.5 18.5L10.5 3.5" stroke="#8F9AA5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
