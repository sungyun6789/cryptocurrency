import NavigationBar from '../../components/navigation-bar';
import MarketTable from '../../components/market-table';
import useBookmark from '../../hooks/useBookmark';
import useCurrencyType from '../../hooks/useCurrencyType';
import { Block } from './BookmarkPage.css';

const BookmarkPage = () => {
  const { currencyType } = useCurrencyType();
  const { bookmarkData, onClickBookmark } = useBookmark();

  const data = bookmarkData?.sort((a, b) => a.market_cap_rank - b.market_cap_rank);

  return (
    <Block>
      <NavigationBar />
      <MarketTable data={data} currencyType={currencyType} bookmarkData={data} onClickBookmark={onClickBookmark} />
    </Block>
  );
};

export default BookmarkPage;
