import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Vibration, StyleSheet, Text} from 'react-native';
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import CountdownDisplay from "./CountdownDisplay";
import TouchableButton from "../ui/TouchableButton";

const TimerScreen = (
  {
    millisInPreviousSegments,
    setMillisInPreviousSegments,
    setLatestStartTime
  }) => {

  const SHORT = 'short';
  const LONG = 'long';
  const INTERVAL = 'interval';
  const BREAK = 'break';

  const intervals = {
    [SHORT]: {
      [INTERVAL]: 25 * 60000,
      [BREAK]: 5 * 60000,
    },
    [LONG]: {
      [INTERVAL]: 50 * 60000,
      [BREAK]: 10 * 60000,
    }
  }
  const vibratePattern = new Array(5).fill(0).fill(500, 1);

  const [running, setRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeElapsedCurrentSegment, setTimeElapsedCurrentSegment] = useState(0);
  const [startTime, setStartTime] = useState();
  const [intervalLength, setIntervalLength] = useState(SHORT);
  const [intervalType, setIntervalType] = useState(INTERVAL);
  const timerRef = useRef();

  useEffect(() => {
    reset();
    if (running) {
      setStartTimes();
    }
  }, [intervalLength, intervalType])

  useEffect(() => {
    if (running) {
      activateKeepAwake();
      setStartTimes();
      timerRef.current = setInterval(tick, 100);
    } else {
      deactivateKeepAwake();
      clearInterval(timerRef.current);
      reset();
    }
    return () => deactivateKeepAwake();
  }, [running])

  useEffect(() => {
    if (running && currentTime && startTime) {
      let elapsed = currentTime - startTime;
      if (elapsed > intervals[intervalLength][intervalType]) {
        Vibration.vibrate(vibratePattern);
        if (intervalType === INTERVAL) {
          setIntervalType(BREAK);
        } else {
          setIntervalType(INTERVAL);
        }
      }
      setTimeElapsedCurrentSegment(elapsed);
    }
  }, [currentTime])

  const reset = () => {
    setTimeRemaining(intervals[intervalLength][intervalType]);
    setMillisInPreviousSegments(millisInPreviousSegments + timeElapsedCurrentSegment);
    setTimeElapsedCurrentSegment(0);
    setLatestStartTime(undefined);
  }

  const tick = () => {
    setCurrentTime(Date.now());
  }

  const setStartTimes = () => {
    const time = Date.now();
    setStartTime(time);
    setLatestStartTime(time);
  }

  const onReset = () => {
    setRunning(!running);
    setIntervalType(INTERVAL);
  }

  return (
    <View style={styles.container}>
      <CountdownDisplay
        timeRemaining={timeRemaining - timeElapsedCurrentSegment}
      />
      <View style={styles.buttons}>
        <TouchableButton
          onPress={() => setIntervalLength(intervalLength === LONG ? SHORT : LONG)}
          text={intervalLength}
        />
        <TouchableButton
          onPress={() => onReset()}
          text={running && 'reset' || 'start'}
        >
        </TouchableButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttons: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default TimerScreen;
