import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const CountdownDisplay = ({timeRemaining}) => {
  const secondsRemaining = Math.ceil(timeRemaining / 1000);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          style={[styles.text, styles.textCell, styles.rightAlign]}>
          {String(Math.floor( secondsRemaining / 60)).padStart(2, '0')}
        </Text>
        <Text
          style={styles.text}>
          :
        </Text>
        <Text
          style={[styles.text, styles.textCell, styles.leftAlign]}>
          {String(secondsRemaining % 60).padStart(2, '0')}
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
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textCell: {
    minWidth: 150,
  },
  leftAlign: {
    textAlign: 'left',
  },
  rightAlign: {
    textAlign: 'right',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: "400",
    fontSize: 94,
  }
});

export default CountdownDisplay;
