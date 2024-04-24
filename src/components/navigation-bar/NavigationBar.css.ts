import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Block = styled.div`
  display: flex;
  background-color: #dcdcdc;
  padding: 10px;
`;

export const Menu = styled(Link)<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 60px;
  cursor: pointer;
  font-size: 28px;
  font-weight: 600;
  color: gray;

  ${(props) =>
    props.selected && {
      color: '#000',
      backgroundColor: '#fff',
      borderRadius: '8px',
    }};
`;
