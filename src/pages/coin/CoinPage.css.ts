import styled from '@emotion/styled';

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Select = styled.select`
  font-size: 15px;
  border: none;
  outline: none;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CoinInfoWrapper = styled.div`
  width: 50%;
`;

export const CoinInfo = styled.div`
  display: flex;
  border: 1px solid #d3d3d3;

  :last-child {
    border-top: none;
  }
`;

export const CoinInfoLabel = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #f0f0f0;
  font-weight: bold;
  font-size: 18px;
`;

export const CoinInfoContent = styled.div`
  padding: 20px;
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
`;

export const DescriptionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 20px;
  border-bottom: 1px solid #d3d3d3;
  cursor: pointer;
`;

export const Description = styled.div`
  margin: 20px 0;
  white-space: break-spaces;
`;

export const Arrow = styled.div`
  font-size: 50px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  padding: 20px;
  width: 70%;
  text-align: right;
  font-size: 17px;
`;

export const ExchangeBackground = styled.div`
  padding: 40px 20px 50px;
  background-color: #d3d3d3;
`;

export const ExchangeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;

export const ExchangeInfo = styled(CoinInfo)`
  width: 45%;
  :last-child {
    border-top: 1px solid #d3d3d3;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const MarketDataWrapper = styled(CoinInfoWrapper)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const CurrentPriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
`;

export const CurrentPrice = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export const Percentage = styled.div<{ status: number }>`
  color: ${(props) => {
    if (props.status === -1) {
      return '#3c75df';
    } else if (props.status === 0) {
      return '#000';
    } else {
      return '#e45a5a';
    }
  }};
`;

export const MarketCapFlexBox = styled.div`
  display: flex;
`;

export const MarketCapWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  text-align: right;
`;
