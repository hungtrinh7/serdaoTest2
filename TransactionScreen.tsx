import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {useTransactions} from './contexts/TransactionContext';
import {useBeneficiaries} from './contexts/beneficiaryContext';
import {RootStackParamList} from './interfaces/Navigation';
import SelectDropdown from 'react-native-select-dropdown';
import {StackNavigationProp} from '@react-navigation/stack';

type TransactionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TransactionScreen'
>;

type Props = {
  navigation: TransactionScreenNavigationProp;
};

const TransactionScreen = ({navigation}: Props) => {
  const [amount, setAmount] = useState<string>('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary>();
  const {addTransaction} = useTransactions();
  const {beneficiaries} = useBeneficiaries();

  const handleTransaction = () => {
    if (selectedBeneficiary === undefined) {
      alert('Please add a beneficiary');
      return;
    }
    addTransaction(amount, selectedBeneficiary);
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {beneficiaries.length > 0 ? (
        <>
          <Text
            style={{
              fontSize: 20,
              marginVertical: 8,
            }}>
            Transaction
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              width: '80%',
              marginVertical: 8,
            }}
            onChangeText={setAmount}
            value={amount}
            keyboardType="numeric"
            placeholder="Enter amount"
          />

          <SelectDropdown
            data={beneficiaries}
            onSelect={(selectedItem, index) => {
              setSelectedBeneficiary(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
              const defaultTextSelect =
                (selectedItem &&
                  selectedItem.lastname + ' ' + selectedItem.firstname) ||
                'Select a beneficiary';
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {defaultTextSelect}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
                  <Text style={styles.dropdownItemTxtStyle}>
                    {item.firstname} {item.lastname}
                    {'\n'}
                    <Text style={styles.dropdownItemSubTxt}>{item.iban}</Text>
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
          <Button title="Submit Transaction" onPress={handleTransaction} />
        </>
      ) : (
        <>
          <Text>Please add a beneficiary before transaction!</Text>
          <Button
            title="Add Beneficiary"
            onPress={() => navigation.navigate('BeneficiaryScreen')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemSubTxt: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default TransactionScreen;
