import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";

const CountdownDisplay = ({running, timeRemaining}) => {
  return (
    <View>
      <View>
        <ActivityIndicator animating={running}/>
      </View>
      <View>
        <Text>{Math.round(timeRemaining / 1000)}</Text>
      </View>
    </View>
  )
}

export default CountdownDisplay;
