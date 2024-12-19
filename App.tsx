import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BeneficiaryProvider} from './contexts/beneficiaryContext';
import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import BeneficiaryScreen from './BeneficiaryScreen';
import {TransactionProvider} from './contexts/TransactionContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <BeneficiaryProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="TransactionScreen"
              component={TransactionScreen}
            />
            <Stack.Screen
              name="BeneficiaryScreen"
              component={BeneficiaryScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BeneficiaryProvider>
    </TransactionProvider>
  );
};

export default App;
