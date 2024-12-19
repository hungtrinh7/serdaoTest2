import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: any, key: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("error while saving data", e);
  }
};

export const storeDataObject = async (value: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("error while saving data", e);
  }
};
