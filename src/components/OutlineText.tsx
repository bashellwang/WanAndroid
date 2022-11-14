import {FC} from 'react';
import * as React from 'react';
import {Text} from 'react-native';

export const OutlineTextColorTheme = {
  green: '#009a61',
  red: '#f56a6b',
  blue: '#207ab6',
};

export interface OutlineTextProps {
  colorTheme?: string;
  text?: string;
  fontSize?: number;
  justifyContent?: string;
  alignItems?: string;
  marginLeft?: number;
  marginRight?: number;
  paddingLeft?: number;
  paddingRight?: number;
  borderWidth?: number;
}

export default function OutlineText(props: OutlineTextProps): FC {
  let defaultProps: OutlineTextProps = {
    colorTheme: 'black',
    text: 'default',
    fontSize: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    borderWidth: 0.5,
  };

  let targetProps = Object.assign({}, defaultProps, props);

  return (
    <Text
      style={{
        ...targetProps,
        color: targetProps.colorTheme,
        borderColor: targetProps.colorTheme,
      }}>
      {targetProps.text}
    </Text>
  );
}
