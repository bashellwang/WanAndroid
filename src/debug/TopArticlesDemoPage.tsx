import * as React from 'react';
import {ArticleInfo} from '../model/bean/ArticleInfo';
import {RouterConst} from '../foundation/constants/RouterConst';
import GeneralFlatListDemo from './GeneralFlatListDemo';

export default function TopArticlesDemoPage({navigation}) {
  return (
    <GeneralFlatListDemo
      onClick={(data: ArticleInfo) => {
        navigation.navigate(RouterConst.Pages.WebPage, {
          title: data.title,
          url: data.link,
        });
      }}
    />
  );
}
