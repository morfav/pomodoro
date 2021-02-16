import React, {useState, useEffect, useRef} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import CountdownDisplay from "./CountdownDisplay";

const TimerScreen = (
  {
    millisInPreviousSegments,
    setMillisInPreviousSegments,
    setLatestStartTime
  }) => {

  const totalTime = 120000;

  const [running, setRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [timeElapsedCurrentSegment, setTimeElapsedCurrentSegment] = useState(0);
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
      setTimeElapsedCurrentSegment(currentTime - startTime);
    }
  }, [currentTime])

  const tick = () => {
    setCurrentTime(Date.now());
  }

  const toggleTimer = () => {
    if (!running) {
      const time = Date.now();
      setStartTime(time);
      setLatestStartTime(time);
      timerRef.current = setInterval(tick, 250);
    } else {
      clearInterval(timerRef.current);
      setTimeRemaining(timeRemaining - timeElapsedCurrentSegment);
      setMillisInPreviousSegments(millisInPreviousSegments + timeElapsedCurrentSegment);
      setTimeElapsedCurrentSegment(0);
      setLatestStartTime(undefined);
    }
    setRunning(!running);
  }

  return (
    <View style={styles.container}>
      <CountdownDisplay
        running={running}
        timeRemaining={timeRemaining - timeElapsedCurrentSegment}
      />
      <View style={{flex: 0.5, justifyContent: 'space-around'}}>
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
  },
});

export default TimerScreen;
