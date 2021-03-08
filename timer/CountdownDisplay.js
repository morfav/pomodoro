import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const CountdownDisplay = ({timeRemaining}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.text}>
          {Math.floor(timeRemaining / 60000)}:{String(Math.floor(timeRemaining / 1000) % 60).padStart(2, '0')}
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
    textAlign: 'center',
    fontWeight: "500",
    fontSize: 30,
  }
});

export default CountdownDisplay;
