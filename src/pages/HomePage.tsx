import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class HomePage extends Component<any, any> {
  private navigation: any;

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.font}>Home</Text>
        <Button
          title="Go Home"
          onPress={() => this.navigation.navigate('Home')}
        />
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
