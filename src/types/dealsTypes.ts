export interface UserData {
  id: number;
  home: string;
  name: string;
  tel: string;
  email: string;
  code: string;
  city: string;
}

export interface SellerData {
  name: string;
  email: string;
  tel: string;
}

export interface SearchResult {
  userData: UserData;
  sellerData: SellerData;
}