import {FC} from 'react';
import * as React from 'react';
import OutlineText, {OutlineTextColorTheme} from './OutlineText';
import {View} from 'react-native';

interface ListProps {
  textList?: string[];
}

const TAG = '[OutlineTextList] ';
export default function OutlineTextList(props: ListProps): FC {
  let strList: string[] = props.textList as string[];
  // let targetProps = Object.assign({}, defaultProps, props);
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
      }}>
      {strList.map((str, index) => {
        let marginLeftValue: number;
        if (index > 0) {
          marginLeftValue = 5;
        }
        return (
          <OutlineText
            text={str}
            colorTheme={OutlineTextColorTheme.red}
            marginLeft={marginLeftValue}
          />
        );
      })}
    </View>
  );
}
