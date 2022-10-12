import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class HomePage extends Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.font}>Home</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    background: '@F5FCFF',
  },
  font: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
