import { useEffect, useState } from 'react';

export type CurrencyType = 'krw' | 'usd';

const useCurrencyType = () => {
  const [currencyType, setCurrencyType] = useState<CurrencyType>('krw');

  useEffect(() => {
    const currency = localStorage.getItem('currencyType');
    if (currency) {
      return setCurrencyType(currency as CurrencyType);
    }

    localStorage.setItem('currencyType', 'krw');
    setCurrencyType('krw');
  }, []);

  const onChangeCurrencyType = (value: CurrencyType) => {
    localStorage.setItem('currencyType', value);
    setCurrencyType(value);
  };

  return { currencyType, onChangeCurrencyType };
};

export default useCurrencyType;
