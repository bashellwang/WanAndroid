// 写法一，export const, 使用的地方导入该文件
// import {Pages} from './foundation/Constants';
// 直接 Pages.HomePage 使用
// export const Pages = {
//   WelcomePage: 'WelcomePage',
//   HomePage: 'HomePage',
//   ProjectPage: 'ProjectPage',
//   ResourcePage: 'ResourcePage',
//   MePage: 'MePage',
// };
//
// export const Navigators = {
//   HomeNavigator: 'HomeNavigator',
// };

// 写法二，export default, 使用的地方导入该文件
// import Constants from './foundation/Constants';
// Constants.Pages.WelcomePage

export const RouterConst = {
  Pages: {
    HomePage: 'HomePage',
    WelcomePage: 'WelcomePage',

    DailyQuestionPage: 'DailyQuestionPage',
    RecommendPage: 'RecommendPage',
    TopArticlesPage: 'TopArticlesPage',
    TopicPage: 'TopicPage',

    MePage: 'MePage',

    ProjectPage: 'ProjectPage',

    ResourcePage: 'ResourcePage',
    NavigationPage: 'NavigationPage',

    WebPage: 'WebPage',
  },
  // 调试模块
  Debug: {
    DebugPage: 'DebugPage',
    TopArticlesDemoPage: 'TopArticlesDemoPage',
  },
  Navigators: {
    // HomeNavigator: 'HomeNavigator',
    AppBottomTabsNavigator: 'AppBottomTabsNavigator',
    HomePageTopTabsNavigator: 'HomePageTopTabsNavigator',
    RecommendPageTopTabsNavigator: 'RecommendPageTopTabsNavigator',
  },
  Colors: {},
};
