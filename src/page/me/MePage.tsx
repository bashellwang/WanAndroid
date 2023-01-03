import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PureComponent} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../foundation/constant/Color';
import SimpleListInfoItem from '../../components/SimpleListInfoItem';

export default function MePage(): PureComponent {
  return (
    <View style={pageStyle.container}>
      <View
        style={{
          flex: 3.5,
          backgroundColor: Color.green,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={'person-circle'} size={70} color={Color.white} />
        <Text style={pageStyle.title} numberOfLines={1}>
          还没有登录
        </Text>
      </View>
      <View
        style={{
          flex: 6.5,
        }}>
        <SimpleListInfoItem
          text={'收藏夹'}
          img={'heart-outline'}
          onPress={() => {
            alert('To Be Continued');
          }}
        />
        <SimpleListInfoItem
          text={'关于'}
          img={'information-circle-outline'}
          onPress={() => {
            alert('To Be Continued');
          }}
        />
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    color: Color.white,
    fontSize: 14,
  },
});
