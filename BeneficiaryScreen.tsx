import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import {useBeneficiaries} from './contexts/beneficiaryContext';
import {RootStackParamList} from './interfaces/Navigation';
import * as IBAN from 'iban-ts';
import {StackNavigationProp} from '@react-navigation/stack';

type BeneficiaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BeneficiaryScreen'
>;

type Props = {
  navigation: BeneficiaryScreenNavigationProp;
};

const BeneficiaryScreen = ({navigation}: Props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [iban, setIban] = useState('');
  const {addBeneficiary, beneficiaries} = useBeneficiaries();

  const handleBeneficiary = () => {
    // check if Iban is valid before adding
    if (!IBAN.isValid(iban)) {
      alert('Invalid IBAN');
      return false;
    }
    addBeneficiary({
      id: Date.now(),
      firstname,
      lastname,
      iban,
    });
    navigation.goBack();
  };

  // render list
  const renderBeneficiary = ({item}: {item: Beneficiary}) => (
    <View style={styles.item}>
      {item && (
        <>
          <Text style={styles.itemText}>
            {item.lastname + ' ' + item.firstname}
          </Text>
          <Text style={styles.itemText}>IBAN: {item.iban}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          marginVertical: 8,
        }}>
        Add a beneficiary
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setFirstname}
        value={firstname}
        placeholder="Beneficiary firstname"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setLastname}
        value={lastname}
        placeholder="Beneficiary lastname"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Add new beneficiary" onPress={handleBeneficiary} />
      <FlatList
        data={beneficiaries}
        keyExtractor={item => item.id.toString()}
        renderItem={renderBeneficiary}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default BeneficiaryScreen;
