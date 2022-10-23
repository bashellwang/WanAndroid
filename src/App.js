import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProjectPage from './pages/ProjectPage';
import ResourcePage from './pages/ResourcePage';
import MePage from './pages/MePage';
import Constants from './foundation/Constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={Constants.Pages.HomePage}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'logo-react';
          if (route.name === Constants.Pages.HomePage) {
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
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name={Constants.Pages.HomePage}
        component={HomePage}
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

export default function App() {
  return (
    <NavigationContainer>
      {
        <Stack.Navigator initialRouteName={Constants.Pages.WelcomePage}>
          <Stack.Screen
            name={Constants.Pages.WelcomePage}
            component={WelcomePage}
            options={{
              title: 'Welcome',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Constants.Navigators.HomeNavigator}
            component={HomeNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
