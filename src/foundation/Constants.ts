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
export default {
  Pages: {
    WelcomePage: 'WelcomePage',
    HomePage: 'HomePage',
    ProjectPage: 'ProjectPage',
    ResourcePage: 'ResourcePage',
    MePage: 'MePage',
  },
  Navigators: {HomeNavigator: 'HomeNavigator'},
  Colors: {},
};
