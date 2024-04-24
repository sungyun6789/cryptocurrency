import { useLocation } from 'react-router-dom';
import { Block, Menu } from './NavigationBar.css';

const router = [
  { name: '가상자산 시세 목록', path: '/market' },
  { name: '북마크 목록', path: '/bookmark' },
];

const NavigationBar = () => {
  const { pathname } = useLocation();

  return (
    <Block>
      {router.map((value) => (
        <Menu key={value.path} to={value.path} selected={pathname === value.path}>
          {value.name}
        </Menu>
      ))}
    </Block>
  );
};

export default NavigationBar;
