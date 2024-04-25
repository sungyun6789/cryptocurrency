import { useContext, useEffect } from 'react';
import { ToastContext } from '../../contexts/ToastProvider';
import { Block } from './Toast.css';

const Toast = () => {
  const { isOpen, setIsOpen, message } = useContext(ToastContext);

  useEffect(() => {
    let timer: number;

    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return isOpen && <Block>{message}</Block>;
};

export default Toast;
