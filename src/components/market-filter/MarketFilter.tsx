import type { Dispatch, SetStateAction } from 'react';
import { Block, Select } from './MarketFilter.css';
import type { CurrencyType } from '../../hooks/useCurrencyType';

type Props = {
  viewType: 'all' | 'bookmark';
  setViewType: Dispatch<SetStateAction<'all' | 'bookmark'>>;
  currencyType: CurrencyType;
  onChangeCurrencyType: (currency: CurrencyType) => void;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
};

const MarketFilter = ({ viewType, setViewType, currencyType, onChangeCurrencyType, pageSize, setPageSize }: Props) => {
  return (
    <Block>
      <Select value={viewType} onChange={(e) => setViewType(e.target.value as 'all' | 'bookmark')}>
        <option value="all">전체보기</option>
        <option value="bookmark">북마크보기</option>
      </Select>

      <Select value={currencyType} onChange={(e) => onChangeCurrencyType(e.target.value as CurrencyType)}>
        <option value="krw">KRW 보기</option>
        <option value="usd">USD 보기</option>
      </Select>

      <Select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
        <option value={10}>10개 보기</option>
        <option value={30}>30개 보기</option>
        <option value={50}>50개 보기</option>
      </Select>
    </Block>
  );
};

export default MarketFilter;
