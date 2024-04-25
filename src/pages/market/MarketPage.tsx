import axios from 'axios';
import MarketTable from '../../components/market-table';
import NavigationBar from '../../components/navigation-bar';
import { useQuery } from '@tanstack/react-query';
import type { Market } from '../../types';
import { useEffect, useState } from 'react';
import { MoreButton } from './MarketPage.css';
import MarketFilter from '../../components/market-filter';
import Loader from '../../components/loader';
import useBookmark from '../../hooks/useBookmark';
import useCurrencyType from '../../hooks/useCurrencyType';

const MarketPage = () => {
  const [list, setList] = useState<Market[]>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [viewType, setViewType] = useState<'all' | 'bookmark'>('all');
  const { currencyType, onChangeCurrencyType } = useCurrencyType();
  const { bookmarkData, onClickBookmark } = useBookmark();

  const { isLoading, data } = useQuery({
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

  const dataByViewType = viewType === 'all' ? list : bookmarkData;

  return (
    <>
      <NavigationBar />
      {isLoading || !dataByViewType ? (
        <Loader />
      ) : (
        <>
          <MarketFilter
            viewType={viewType}
            setViewType={setViewType}
            currencyType={currencyType}
            onChangeCurrencyType={onChangeCurrencyType}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
          <MarketTable
            data={dataByViewType}
            currencyType={currencyType}
            bookmarkData={bookmarkData}
            onClickBookmark={onClickBookmark}
          />
          {viewType === 'all' && <MoreButton onClick={onClickMore}>+ 더보기</MoreButton>}
        </>
      )}
    </>
  );
};

export default MarketPage;
