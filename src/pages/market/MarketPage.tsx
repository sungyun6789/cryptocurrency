import axios from 'axios';
import MarketTable from '../../components/market-table';
import NavigationBar from '../../components/navigation-bar';
import { useQuery } from '@tanstack/react-query';
import type { Market } from '../../types';
import { useEffect, useState } from 'react';
import { MoreButton } from './MarketPage.css';
import MarketFilter from '../../components/market-filter';

const MarketPage = () => {
  const [list, setList] = useState<Market[]>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [currencyType, setCurrencyType] = useState<'krw' | 'usd'>('krw');
  const [viewType, setViewType] = useState<'all' | 'bookmark'>('all');

  const { data } = useQuery({
    queryKey: ['/coins/markets', page, pageSize],
    queryFn: async () => {
      const { data } = await axios.get<Market[]>('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: currencyType,
          per_page: pageSize,
          page: page,
          price_change_percentage: '1h,24h,7d',
        },
      });
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setList((l) => [...(l ?? []), ...data]);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
    setList(data);
  }, [currencyType, pageSize]);

  const onClickMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <NavigationBar />
      <MarketFilter
        viewType={viewType}
        setViewType={setViewType}
        currencyType={currencyType}
        setCurrencyType={setCurrencyType}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      <MarketTable data={list} currencyType={currencyType} />
      <MoreButton onClick={onClickMore}>+ 더보기</MoreButton>
    </>
  );
};

export default MarketPage;
