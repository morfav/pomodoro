import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimerScreen from "./timer/TimerScreen";

const App = () => (
  <View style={styles.container}>
    <TimerScreen />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
