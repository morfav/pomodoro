import React, {useState, useEffect, useRef} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import CountdownDisplay from "./CountdownDisplay";

const TimerScreen = () => {
  const [running, setRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [timeRemaining, setTimeRemaining] = useState(60000);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState();
  const timerRef = useRef();

  useEffect(() => {
    if (running) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
    return () => deactivateKeepAwake();
  }, [running])

  useEffect(() => {
    if (running && currentTime && startTime) {
      setTimeElapsed(currentTime - startTime);
    }
  }, [currentTime])

  const tick = () => {
    setCurrentTime(Date.now());
  }

  const toggleTimer = () => {
    if (!running) {
      setStartTime(Date.now());
      timerRef.current = setInterval(tick, 250);
    } else {
      clearInterval(timerRef.current);
      setTimeRemaining(timeRemaining - timeElapsed);
      setTimeElapsed(0);
    }
    setRunning(!running);
  }

  return (
    <View style={styles.container}>
      <CountdownDisplay
        running={running}
        timeRemaining={timeRemaining - timeElapsed}
      />
      <View>
        <Button
          title={running && 'stop' || 'start'}
          onPress={() => toggleTimer()}
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
