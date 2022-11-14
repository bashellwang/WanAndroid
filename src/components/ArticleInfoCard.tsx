import * as React from 'react';
import {FC} from 'react';
import {ArticleBean, ArticleTag} from '../pages/home/ArticleBean';
import {View, StyleSheet, Text} from 'react-native';
import OutlineTextList from './OutlineTextList';

const ArticleInfoCardColor = {
  dark_black: '#2e3135',
  middle_black: '#312F2F',
  light_black: '#494646',
};
const TAG = '[ArticleInfoCard] ';

interface ArticleInfoCardProps {
  item: ArticleBean;
}

export default function ArticleInfoCard(props: ArticleInfoCardProps): FC {
  let article: ArticleBean = props.item as ArticleBean;

  return (
    <View style={pageStyle.item.container}>
      <Text style={pageStyle.item.title} numberOfLines={1}>
        {article.title}
      </Text>
      {article.desc ? (
        <Text style={pageStyle.item.content} numberOfLines={3}>
          {article.desc}
        </Text>
      ) : (
        <Text style={pageStyle.item.content}>{article.desc}</Text>
      )}
      <Text style={pageStyle.item.text}>{article.author}</Text>
      {_renderTags(article.tags)}
    </View>
  );
}

function _renderTags(items: ArticleTag[]) {
  let tagNameList: string[];
  tagNameList = items.map(item => {
    return item.name;
  });
  return <OutlineTextList textList={tagNameList} />;
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
      justifyContent: 'flex-start', //内容居中
      alignItems: 'flex-start', //布局对齐方式
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
      marginBottom: 5,
      color: ArticleInfoCardColor.light_black,
      fontSize: 10,
    },
  },
});
