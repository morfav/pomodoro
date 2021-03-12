import {StyleSheet, Text, Pressable} from "react-native";
import React from "react";

const TouchableButton = ({onPress, text}) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#AA85CB' : undefined,
        },
        styles.button,
      ]}
    >
      <Text
        style={styles.text}
      >
        {text}
      </Text>
    </Pressable>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  button: {
    alignItems: "center",
    padding: 25,
    borderRadius: 40,
  },
  text: {
    color: 'white',
    fontWeight: "200",
    fontSize: 24,
  }
});

export default TouchableButton;
