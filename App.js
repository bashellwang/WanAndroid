import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './src/pages/HomePage';
import WelcomePage from './src/pages/WelcomePage';

const Stack = createNativeStackNavigator();

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

export default function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName 表示默认第一个路由页面*/}
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
