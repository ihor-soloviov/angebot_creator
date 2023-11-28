import axios from "axios";
import { SearchResult } from "../types/dealsTypes";

export const fetchUserAndSellerData = async (
  debouncedSearch: string,
  setIsOpen: (value: boolean) => void,
  setSearchResult: (value: SearchResult | null) => void
) => {
  const data = await axios.get(
    `https://mailer.work-set.eu/deals/${debouncedSearch}`
  );

  if (data && Object.keys(data).length > 0) {
    setSearchResult(data.data);
  } else {
    setSearchResult(null);
  }
  setIsOpen(true);
};
