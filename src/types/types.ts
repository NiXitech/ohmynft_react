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
  referral: string;
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
  id: number;
  price: number;
  raffle_id: number;
  is_show: boolean;
  allow_air_drop: boolean;
  category: string;
  close_time: string;
  start_time: string;
  description: string;
  contract_address: string;
  participants: ParticipantItem[];
  prize: PrizeDataItem;
  price_structure: PriceStructureItem;
  max_entries_per_user: number;
  winner: WinnerInfo;
  total_entries: number;
  airdrop_users: [];
}

export interface PrizeDataItem {
  name: string;
  token_address: string;
  token_id: number;
  image_url: string;
  value: string;
}

export interface PriceStructureItem {
  price_in_busd: string;
  price_in_bnb: string;
}

export interface WinnerInfo {
  display_name: string;
  tx_hash: string;
  avatar: string;
}

export interface ActivityItem {
  category: string;
  entry_info: EntryCountParams;
  display_name: string;
  create_time: string;
  avatar: string;
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
  avatar: string;
}

export interface UserInfoData {
  address: string;
  created_at: string;
  email: string;
  avatar_url: string;
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
  avatar: string;
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

export interface summaryReferralsItem {
  last7Days: "0";
  lastMonth: "0";
  lifetime: "0";
  thisMonth: "0";
  today: "0";
  yesterday: "0";
}

export interface summaryReferrals {
  clicks: summaryReferralsItem;
  referrals: summaryReferralsItem;
  revenue: summaryReferralsItem;
}

export interface AccountUserInfo {
  name: string;
  address: string;
  email: string;
  marketing_notify: string;
  twitter_account: string;
  avatar: string;
}
