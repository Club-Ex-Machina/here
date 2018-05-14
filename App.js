import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Login from './screens/login';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
        <ScrollView alwaysBounceVertical= {false} >
            <Login />
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  }
});
