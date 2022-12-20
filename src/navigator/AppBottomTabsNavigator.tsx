import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouterConst} from '../foundation/constant/RouterConst';
import ProjectPage from '../page/project/ProjectPage';
import ResourcePage from '../page/resource/ResourcePage';
import MePage from '../page/me/MePage';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePageTopTabsNavigator from './HomePageTopTabsNavigator';

const Bottom = createBottomTabNavigator();

export default function AppBottomTabsNavigator() {
  return (
    <Bottom.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'logo-react';
          if (route.name === RouterConst.Navigators.HomePageTopTabsNavigator) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === RouterConst.Pages.ProjectPage) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === RouterConst.Pages.ResourcePage) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === RouterConst.Pages.MePage) {
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
      <Bottom.Screen
        name={RouterConst.Navigators.HomePageTopTabsNavigator}
        component={HomePageTopTabsNavigator}
        options={{
          tabBarLabel: '首页',
          title: 'Home',
          headerShown: false,
        }}
      />
      <Bottom.Screen
        name={RouterConst.Pages.ProjectPage}
        component={ProjectPage}
        options={{
          tabBarLabel: '项目',
          title: 'Project',
          headerShown: false,
        }}
      />
      <Bottom.Screen
        name={RouterConst.Pages.ResourcePage}
        component={ResourcePage}
        options={{
          tabBarLabel: '资源',
          title: 'Resource',
          headerShown: true,
        }}
      />
      <Bottom.Screen
        name={RouterConst.Pages.MePage}
        component={MePage}
        options={{
          tabBarLabel: '我',
          title: 'Me',
          headerShown: true,
        }}
      />
    </Bottom.Navigator>
  );
}
