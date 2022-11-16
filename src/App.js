import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './pages/home/HomePage';
import WelcomePage from './pages/WelcomePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProjectPage from './pages/project/ProjectPage';
import ResourcePage from './pages/resource/ResourcePage';
import MePage from './pages/me/MePage';
import Constants from './foundation/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RecommendPage from './pages/home/RecommendPage';
import TopicPage from './pages/home/TopicPage';
import ArticleDetailPage from './pages/home/ArticleDetailPage';
import WebPage from './pages/WebPage';
import Themes from './foundation/Themes';
import TopArticlesPage from './pages/home/TopArticlesPage';
import DailyQuestionPage from './pages/home/DailyQuestionPage';
import PerformanceOptimizationPage from './pages/home/PerformanceOptimizationPage';
import FrameworkPage from './pages/home/FrameworkPage';
import SourceCodePage from './pages/home/SourceCodePage';
import BigFactorySharePage from './pages/home/BigFactorySharePage';
import InterviewRelatedPage from './pages/home/InterviewRelatedPage';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Platform, PlatformIOSStatic} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

//https://reactnavigation.org/docs/hello-react-navigation
/**
 * - React Native doesn't have a built-in API for navigation like a web browser does. React Navigation provides this for you, along
 *      with the iOS and Android gestures and animations to transition between screens.
 * - Stack.Navigator is a component that takes route configuration as its children with additional props for configuration and
 *      renders our content.
 * - Each Stack.Screen component takes a name prop which refers to the name of the route and component prop which specifies the
 *      component to render for the route. These are the 2 required props.
 * - To specify what the initial route in a stack is, provide an initialRouteName as the prop for the navigator.
 * - To specify screen-specific options, we can pass an options prop to Stack.Screen, and for common options, we can pass
 *      screenOptions to Stack.Navigator
 */

function AppBottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'logo-react';
          if (route.name === Constants.Navigators.HomePageTopTabsNavigator) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === Constants.Pages.ProjectPage) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === Constants.Pages.ResourcePage) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === Constants.Pages.MePage) {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={focused ? size + 5 : size}
              color={color}
            />
          );
        },
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name={Constants.Navigators.HomePageTopTabsNavigator}
        component={HomePageTopTabsNavigator}
        options={{
          tabBarLabel: '首页',
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={Constants.Pages.ProjectPage}
        component={ProjectPage}
        options={{
          tabBarLabel: '项目',
          title: 'Project',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={Constants.Pages.ResourcePage}
        component={ResourcePage}
        options={{
          tabBarLabel: '资源',
          title: 'Resource',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={Constants.Pages.MePage}
        component={MePage}
        options={{
          tabBarLabel: '我',
          title: 'Me',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}

function HomePageTopTabsNavigator() {
  return (
    <Top.Navigator
      screenOptions={{
        lazy: true, //屏幕懒加载
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: {
          height: 2,
          // backgroundColor: 'tomato',
        },
        tabBarStyle: {
          marginTop: Platform.OS === 'ios' ? 50 : 0,
          height: 50,
        },
      }}>
      <Top.Screen
        name={Constants.Navigators.RecommendPageTopTabsNavigator}
        component={RecommendPageTopTabsNavigator}
        options={{
          tabBarLabel: '推荐',
          title: 'Recommend',
        }}
      />
      <Top.Screen
        name={Constants.Navigators.TopicPageTopTabsNavigator}
        component={TopicPageTopTabsNavigator}
        options={{
          tabBarLabel: '专题',
          title: 'Topic',
        }}
      />
    </Top.Navigator>
  );
}

function RecommendPageTopTabsNavigator() {
  return (
    <Top.Navigator
      screenOptions={{
        lazy: true, //屏幕懒加载

        // tab 中文本样式
        tabBarLabelStyle: {
          fontsize: 20,
          fontWeight: '200',
          // color: 'red',
          // backgroundColor: 'green',
        },
        // tab 中下滑指示线样式
        tabBarIndicatorStyle: {
          height: 2,
          width: 40,
          left: 75,
          // backgroundColor: 'blue',
        },
        // ----------下面三个样式优先级逐渐升高-------------
        // tabbar 布局样式
        tabBarStyle: {
          // backgroundColor: 'orange',
          // justifyContent: true, //默认为false
        },
        // tab 中内容所在布局容器的样式
        tabBarContentContainerStyle: {
          // backgroundColor: 'purple',
          // justifyContent: true, //默认为true
        },
        tabBarItemStyle: {
          // backgroundColor: 'black',
          // justifyContent: true, //默认为true
        },
        // ----------上面三个样式优先级逐渐升高-------------
      }}>
      <Top.Screen
        name={Constants.Pages.TopArticlesPage}
        component={TopArticlesPage}
        options={{
          tabBarLabel: '热门博文',
        }}
      />
      <Top.Screen
        name={Constants.Pages.DailyQuestionPage}
        component={DailyQuestionPage}
        options={{
          tabBarLabel: '每日一问',
        }}
      />
    </Top.Navigator>
  );
}

function TopicPageTopTabsNavigator() {
  return (
    <Top.Navigator
      screenOptions={{
        lazy: true, //屏幕懒加载

        // tab 中文本样式
        tabBarLabelStyle: {
          fontsize: 10,
          fontWeight: '200',
          textTransform: 'capitalize',
        },
        // tab 中下滑指示线样式
        tabBarIndicatorStyle: {
          height: 2,
          width: 40,
          left: 60,
        },
        // 当一屏显示不下时，需要左右进行滑动，当它为true时，需要设置 tabBarItemStyle 做样式调整
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          minWidth: 120,
        },
      }}>
      <Top.Screen
        name={Constants.Pages.InterviewRelatedPage}
        component={InterviewRelatedPage}
        options={{
          tabBarLabel: '面试相关',
        }}
      />
      <Top.Screen
        name={Constants.Pages.PerformanceOptimizationPage}
        component={PerformanceOptimizationPage}
        options={{
          tabBarLabel: '性能优化',
        }}
      />
      <Top.Screen
        name={Constants.Pages.FrameworkPage}
        component={FrameworkPage}
        options={{
          tabBarLabel: 'framework',
        }}
      />
      <Top.Screen
        name={Constants.Pages.SourceCodePage}
        component={SourceCodePage}
        options={{
          tabBarLabel: '开源库源码',
        }}
      />
      <Top.Screen
        name={Constants.Pages.BigFactorySharePage}
        component={BigFactorySharePage}
        options={{
          tabBarLabel: '大厂分享',
        }}
      />
    </Top.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={Themes.GreenTheme}>
      {
        <Stack.Navigator
          initialRouteName={Constants.Pages.WelcomePage}
          screenOptions={{
            animation: 'none',
          }}>
          <Stack.Screen
            name={Constants.Pages.WelcomePage}
            component={WelcomePage}
            options={{
              title: 'Welcome',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Constants.Navigators.AppBottomTabsNavigator}
            component={AppBottomTabsNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Constants.Pages.ArticleDetailPage}
            component={ArticleDetailPage}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name={Constants.Pages.WebPage}
            component={WebPage}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
