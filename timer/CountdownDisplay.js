import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

const CountdownDisplay = ({running, timeRemaining}) => {
  return (
    <View style={styles.container}>
      <View>
        <ActivityIndicator animating={running}/>
      </View>
      <View>
        <Text
          style={styles.text}>
          {Math.floor(timeRemaining / 60000)}:{Math.round(timeRemaining / 1000) % 60}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
});

export default CountdownDisplay;
