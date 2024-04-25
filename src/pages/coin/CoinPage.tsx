import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import useBookmark from '../../hooks/useBookmark';
import Loader from '../../components/loader';
import { useState, type ChangeEvent } from 'react';
import useCurrencyType from '../../hooks/useCurrencyType';
import {
  Arrow,
  Block,
  CoinInfo,
  CoinInfoContent,
  CoinInfoLabel,
  CoinInfoWrapper,
  CurrentPrice,
  CurrentPriceWrapper,
  Description,
  DescriptionTitle,
  DescriptionWrapper,
  ExchangeBackground,
  ExchangeInfo,
  ExchangeWrapper,
  FlexBox,
  Input,
  MarketCapFlexBox,
  MarketCapWrapper,
  MarketDataWrapper,
  Percentage,
  Select,
  TitleWrapper,
} from './CoinPage.css';
import type { Coin } from '../../types';
import BookmarkIcon from '../../components/bookmark-icon';

const CoinPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { currencyType, onChangeCurrencyType } = useCurrencyType();
  const { bookmarkData, onClickBookmark } = useBookmark();

  const [isOpen, setIsOpen] = useState(false);
  const [cryptoCurrency, setCryptoCurrency] = useState<string>();
  const [currency, setCurrency] = useState<number>();

  const { isLoading, data } = useQuery({
    queryKey: [`/coins/${id}`],
    queryFn: async () => {
      const { data } = await axios.get<Coin>(`https://api.coingecko.com/api/v3/coins/${id}`, {
        params: {
          tickers: false,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      });
      return data;
    },
  });

  const locale = currencyType === 'krw' ? 'ko' : 'en';

  const onClickDescription = () => setIsOpen(!isOpen);

  const onChangeCryptoCurrency = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');

    if (value.split('.')[1]?.length > 8) return false;

    const price = data!.market_data.current_price[currencyType];
    setCryptoCurrency(value);
    setCurrency(+value * price);
  };

  const onChangeCurrency = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value.replace(/,/g, '');

    if (isNaN(value)) return false;

    if (value === 0) {
      setCryptoCurrency(undefined);
      return setCurrency(undefined);
    }

    const price = data!.market_data.current_price[currencyType];

    // 표현 가능한 범위가 아닌 경우
    if ((value / price).toString().includes('e-')) {
      setCryptoCurrency('0');
    } else {
      setCryptoCurrency(value ? (value / price).toFixed(8) : undefined);
    }
    setCurrency(value);
  };

  return isLoading || !data ? (
    <Loader />
  ) : (
    <Block>
      <FlexBox>
        <TitleWrapper>
          <BookmarkIcon
            data={{
              id: id!,
              name: data.name,
              symbol: data.symbol,
              current_price: data.market_data.current_price[currencyType],
              price_change_percentage_1h_in_currency:
                data.market_data.price_change_percentage_1h_in_currency[currencyType],
              price_change_percentage_24h_in_currency:
                data.market_data.price_change_percentage_24h_in_currency[currencyType],
              price_change_percentage_7d_in_currency:
                data.market_data.price_change_percentage_7d_in_currency[currencyType],
              total_volume: data.market_data.total_volume[currencyType],
              market_cap_rank: data.market_cap_rank,
            }}
            bookmarkData={bookmarkData}
            onClickBookmark={onClickBookmark}
          />
          <img src={data.image.small} />

          <h1>
            {data.localization[locale]} ({data.symbol.toLocaleUpperCase()})
          </h1>
        </TitleWrapper>
        <Select value={currencyType} onChange={(e) => onChangeCurrencyType(e.target.value as 'krw' | 'usd')}>
          <option value="krw">KRW 보기</option>
          <option value="usd">USD 보기</option>
        </Select>
      </FlexBox>

      <FlexBox>
        <CoinInfoWrapper>
          <CoinInfo>
            <CoinInfoLabel>시가총액 Rank</CoinInfoLabel>
            <CoinInfoContent>Rank # {data.market_cap_rank}</CoinInfoContent>
          </CoinInfo>

          <CoinInfo>
            <CoinInfoLabel>웹사이트</CoinInfoLabel>
            <CoinInfoContent>
              <Link to={data.links.homepage[0]} target="_blank">
                {data.links.homepage[0]}
              </Link>
            </CoinInfoContent>
          </CoinInfo>
        </CoinInfoWrapper>

        <MarketDataWrapper>
          <CurrentPriceWrapper>
            <CurrentPrice>
              {currencyType === 'krw' ? '₩' : '$'}
              {data.market_data.current_price[currencyType].toLocaleString()}
            </CurrentPrice>
            <Percentage status={Math.sign(data.market_data.price_change_percentage_1h_in_currency[currencyType])}>
              {data.market_data.price_change_percentage_1h_in_currency[currencyType].toFixed(1)}%
            </Percentage>
          </CurrentPriceWrapper>

          <MarketCapFlexBox>
            <MarketCapWrapper>
              <div>
                <div>시가총액</div>
                {currencyType === 'krw' ? '₩' : '$'}
                {data.market_data.market_cap[currencyType].toLocaleString()}
              </div>
            </MarketCapWrapper>

            <MarketCapWrapper>
              <div>
                <div>24시간 거래대금</div>
                {currencyType === 'krw' ? '₩' : '$'}
                {data.market_data.market_cap[currencyType].toLocaleString()}
              </div>
            </MarketCapWrapper>
          </MarketCapFlexBox>
        </MarketDataWrapper>
      </FlexBox>

      <ExchangeBackground>
        <h3>가격 계산</h3>

        <ExchangeWrapper>
          <ExchangeInfo>
            <CoinInfoLabel>{data.symbol.toLocaleUpperCase()}</CoinInfoLabel>
            <Input type="number" value={cryptoCurrency ?? ''} onChange={onChangeCryptoCurrency} />
          </ExchangeInfo>

          <Arrow>⬌</Arrow>

          <ExchangeInfo>
            <CoinInfoLabel>{currencyType.toLocaleUpperCase()}</CoinInfoLabel>
            <Input value={currency?.toLocaleString() ?? ''} onChange={onChangeCurrency} />
          </ExchangeInfo>
        </ExchangeWrapper>
      </ExchangeBackground>

      {data.description[locale] && (
        <FlexBox>
          <DescriptionWrapper>
            <DescriptionTitle onClick={onClickDescription}>
              설명 보기
              <span>{isOpen ? '▲' : '▼'}</span>
            </DescriptionTitle>
            {isOpen && <Description>{data.description[locale]}</Description>}
          </DescriptionWrapper>
        </FlexBox>
      )}
    </Block>
  );
};

export default CoinPage;
