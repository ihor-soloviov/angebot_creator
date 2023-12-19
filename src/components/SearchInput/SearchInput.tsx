import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { useDebounce } from "../../hooks/useDebounce";
import { fetchUserAndSellerData } from "../../api/deals";
import { SearchResult } from "../../types/dealsTypes";

import "./SearchInput.scss";

interface Props {
  setSelectedId: (value: string) => void
}

export const SearchInput: React.FC<Props> = ({ setSelectedId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const debouncedSearch = useDebounce(searchValue, 500);
  const selectValue = searchResult !== null ? searchResult.userData.id : "такого id не знайдено"

  useEffect(() => {
    if (debouncedSearch) {
      fetchUserAndSellerData(debouncedSearch, setIsOpen, setSearchResult)
    }
  }, [debouncedSearch])


  const handleSelect = (id: string) => {
    setIsOpen(false);
    setSelectedId(id)
  }


  return (
    <div className="searchInput__block">
      <input className="searchInput" onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder={searchValue || "Введите ID клиента"} />
      <div className={classNames("customSelect__dropdown", { isOpened: isOpen })}>
        <p onClick={() => {
          selectValue !== "такого id не знайдено" &&
            handleSelect(selectValue)
        }
        }>{selectValue}</p>
      </div>
    </div>
  );
}
