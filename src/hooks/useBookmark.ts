import { useContext, useEffect, useState, type MouseEvent } from 'react';
import type { TableData } from '../types';
import { ToastContext } from '../contexts/ToastProvider';

const useBookmark = () => {
  const [bookmarkData, setBookmarkData] = useState<TableData[]>();
  const { setIsOpen, setMessage } = useContext(ToastContext);

  useEffect(() => {
    setBookmarkData(JSON.parse(localStorage.getItem('bookmark') ?? '[]'));
  }, []);

  const onClickBookmark = (e: MouseEvent<HTMLDivElement>, value: TableData) => {
    e.preventDefault();
    const isSameData = bookmarkData?.find((b) => b.id === value.id);
    const newData = isSameData ? bookmarkData?.filter((bmk) => bmk.id !== value.id) : [...(bookmarkData ?? []), value];
    localStorage.setItem('bookmark', JSON.stringify(newData));
    setBookmarkData(newData);
    setMessage(isSameData ? '북마크가 해제되었습니다.' : '북마크에 추가되었습니다.');
    setIsOpen(true);
  };

  return { bookmarkData, onClickBookmark };
};

export default useBookmark;
