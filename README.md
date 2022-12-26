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

- React Native doesn't have a built-in API for navigation like a web browser does. React Navigation provides this for
  you, along with the iOS and Android gestures and animations to transition between screens.
- Stack.Navigator is a component that takes route configuration as its children with additional props for configuration
  and renders our content.
- Each Stack.Screen component takes a name prop which refers to the name of the route and component prop which specifies
  the component to render for the route. These are the 2 required props.
- To specify what the initial route in a stack is, provide an initialRouteName as the prop for the navigator.
- To specify screen-specific options, we can pass an options prop to Stack.Screen, and for common options, we can pass
  screenOptions to Stack.Navigator

#### https://reactnavigation.org/docs/navigating

- navigation.navigate('RouteName') pushes a new route to the native stack navigator if it's not already in the stack,
  otherwise it jumps to that screen.
- We can call navigation.push('RouteName') as many times as we like and it will continue pushing routes.
- The header bar will automatically show a back button, but you can programmatically go back by calling
  navigation.goBack(). On Android, the hardware back button just works as expected.
- You can go back to an existing screen in the stack with navigation.navigate('RouteName'), and you can go back to the
  first screen in the stack with navigation.popToTop().
- The navigation prop is available to all screen components (components defined as screens in route configuration and
  rendered by React Navigation as a route).

#### https://reactnavigation.org/docs/params

- navigate and push accept an optional second argument to let you pass parameters to the route you are navigating to.
  For example: navigation.navigate('RouteName', { paramName: 'value' }).
- You can read the params through route.params inside a screen
- You can update the screen's params with navigation.setParams
- Initial params can be passed via the initialParams prop on Screen
- Params should contain the minimal data required to show a screen, nothing more

#### https://reactnavigation.org/docs/headers

- You can customize the header inside of the options prop of your screen components. Read the full list of options in
  the API reference.
- The options prop can be an object or a function. When it is a function, it is provided with an object with the
  navigation and route prop.
- You can also specify shared screenOptions in the stack navigator configuration when you initialize it. The prop takes
  precedence over that configuration.

#### https://reactnavigation.org/docs/header-buttons

- You can set buttons in the header through the headerLeft and headerRight properties in options.
- The back button is fully customizable with headerLeft, but if you just want to change the title or image, there are
  other options for that — headerBackTitle, headerBackTitleStyle, and headerBackImageSource.
- You can use a callback for the options prop to access navigation and route objects.

#### https://reactnavigation.org/docs/nesting-navigators

- Each navigator keeps its own navigation history
- Each navigator has its own options
- Each screen in a navigator has its own params
- Navigation actions are handled by current navigator and bubble up if couldn't be handled
- Navigator specific methods are available in the navigators nested inside
- Nested navigators don't receive parent's events
- Parent navigator's UI is rendered on top of child navigator

#### https://reactnavigation.org/docs/navigation-lifecycle

- While React's lifecycle methods are still valid, React Navigation adds more events that you can subscribe to through
  the navigation prop.
- You may also use the useFocusEffect or useIsFocused hooks.

### react-native-vector-icons

- github 仓库: https://github.com/oblador/react-native-vector-icons
- ionicons 图片库: https://ionic.io/ionicons



### 调试
https://www.jianshu.com/p/89df53f91edd

- 进入菜单项：adb shell input keyevent 82
- Ctrl+M 即可（Android上有快捷键冲突， 需自行调整）
- 手机上摇一摇

### RN 布局样式
- https://reactnative.cn/docs/flexbox
- https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

### RN 性能优化
- https://reactnative.cn/docs/performance
- https://reactnative.cn/docs/optimizing-flatlist-configuration

