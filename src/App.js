import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './pages/home/HomePage';
import WelcomePage from './pages/WelcomePage';
import WebPage from './pages/WebPage';
import Themes from './foundation/constants/Themes';
import DebugPage from './debug/DebugPage';
import TopArticlesDemoPage from './debug/TopArticlesDemoPage';
import {RouterConst} from './foundation/constants/RouterConst';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={Themes.GreenTheme}>
      {
        <Stack.Navigator
          initialRouteName={RouterConst.Pages.WelcomePage}
          screenOptions={{
            animation: 'none',
          }}>
          <Stack.Screen
            name={RouterConst.Pages.WelcomePage}
            component={WelcomePage}
            options={{
              title: 'Welcome',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={RouterConst.Pages.HomePage}
            component={HomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={RouterConst.Pages.WebPage}
            component={WebPage}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name={RouterConst.Debug.DebugPage}
            component={DebugPage}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name={RouterConst.Debug.TopArticlesDemoPage}
            component={TopArticlesDemoPage}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
