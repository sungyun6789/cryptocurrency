import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookmarkPage from './pages/bookmark';
import CoinPage from './pages/coin';
import MarketPage from './pages/market';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate replace to="/market" />,
  },
  {
    path: 'market',
    element: <MarketPage />,
  },
  {
    path: 'bookmark',
    element: <BookmarkPage />,
  },
  {
    path: 'coin?/:id',
    element: <CoinPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
