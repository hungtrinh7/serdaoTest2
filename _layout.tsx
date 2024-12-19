import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './HomeScreen';
import {BeneficiaryProvider} from './contexts/beneficiaryContext';
import {TransactionProvider} from './contexts/TransactionContext';
import TransactionScreen from './TransactionScreen';
import BeneficiaryScreen from './BeneficiaryScreen';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <BeneficiaryProvider>
      <TransactionProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="TransactionScreen"
            component={TransactionScreen}
          />
          <Stack.Screen
            name="BeneficiaryScreen"
            component={BeneficiaryScreen}
          />
        </Stack.Navigator>
      </TransactionProvider>
    </BeneficiaryProvider>
  );
}
