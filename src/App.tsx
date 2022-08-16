import React, { useCallback, useRef, useState } from 'react';
import { Button, StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PictureInPictureView } from 'react-native-pip-reanimated';
import ExampleProps from './exampleProps';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  root: {
    flex: 1,
  },
  background: {
    flex: 1,
    zIndex: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  center: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
  },
});

function App() {
  const [destroyed, setDestroyed] = useState(false);
  const [persist, setPersist] = useState(false);
  const onDestroy = useCallback(() => setDestroyed(true), []);
  const reset = useCallback(() => {
    setDestroyed(true);
    setTimeout(() => setDestroyed(false));
  }, []);

  const videoPlayerRef = useRef();
  const [pip, setPip] = useState(false);
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.background}>
        <Button title="Reset player" onPress={reset} />
        <Button title={`pip ${pip}`} onPress={() => setPip(!pip)} />
      </SafeAreaView>
      {!destroyed && (
        <PictureInPictureView {...ExampleProps} onDestroy={onDestroy}>
          <Video
            ref={videoPlayerRef}
            pictureInPicture={pip}
            playInBackground
            source={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            }}
            // Store reference
            onError={(e) => console.log(e)} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
          />
        </PictureInPictureView>
      )}
    </GestureHandlerRootView>
  );
}

export default App;
