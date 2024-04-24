import type { Dispatch, SetStateAction } from 'react';
import { Block } from './MarketFilter.css';

type Props = {
  viewType: 'all' | 'bookmark';
  setViewType: Dispatch<SetStateAction<'all' | 'bookmark'>>;
  currencyType: 'krw' | 'usd';
  setCurrencyType: Dispatch<SetStateAction<'krw' | 'usd'>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
};

const MarketFilter = ({ viewType, setViewType, currencyType, setCurrencyType, pageSize, setPageSize }: Props) => {
  return (
    <Block>
      <select value={viewType} onChange={(e) => setViewType(e.target.value as 'all' | 'bookmark')}>
        <option value="all">전체보기</option>
        <option value="bookmark">북마크보기</option>
      </select>

      <select value={currencyType} onChange={(e) => setCurrencyType(e.target.value as 'krw' | 'usd')}>
        <option value="krw">KRW 보기</option>
        <option value="usd">USD 보기</option>
      </select>

      <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
        <option value={10}>10개 보기</option>
        <option value={30}>30개 보기</option>
        <option value={50}>50개 보기</option>
      </select>
    </Block>
  );
};

export default MarketFilter;
