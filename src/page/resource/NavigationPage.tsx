import * as React from 'react';
import {
  FlatList,
  Platform,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PureComponent, useEffect, useRef, useState} from 'react';
import LogUtil from '../../foundation/util/LogUtil';
import HttpUtil from '../../foundation/util/HttpUtil';
import {ApiUrl} from '../../foundation/network/ApiUrl';
import ApiResponse from '../../foundation/network/ApiResponse';
import {WebNaviInfo} from '../../model/bean/WebNaviInfo';
import Color from '../../foundation/constant/Color';
import SimpleArticleInfoCard from '../../components/SimpleArticleInfoCard';
import {RouterConst} from '../../foundation/constant/RouterConst';

const TAG = '[NavigationPage] ';

/**
 * 网站导航页
 * 级联列表参考：
 * https://juejin.cn/post/7075971648343506975
 * https://blog.csdn.net/weixin_46025371/article/details/122517795
 */
export default function NavigationPage({navigation}): PureComponent {
  const FLATLIST_ITEM_HEIGHT = 40;
  const FLATLIST_DIVIDER_HEIGHT = 1;
  const SECTION_LIST_DIVIDER_HEIGHT = 1;
  const SECTION_LIST_ITEM_HEIGHT = 60;

  const [allData, setAllData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionListRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    getNavigation();
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={allData}
          renderItem={_renderFlatListItem}
          keyExtractor={item => item.cid}
          // 隐藏垂直滚动条
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={Platform.OS === 'android'}
          getItemLayout={(data, index) => ({
            length: FLATLIST_ITEM_HEIGHT,
            offset: FLATLIST_ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
      <View style={{flex: 2.5}}>
        <SectionList
          ref={sectionListRef}
          sections={allData}
          renderItem={_renderSectionListItem}
          renderSectionHeader={_renderSectionHeader}
          keyExtractor={item => item.id}
          onViewableItemsChanged={_sectionListOnViewableItemsChanged}
          onScrollToIndexFailed={_onScrollToIndexFailed}
          // 隐藏垂直滚动条
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  /**
   * 在 section 列表滑动时的逻辑
   */
  function _sectionListOnViewableItemsChanged(info) {
    let firstViewableItem = info?.viewableItems[0];
    if (firstViewableItem) {
      let id = firstViewableItem.section.cid;
      let index = allData.findIndex(item => {
        return id === item.cid;
      });

      // if (selectedIndex !== index) {
      // flatListRef.current.scrollToOffset({
      //   animated: true,
      //   offset: index * FLATLIST_ITEM_HEIGHT,
      // });
      // setSelectedIndex(index);
      // }
    }
  }

  function _onScrollToIndexFailed() {
    return {
      index: selectedIndex,
      highestMeasuredFrameIndex: 0,
      averageItemLength: SECTION_LIST_ITEM_HEIGHT,
    };
  }

  /**
   * 渲染 flat 列表 item
   */
  function _renderFlatListItem({index, item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          // 左侧列表滑动,https://reactnative.cn/docs/flatlist#scrolltooffset
          // flatListRef.current.scrollToOffset({
          //   animated: true,
          //   offset: index * (FLATLIST_ITEM_HEIGHT + FLATLIST_DIVIDER_HEIGHT),
          // });

          LogUtil.info({tag: TAG}, 'selectedIndex: ' + index);
          // 右侧列表滑动,https://reactnative.cn/docs/sectionlist#scrolltolocation
          LogUtil.info({tag: TAG}, 'allData.length: ' + allData.length);
          requestAnimationFrame(() => {
            setSelectedIndex(index);
            sectionListRef.current.scrollToLocation({
              animated: true,
              itemIndex: 0,
              sectionIndex: index < allData.length ? index : allData.length - 1,
              viewPosition: 0,
            });
          });
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: FLATLIST_ITEM_HEIGHT,
            backgroundColor:
              selectedIndex === index ? Color.green : Color.transparent,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: selectedIndex === index ? Color.white : Color.black,
            }}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * 渲染 section 列表 item
   */
  function _renderSectionListItem({index, item}) {
    return (
      <TouchableOpacity
        style={{marginBottom: 1}}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(RouterConst.Pages.WebPage, {
            title: item?.title,
            url: item?.link,
          });
        }}>
        <View
          style={{
            backgroundColor: Color.white,
          }}>
          <SimpleArticleInfoCard item={item} />
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * 渲染 section 列表头
   */
  function _renderSectionHeader({section: {name}}) {
    return (
      <View
        style={{
          justifyContent: 'center',
          height: FLATLIST_ITEM_HEIGHT,
          paddingLeft: 5,
          backgroundColor: Color.white,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: Color.green,
          }}>
          {name}
        </Text>
      </View>
    );
  }

  /**
   * 获取 web 导航数据
   */
  function getNavigation() {
    HttpUtil.sendGet(ApiUrl.getWebNaviList()).then(
      function (rsp: ApiResponse) {
        let dataArray: WebNaviInfo[] = rsp.data as WebNaviInfo[];

        setAllData(
          /**
           * 转换数据格式，必须在 data 字段下，否则 sectionlist 会报错
           * https://stackoverflow.com/questions/50549460/cannot-read-property-length-of-undefined-when-using-sectionlist
           */
          dataArray.map(({articles, ...res}) => ({
            ...res,
            data: articles,
          })),
        );
      },
      function (error) {
        LogUtil.error({tag: TAG}, 'error: ' + error);
      },
    );
  }
}
