import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Block = styled.div`
  .bookmark {
    display: flex;
    align-items: center;
    width: 5%;
  }

  .asset {
    display: flex;
    align-items: center;
    width: 40%;

    span {
      display: inline-block;
      width: 50%;
      padding: 0 10px;
    }
  }

  .price {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 15%;
    padding: 0 10px;
  }

  .change_percentage {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 10%;
    padding: 0 10px;
  }

  .volume_24h {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 30%;
    padding: 0 10px;
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  color: gray;
  background-color: #f0f0f0;
  font-weight: bold;

  .asset {
    padding: 0 10px;
  }
`;

export const Row = styled(Link)`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px;
  font-weight: bold;

  .symbol {
    font-weight: 400;
  }
`;

export const ChangePercentage = styled.div<{ status: number }>`
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
