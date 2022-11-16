import * as React from 'react';
import Constants from '../foundation/Constants';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Themes from '../foundation/Themes';

export default function DebugPage({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="置顶文章页(一个组件构建一个完整页面)"
        color={Themes.GreenTheme.colors.primary}
        onPress={() => {
          navigation.navigate(Constants.Debug.TopArticlesDemoPage);
        }}
      />

      <TouchableOpacity
        style={styles.buttonStyle.container}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(Constants.Debug.TopArticlesDemoPage);
        }}>
        <Text style={styles.buttonStyle.text}>
          置顶文章页(一个组件构建一个完整页面)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  buttonStyle: {
    container: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      minHeight: 35,
      justifyContent: 'center',
      backgroundColor: Themes.GreenTheme.colors.primary,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
  },
});
