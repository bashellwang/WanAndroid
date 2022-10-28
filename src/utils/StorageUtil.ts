import AsyncStorage from '@react-native-async-storage/async-storage';
const TAG = '[Storage] ';
const saveValue = async (
  key: string,
  value: string,
  callback?: (error: Error | null) => void,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
    if (callback) {
      callback(null);
    }
  } catch (e) {
    let err = new Error(e as string);
    console.log(TAG + 'err: ' + err);
    if (callback) {
      callback(err);
    }
    throw err;
  }
};

const getValue = async (
  key: string,
  callback?: (error: Error | null, result: string | null) => void,
): Promise<string | null> => {
  let result;
  try {
    result = await AsyncStorage.getItem(key);
    if (callback) {
      callback(null, result);
    }
    return result;
  } catch (e) {
    let err = new Error(e as string);
    console.log(TAG + 'err: ' + err);
    if (callback) {
      callback(err, null);
    }
    throw err;
  }
};

const deleteValue = async (
  key: string,
  callback?: (error: Error | null) => void,
): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
    if (callback) {
      callback(null);
    }
  } catch (e) {
    let err = new Error(e as string);
    console.log(TAG + 'err: ' + err);
    if (callback) {
      callback(err);
    }
    throw err;
  }
};

export default class StorageUtil {
  static async saveValue(
    key: string,
    value: string,
    callback?: (error: Error | null) => void,
  ): Promise<void> {
    return saveValue(key, value, callback);
  }
  static async getValue(
    key: string,
    callback?: (error: Error | null, result: string | null) => void,
  ): Promise<string | null> {
    return getValue(key, callback);
  }

  static async deleteValue(
    key: string,
    callback?: (error: Error | null) => void,
  ): Promise<void> {
    return deleteValue(key, callback);
  }
}
