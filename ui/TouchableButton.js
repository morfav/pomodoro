import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import React from "react";

const TouchableButton = ({onPress, text}) => (
  <View style={styles.container}>
    <TouchableHighlight
      style={styles.button}
      underlayColor="#AA85CB"
      onPress={onPress}
    >
      <Text
        style={styles.text}
      >
        {text}
      </Text>
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: "center",
    // underlayColor: "#aa85cb",
    padding: 10,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontWeight: "200",
    fontSize: 24,
  }
});

export default TouchableButton;
