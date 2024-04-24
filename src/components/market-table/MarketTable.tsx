import type { Market } from '../../types';
import { Block, ColumnWrapper, Row, ChangePercentage } from './MarketTable.css';

type Props = {
  data: Market[] | undefined;
  currencyType: 'krw' | 'usd';
};

const MarketTable = ({ data, currencyType }: Props) => {
  return (
    <Block>
      <ColumnWrapper>
        <div className="asset">자산</div>
        <div className="price">Price</div>
        <div className="change_percentage">1H</div>
        <div className="change_percentage">24H</div>
        <div className="change_percentage">7D</div>
        <div className="volume_24h">24H Volume</div>
      </ColumnWrapper>

      <div>
        {data?.map((value) => (
          <Row key={value.id} to={'/coin?id=' + value.id}>
            <div className="asset">
              <span>{value.name}</span>
              <span className="symbol">{value.symbol.toUpperCase()}</span>
            </div>

            <div className="price">
              {currencyType === 'krw' ? '₩' : '$'}
              {value.current_price.toLocaleString()}
            </div>

            <ChangePercentage
              className="change_percentage"
              status={Math.sign(value.price_change_percentage_1h_in_currency)}
            >
              {value.price_change_percentage_1h_in_currency.toFixed(1)}%
            </ChangePercentage>

            <ChangePercentage
              className="change_percentage"
              status={Math.sign(value.price_change_percentage_24h_in_currency)}
            >
              {value.price_change_percentage_24h_in_currency.toFixed(1)}%
            </ChangePercentage>

            <ChangePercentage
              className="change_percentage"
              status={Math.sign(value.price_change_percentage_7d_in_currency)}
            >
              {value.price_change_percentage_7d_in_currency.toFixed(1)}%
            </ChangePercentage>

            <div className="volume_24h">
              {currencyType === 'krw' ? '₩' : '$'}
              {value.total_volume.toLocaleString()}
            </div>
          </Row>
        ))}
      </div>
    </Block>
  );
};

export default MarketTable;
