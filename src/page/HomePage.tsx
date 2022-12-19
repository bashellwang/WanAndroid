import React, {FC, useEffect} from 'react';
import AppBottomTabsNavigator from '../navigator/AppBottomTabsNavigator';
import {Alert, BackHandler} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export default function HomePage(): FC<any, any> {
  const isFocused = useIsFocused();
  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return <AppBottomTabsNavigator />;
}
