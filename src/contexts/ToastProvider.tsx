import { createContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

type ToastContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

export const ToastContext = createContext<ToastContextType>({
  isOpen: false,
  setIsOpen: () => undefined,
  message: '',
  setMessage: () => undefined,
});

interface Props {
  children: ReactNode;
}

const ToastProvier = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const value = { isOpen, setIsOpen, message, setMessage };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export default ToastProvier;
