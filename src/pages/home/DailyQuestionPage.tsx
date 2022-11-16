import * as React from 'react';
import GeneralFlatListDemo from '../../debug/GeneralFlatListDemo';
import {ArticleBean} from './ArticleBean';
import Constants from '../../foundation/Constants';

export default function DailyQuestionPage({navigation}) {
  return (
    <GeneralFlatListDemo
      onClick={(data: ArticleBean) => {
        navigation.navigate(Constants.Pages.WebPage, {
          title: data.title,
          url: data.link,
        });
      }}
    />
  );
}
