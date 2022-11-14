import {FC} from 'react';
import * as React from 'react';
import OutlineText from './OutlineText';
import {View} from 'react-native';

export interface ItemInfo {
  text: string;
  color?: string;
}

export interface OutlineTextListProps {
  dataList: ItemInfo[];
}

const TAG = '[OutlineTextList] ';
export default function OutlineTextList(props: OutlineTextListProps): FC {
  let dataList: ItemInfo[] = props.dataList as ItemInfo[];

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
      {dataList.map((itemInfo, index) => {
        let marginLeftValue: number;
        if (index > 0) {
          marginLeftValue = 5;
        }
        return (
          <OutlineText
            text={itemInfo.text}
            colorTheme={itemInfo.color}
            marginLeft={marginLeftValue}
          />
        );
      })}
    </View>
  );
}
