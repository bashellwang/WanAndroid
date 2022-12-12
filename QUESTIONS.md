> Q: Question
>
> A: Answer
>
> R: Reference

```
Q: error Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65
A: `rm -rf ~/Library/Developer/Xcode/DerivedData`
R: https://github.com/facebook/react-native/issues/33477
```

```
Q: Invariant Violation: requireNativeComponent: "RNCViewPager" was not found in the UIManager.
A: `yarn add react-native-pager-view` and `cd ios` ,and `pod install`
R: https://stackoverflow.com/questions/59953648/react-native-invariant-violation-requirenativecomponent-rncviewpager-was-not
```

```
Q: How to fix missing dependency warning when using useEffect React Hook
A:
R: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook

```

```
Q: typescript deconstruction a data except some field
A: 
let source = {
    x: 120,
    y: 200,
    z: 150,
    radius: 10,
    color: 'red',
};
let result = (({ x, y, z }) => ({ x, y, z }))(source);

或者

let user = {name : "Ram", age: 20, salary: '20K', job : "Tester" }; 
let { name, age, ...details } = user; 
name; // Ram 
age; // 20 
details; // {salary: '20K', job : 'Tester'}; 

R: 
https://stackoverflow.com/questions/51340819/elegant-way-to-copy-only-a-part-of-an-object/51340842#51340842
https://www.51cto.com/article/618100.html
```

```
Q: Error: Looks like you have nested a 'NavigationContainer' inside another. Normally you need only one container at the root of the app
A: https://stackoverflow.com/questions/61677422/error-looks-like-you-have-nested-a-navigationcontainer-inside-another-normal
```
