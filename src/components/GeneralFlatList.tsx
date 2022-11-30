import * as React from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Themes from '../foundation/constant/Theme';
import {FlatListProps} from 'react-native';

// type 声明联合类型
type GeneralFlatListProps =
  | FlatListProps
  | {
      refreshing?: boolean;
      onRefresh?: () => void;
    };

export default function GeneralFlatList(props: GeneralFlatListProps): React.FC {
  // 是否展示置顶按钮
  const [isShowTop, setIsShowTop] = useState(false);

  function handleScrollToTop() {
    this._flatList && this._flatList.scrollToIndex({viewPosition: 0, index: 0});
  }

  function _onScroll(e) {
    const scrollY = e.nativeEvent.contentOffset.y;
    if (scrollY > Dimensions.get('window').height) {
      setIsShowTop(true);
    } else {
      setIsShowTop(false);
    }
  }

  return (
    <View style={style.container}>
      <FlatList
        ref={flatList => {
          this._flatList = flatList;
        }}
        onScroll={_onScroll}
        refreshControl={
          <RefreshControl
            title={'loading...'}
            colors={[Themes.GreenTheme.colors.primary]}
            tintColor={Themes.GreenTheme.colors.primary}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        }
        {...props}
      />
      {isShowTop ? (
        <TouchableWithoutFeedback onPress={handleScrollToTop}>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent', //Android view 设置时处理父容器布局及样式
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 1,
                backgroundColor: Themes.GreenTheme.colors.primary,
              }}>
              <Icon name={'arrow-up'} size={30} color="white" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
});
