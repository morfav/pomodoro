import React, {useState} from 'react';
import {View, ActivityIndicator, Button, StyleSheet} from 'react-native';

const TimerScreen = () => {
  const [running, setRunning] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <ActivityIndicator animating={running}/>
      </View>
      <View>
        <Button
          title={running && 'stop' || 'start'}
          onPress={() => setRunning(!running)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

export default TimerScreen;
