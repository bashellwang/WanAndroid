import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useState} from 'react';

const FOOT_STATUS = {
  HIDE: 0,
  NO_MORE: 1,
  IS_LOADING_MORE: 2,
};

interface Props {
  refreshData: () => void;
  loadMoreData: () => void;
  renderItem: () => void;
}

/**
 * TODO 暂不可使用
 * @param refreshData
 * @param loadMoreData
 * @param renderItem
 * @constructor
 */
export const GeneralFlatLiat: React.FC<Props> = ({
  refreshData,
  loadMoreData,
  renderItem,
}) => {
  const [articleList, setArticleList] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showFoot, setShowFoot] = useState(FOOT_STATUS.HIDE);

  return (
    <View style={style.container}>
      <FlatList
        data={articleList}
        renderItem={data => renderItem(data)}
        refreshControl={
          <RefreshControl
            title={'xxx'}
            colors={['red']}
            tintColor={'blue'}
            refreshing={isRefreshing}
            onRefresh={() => {
              refreshData(isRefreshing);
            }}
          />
        }
        ListFooterComponent={() => _renderFooter()}
        onEndReached={() => {
          loadMoreData();
        }}
      />
    </View>
  );

  function _renderFooter() {
    if (showFoot === FOOT_STATUS.NO_MORE) {
      return (
        <View style={style.footer}>
          <Text style={{color: 'red'}}>没有更多数据...</Text>
        </View>
      );
    } else if (showFoot === FOOT_STATUS.IS_LOADING_MORE) {
      return (
        <View style={style.footer}>
          <ActivityIndicator
            size="small"
            animating={true}
            style={style.indicator}
            color={'red'}
          />

          <Text style={{color: 'red'}}>正在加载更多数据...</Text>
        </View>
      );
    } else if (showFoot === FOOT_STATUS.HIDE) {
      return null;
    } else {
      return null;
    }
  }
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
    backgroundColor: 'grey',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    alignItems: 'center', //布局对齐方式
    justifyContent: 'center', //内容居中
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
