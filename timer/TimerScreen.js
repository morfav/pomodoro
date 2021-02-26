import React, {useState, useEffect, useRef} from 'react';
import {View, Button, Switch, StyleSheet} from 'react-native';
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import CountdownDisplay from "./CountdownDisplay";

const TimerScreen = (
  {
    millisInPreviousSegments,
    setMillisInPreviousSegments,
    setLatestStartTime
  }) => {

  const longInterval = 50;
  const shortInterval = 25;

  const [running, setRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeElapsedCurrentSegment, setTimeElapsedCurrentSegment] = useState(0);
  const [startTime, setStartTime] = useState();
  const [isLongInterval, setIsLongInterval] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    reset();
  }, [isLongInterval])

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

  const reset = () => {
    if (isLongInterval) {
      setTimeRemaining(longInterval * 60000);
    } else {
      setTimeRemaining(shortInterval * 60000);
    }
  }

  const tick = () => {
    setCurrentTime(Date.now());
  }

  const toggleTimer = () => {
    if (!running) {
      const time = Date.now();
      setStartTime(time);
      setLatestStartTime(time);
      timerRef.current = setInterval(tick, 100);
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
      <View style={{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
      >
        <View>
          <Button
            title={'reset'}
            onPress={() => reset()}
          />
        </View>
        <View>
          <Button
            title={running && 'pause' || 'start'}
            onPress={() => toggleTimer()}
          />
        </View>
        <View>
          <Button
            title={isLongInterval && 'short' || 'long'}
            onPress={() => setIsLongInterval(!isLongInterval)}
          />
        </View>
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
