import * as React from 'react';
import GeneralFlatList from '../../components/GeneralFlatList';
import {ArticleBean} from './ArticleBean';
import Constants from '../../foundation/Constants';

export default function DailyQuestionPage({navigation}) {
  return (
    <GeneralFlatList
      onClick={(data: ArticleBean) => {
        navigation.navigate(Constants.Pages.WebPage, {
          title: data.title,
          url: data.link,
        });
      }}
    />
  );
}
