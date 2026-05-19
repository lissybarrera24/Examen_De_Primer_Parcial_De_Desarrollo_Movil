import React, { createContext, useState } from 'react';

export const BancoContext = createContext();

export const BancoProvider = ({ children }) => {

  const [saldo, setSaldo] = useState(10000);

  const [transacciones, setTransacciones] = useState([]);

  const depositarSaldo = () => {
    setSaldo(saldo + 500);

    setTransacciones([
      ...transacciones,
      "Deposito de L.500"
    ]);
  };

  const transferirSaldo = (monto, destinatario) => {

    if (monto <= saldo) {

      setSaldo(saldo  - monto);

      setTransacciones([
        ...transacciones,
        `Transferencia de L.${monto} a ${destinatario}`
      ]);

      return true;

    } else {
      return false;
    }
  };

  return (
    <BancoContext.Provider
      value={{
        saldo,
        transacciones,
        depositarSaldo,
        transferirSaldo
      }}
    >
      {children}
    </BancoContext.Provider>
  );
};
