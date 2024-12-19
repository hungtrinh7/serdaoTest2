import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';

type BeneficiaryContextInterface = {
  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficiary: Beneficiary) => void;
  setBeneficiaries: React.Dispatch<React.SetStateAction<Beneficiary[]>>;
};

const BeneficiaryContext = createContext<BeneficiaryContextInterface>({
  beneficiaries: [],
  addBeneficiary: () => {},
  setBeneficiaries: () => {},
});

export const useBeneficiaries = () => useContext(BeneficiaryContext);

export const BeneficiaryProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  // Get stored data
  useEffect(() => {
    const loadBeneficiaries = async () => {
      try {
        const storedBeneficiaries = await AsyncStorage.getItem('beneficiaries');
        if (storedBeneficiaries) {
          setBeneficiaries(JSON.parse(storedBeneficiaries));
        }
      } catch (error) {
        console.error('Failed to load beneficiaries:', error);
      }
    };

    loadBeneficiaries();
  }, []);

  // Sauvegarde des données à chaque mise à jour
  useEffect(() => {
    const saveBeneficiaries = async () => {
      try {
        await AsyncStorage.setItem(
          'beneficiaries',
          JSON.stringify(beneficiaries),
        );
      } catch (error) {
        console.error('Failed to save beneficiaries:', error);
      }
    };

    saveBeneficiaries();
  }, [beneficiaries]);

  const addBeneficiary = (beneficiary: Beneficiary) => {
    const newBeneficiary = {
      id: Date.now(),
      firstname: beneficiary.firstname,
      lastname: beneficiary.lastname,
      iban: beneficiary.iban,
    };
    setBeneficiaries(prevBeneficiaries => [
      ...prevBeneficiaries,
      newBeneficiary,
    ]);
  };

  return (
    <BeneficiaryContext.Provider
      value={{beneficiaries, addBeneficiary, setBeneficiaries}}>
      {children}
    </BeneficiaryContext.Provider>
  );
};
