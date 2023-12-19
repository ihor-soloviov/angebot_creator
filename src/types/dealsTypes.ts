export interface UserData {
  id: string;
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