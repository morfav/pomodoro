import React from "react";
import {StyleSheet, Text, Pressable} from "react-native";

import * as Haptics from 'expo-haptics';

const TouchableButton = ({onPress, text}) => {

  const hapticOnPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  }

  return (
    <Pressable
      onPress={() => hapticOnPress()}
      style={({pressed}) => [
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
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  button: {
    alignItems: "center",
    padding: 20,
    borderRadius: 45,
    minWidth: 130,
  },
  text: {
    color: 'white',
    fontWeight: "200",
    fontSize: 32,
  }
});

export default TouchableButton;
