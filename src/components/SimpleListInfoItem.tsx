import * as React from 'react';
import Color from '../foundation/constant/Color';
import {PureComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SimpleListInfoItemProps {
  img?: string;
  text?: string;
  onPress?: () => void;
}

export default function SimpleListInfoItem(
  props: SimpleListInfoItemProps,
): PureComponent {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'row',
          // backgroundColor: 'red',
          alignItems: 'center',
          minHeight: 35,
        }}>
        <View
          style={{
            flex: 9,
            flexDirection: 'row',
            // backgroundColor: 'yellow',
          }}>
          <Icon
            name={props.img ? props.img : 'information-circle-outline'}
            size={20}
            color={Color.green}
          />
          <Text
            style={{color: Color.black, fontSize: 15, marginLeft: 10}}
            numberOfLines={1}>
            {props.text ? props.text : 'default'}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            // backgroundColor: 'blue',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={'chevron-forward-outline'} size={20} color={'grey'} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
