import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import TimerScreen from "./timer/TimerScreen";

import Background from "./background/Background";

const App = () => {
  const [millisInPreviousSegments, setMillisInPreviousSegments] = useState(0);
  const [latestStartTime, setLatestStartTime] = useState();
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
  }, [])

  return (
  <View style={styles.container}>
    <Background
      millisInPreviousSegments={millisInPreviousSegments}
      latestStartTime={latestStartTime}
    />
    <View style={{flex: 1}}>
      <TimerScreen
        millisInPreviousSegments={millisInPreviousSegments}
        setMillisInPreviousSegments={setMillisInPreviousSegments}
        setLatestStartTime={setLatestStartTime}
      />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App;
