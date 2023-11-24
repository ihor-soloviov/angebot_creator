import React from "react";
import "./SearchInput.scss";

export const SearchInput: React.FC = () => {
  return (
    <input className="searchInput" type="text" placeholder="Введите ID клиента" />
  );
}
