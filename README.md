``` 
新建项目
npx react-native init WanAndroid

新增依赖库
yarn add xxx --save-dev

React Navigation
https://reactnavigation.org/docs/getting-started/
```


### React Navigation

#### https://reactnavigation.org/docs/hello-react-navigation/
- React Native doesn't have a built-in API for navigation like a web browser does. React Navigation provides this for you, along with the iOS and Android gestures and animations to transition between screens.
- Stack.Navigator is a component that takes route configuration as its children with additional props for configuration and renders our content.
- Each Stack.Screen component takes a name prop which refers to the name of the route and component prop which specifies the component to render for the route. These are the 2 required props.
- To specify what the initial route in a stack is, provide an initialRouteName as the prop for the navigator.
- To specify screen-specific options, we can pass an options prop to Stack.Screen, and for common options, we can pass screenOptions to Stack.Navigator

#### https://reactnavigation.org/docs/navigating
- navigation.navigate('RouteName') pushes a new route to the native stack navigator if it's not already in the stack, otherwise it jumps to that screen.
- We can call navigation.push('RouteName') as many times as we like and it will continue pushing routes.
- The header bar will automatically show a back button, but you can programmatically go back by calling navigation.goBack(). On Android, the hardware back button just works as expected.
- You can go back to an existing screen in the stack with navigation.navigate('RouteName'), and you can go back to the first screen in the stack with navigation.popToTop().
- The navigation prop is available to all screen components (components defined as screens in route configuration and rendered by React Navigation as a route).
