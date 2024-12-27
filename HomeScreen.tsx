import React from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {useTransactions} from './contexts/TransactionContext';
import {RootStackParamList} from './interfaces/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  const {transactions, balance} = useTransactions();

  const renderItem = ({item}: {item: Transaction}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id.toString()}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.beneficiary ? (
        <>
          <Text style={styles.itemText}>
            To: {item.beneficiary.lastname} {item.beneficiary.firstname}
          </Text>
          <Text style={styles.itemText}>IBAN: {item.beneficiary.iban}</Text>
        </>
      ) : (
        <Text style={styles.itemText}>No beneficiary</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance ? balance.toFixed(2) : '1000'}
      </Text>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('TransactionScreen')}
      />
      <Button
        title="Add Beneficiary"
        onPress={() => navigation.navigate('BeneficiaryScreen')}
      />
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        extraData={transactions} // Assure un rendu uniquement quand les données changent
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

export default HomeScreen;
