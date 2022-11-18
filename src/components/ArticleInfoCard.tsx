import * as React from 'react';
import {FC} from 'react';
import {ArticleInfo, ArticleTag} from '../model/ArticleInfo';
import {View, StyleSheet, Text} from 'react-native';
import OutlineTextList, {ItemInfo} from './OutlineTextList';
import OutlineText, {OutlineTextColorTheme} from './OutlineText';

const ArticleInfoCardColor = {
  dark_black: '#2e3135',
  middle_black: '#312F2F',
  light_black: '#494646',
};
const TAG = '[ArticleInfoCard] ';

interface ArticleInfoCardProps {
  item: ArticleInfo;
}

export default function ArticleInfoCard(props: ArticleInfoCardProps): FC {
  let article: ArticleInfo = props.item as ArticleInfo;

  return (
    <View style={pageStyle.item.container}>
      <Text style={pageStyle.item.title} numberOfLines={1}>
        {article.title}
      </Text>
      {article.desc ? (
        <Text style={pageStyle.item.content} numberOfLines={3}>
          {article.desc}
        </Text>
      ) : null}
      <Text style={pageStyle.item.label} numberOfLines={1}>
        分类:{article.superChapterName}/{article.chapterName}
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={pageStyle.item.label}>作者:{article.author}</Text>
        <Text style={pageStyle.item.label}>时间:{article.niceDate}</Text>
      </View>

      {_renderTags(article)}
    </View>
  );
}

function _renderTags(article: ArticleInfo) {
  let tagList: ArticleTag[] = article.tags;
  let wrapData: ItemInfo[] = tagList.map(item => {
    return {text: item.name, color: OutlineTextColorTheme.green};
  });
  let targetData: ItemInfo[];
  if (article.isTop) {
    targetData = [
      {text: '置顶', color: OutlineTextColorTheme.red},
      ...wrapData,
    ];
  } else {
    targetData = wrapData;
  }
  return <OutlineTextList dataList={targetData} />;
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  item: {
    container: {
      padding: 5,
      backgroundColor: 'white',
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    title: {
      color: ArticleInfoCardColor.dark_black,
      fontSize: 16,
      // fontWeight: 'bold',
    },
    content: {
      paddingTop: 5,
      paddingBottom: 5,
      color: ArticleInfoCardColor.middle_black,
      fontSize: 12,
    },
    label: {
      marginTop: 5,
      color: ArticleInfoCardColor.light_black,
      fontSize: 10,
    },
  },
});
