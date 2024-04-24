import { useSearchParams } from 'react-router-dom';

const CoinPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  return <div>코인 상세 페이지 {id}</div>;
};

export default CoinPage;
