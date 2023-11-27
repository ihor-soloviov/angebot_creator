import React, { useState } from "react";
import "./SearchInput.scss";
import classNames from "classnames";

export const SearchInput: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const handleSelect = (id: string) => {
    setIsOpen(false);
    setSelectedId(id)
  }
  return (
    <div className="searchInput__block">
      <input className="searchInput" type="text" placeholder={selectedId || "Введите ID клиента"} />
      <div className={classNames("customSelect__dropdown", { isOpened: isOpen })}>
        {searchResults.map(type => (
          <p key={type} onClick={() => handleSelect(type)}>{type}</p>
        ))}
      </div>
    </div>
  );
}
