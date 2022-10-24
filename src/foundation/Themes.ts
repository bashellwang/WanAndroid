import {DefaultTheme} from '@react-navigation/native';

export default {
  MyTheme: {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  },
  GreenTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'green',
      notification: 'green',
    },
  },
  TomatoTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      notification: 'tomato',
    },
  },
};
