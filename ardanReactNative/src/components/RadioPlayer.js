import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
TrackPlayer.registerPlaybackService(() => require('../services/TrackPlayer.js'));
const RadioPlayer = () => {
  useEffect(() => {
    setupTrackPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  const setupTrackPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: '1',
      url: 'https://n09.rcs.revma.com/1q762wy5a9hvv.m4a?1675997040=&rj-tok=AAABhjk-eo4Aj03-Z03mDUOA_A&rj-ttl=5',
      title: 'Ardan FM',
      artist: 'Ardan Radio',
      artwork: 'https://api.radiosworld.info/files/radio/logo/1411605f0a94430b873a6d09580d02cc1c151725.jpeg',
    })
  };

  const handlePlayPause = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const playerState = await TrackPlayer.getState();
    console.log('playerState:',playerState);
    console.log('currentTrack:',currentTrack);
    if(playerState === 'stopped'){
      await TrackPlayer.reset();
    }
    if (playerState === 'paused' || playerState === 'ready' || playerState === 'idle' || playerState === 'connecting' || playerState === 'stopped') {
      let play = await TrackPlayer.play();
    } else {
      let pause = TrackPlayer.pause();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ardan FM</Text>
      <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
        <Text style={styles.buttonText}>Play / Pause</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RadioPlayer;
