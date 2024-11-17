import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const TaxContext = createContext<null | {
  takeHomePay?: string;
  setTaxValues: Dispatch<SetStateAction<{ takeHomePay: string } | null>>;
}>(null);

function TaxContextProvider({ children }: { children: JSX.Element }) {
  const [taxValues, setTaxValues] = useState<null | { takeHomePay: string }>(
    null
  );

  return (
    <TaxContext.Provider value={{ ...taxValues, setTaxValues }}>
      {children}
    </TaxContext.Provider>
  );
}

const useTaxContext = () => {
  const context = useContext(TaxContext);

  if (!context) {
    throw new Error("Trying to acess MyContext out of the Provider");
  }

  return context;
};

export { TaxContextProvider, useTaxContext };
