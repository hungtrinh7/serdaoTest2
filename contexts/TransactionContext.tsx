import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from "react";
import { storeData, storeDataObject } from "../lib/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TransactionContextInterface = {
  transactions: Transaction[];
  addTransaction: (amount: string, beneficiary: Beneficiary) => void;
  balance: number;
  setTransactions: (value: Array<Transaction>) => void;
  setBalance: (value: number) => void;
};

const TransactionContext = createContext<TransactionContextInterface>({
  transactions: [],
  addTransaction: () => {},
  balance: 1000,
  setTransactions: () => {},
  setBalance: () => {},
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }: PropsWithChildren) => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem("transactions");
        if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions));
        }

        const savedBalance = await AsyncStorage.getItem("balance");
        if (savedBalance) {
          setBalance(parseFloat(savedBalance));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données initiales :",
          error
        );
      }
    };

    fetchInitialData();
  }, []);

  const addTransaction = (
    amount: string,
    beneficiary: Beneficiary
  ): boolean => {
    const amountFloat = parseFloat(amount);

    if (balance < amountFloat) {
      console.error(`Fonds insuffisants pour effectuer cette transaction.`);
      return false; // Retourne false pour signaler l'échec
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      dateCreated: new Date(),
      amount: amountFloat,
      beneficiary,
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    setBalance((prevBalance) => {
      const newBalance = prevBalance - amountFloat;
      storeData(newBalance.toString(), "balance");
      return newBalance;
    });

    return true; // Transaction ok
  };

  useEffect(() => {
    const saveTransactions = async () => {
      try {
        await storeDataObject(transactions, "transactions");
        console.log("Transactions sauvegardées", transactions);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des transactions :", error);
      }
    };

    saveTransactions();
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
        setTransactions,
        setBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
