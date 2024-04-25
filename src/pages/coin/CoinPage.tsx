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
  BookmarkIcon,
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

const CoinPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { currencyType, onChangeCurrencyType } = useCurrencyType();
  const { bookmarkData, onClickBookmark } = useBookmark();
  const isBookmark = !!bookmarkData?.find((b) => b.id === id);

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
            onClick={(e) =>
              onClickBookmark(e, {
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
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              width="30"
              height="30"
              viewBox="0 0 1280.000000 1222.000000"
            >
              <g transform="translate(0.000000,1222.000000) scale(0.100000,-0.100000)">
                <path
                  fill={isBookmark ? '#ffd440' : '#d3d3d3'}
                  d="M6273 12205 c-115 -32 -205 -96 -266 -187 -19 -29 -304 -602 -635 -1273 -330 -671 -719 -1461 -864 -1755 l-264 -535 -220 -32 c-3672 -539 -3667 -538 -3722 -557 -100 -35 -199 -123 -248 -219 -76 -148 -69 -309 18 -454 23 -37 448 -457 1450 -1430 1270 -1233 1418 -1380 1413 -1403 -2 -14 -39 -223 -80 -465 -42 -242 -111 -645 -155 -895 -43 -250 -124 -718 -180 -1040 -56 -322 -135 -778 -176 -1015 -90 -512 -92 -552 -30 -680 102 -216 358 -320 574 -233 31 13 836 432 1788 931 l1731 906 804 -420 c442 -231 1223 -640 1734 -907 512 -268 953 -495 980 -504 63 -22 202 -23 268 -3 111 33 228 129 277 225 29 57 50 146 50 212 0 32 -41 292 -90 578 -138 795 -261 1506 -371 2145 -56 319 -124 716 -153 882 l-52 303 1422 1392 c965 944 1432 1408 1453 1442 43 71 62 130 68 211 16 208 -126 413 -324 468 -32 9 -379 61 -770 117 -392 55 -1034 145 -1425 200 -392 56 -868 123 -1058 150 -190 26 -419 58 -510 71 -91 12 -170 27 -177 33 -6 6 -399 799 -873 1761 -473 963 -877 1774 -898 1804 -44 65 -131 131 -210 161 -74 29 -207 36 -279 15z"
                />
              </g>
            </svg>
          </BookmarkIcon>

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
