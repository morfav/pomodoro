import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Button, StyleSheet} from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

const TimerScreen = () => {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
    return () => deactivateKeepAwake();
  }, [running])

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
