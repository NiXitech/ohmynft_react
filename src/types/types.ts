import { AxiosRequestConfig } from "axios";

export const TagColors: string[] = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

export interface HttpRequestParams {
  method: string;
  url: string;
  params?: any;
  config?: AxiosRequestConfig<{}>;
}

export interface RegistrationSignData {
  address: any;
  signature: string;
  message: any;
  verification_code: string;
}

export interface UserLoginData {
  address: any;
  signature: string;
  message: any;
}

export interface RegisterData {
  address: any;
  name: string;
  email: string;
}

export interface RegistrationCallBack {
  code: number;
  data: {
    registered: boolean;
    name?: string;
    email?: string;
  };
  message: string;
}

export interface GetNoticeListParams {
  page: number;
  page_size: number;
}

export interface CallBackData {
  code: number;
  message?: string;
  data: any;
}

export interface RaffleItemData {
  raffle_id: number;
  is_show: boolean;
  category: string;
  close_time: string;
  start_time: string;
  description: string;
  contract_address: string;
  participants: [];
  prize: PrizeDataItem;
  price_structure: PriceStructureItem[];
  max_entries_per_user: number;
  winner: WinnerInfo;
}

export interface PrizeDataItem {
  name: string;
  token_address: string;
  token_id: number;
  image_url: string;
  value: string;
}

export interface PriceStructureItem {
  entry_count: number;
  recommended: boolean;
  price: string;
}

export interface WinnerInfo {
  display_name: string;
  tx_hash: string;
}

export interface ActivityItem {
  category: string;
  entry_info: EntryCountParams;
  display_name: string;
  create_time: string;
}

export interface EntryCountParams {
  count: number;
  tx_hash: string;
}

export interface ParticipantCallback {
  count: number;
  items: ParticipantItem[];
}
export interface ParticipantItem {
  display_name: string;
  buy_entry_count: number;
}

export interface UserInfoData {
  address: string;
  created_at: string;
  email: string;
}

export interface WinnerItem {
  date: string;
  displayName: string;
  externalId: string;
  prize: WinnerPrizeDataItem;
}

export interface WinnerPrizeDataItem {
  raffle_id: number;
  name: string;
  token_address: string;
  token_id: number;
  image_url: string;
  value: string;
}

export interface AllActivityItem {
  category: string;
  display_name: string;
  entry_info: {
    count: number;
    tx_hash: string;
  };
  raffle_id: number;
  prize: {
    name: string;
    token_address: string;
    token_id: number;
    image_url: string;
    value: string;
  };
  nft_vale: string;
  win_tx: string;
  create_time: string;
}
