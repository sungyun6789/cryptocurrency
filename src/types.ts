export type Market = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export type TableData = Pick<
  Market,
  | 'id'
  | 'name'
  | 'symbol'
  | 'current_price'
  | 'price_change_percentage_1h_in_currency'
  | 'price_change_percentage_24h_in_currency'
  | 'price_change_percentage_7d_in_currency'
  | 'total_volume'
  | 'market_cap_rank'
>;

export type Coin = {
  market_cap_rank: number;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  name: string;
  symbol: string;
  description: {
    [key in 'ko' | 'en']?: string;
  };
  links: {
    homepage: string[];
  };
  market_data: {
    market_cap_change_percentage_24h: number;
    total_volume: {
      [key: string]: number;
    };
    current_price: {
      [key: string]: number;
    };
    price_change_percentage_1h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_24h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_7d_in_currency: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
  };
  localization: {
    [key: string]: string;
  };
};
