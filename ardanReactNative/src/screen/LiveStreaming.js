import React, { useEffect, useContext,useState,useCallback } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, Dimensions  } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import YoutubePlayer from "react-native-youtube-iframe";
import { WebSocket } from 'react-native-websocket';
const LiveStreaming = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const [playing, setPlaying] = useState(true);
  const height = (Dimensions.get("window").width / 16) * 9;
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60]}>
      <View style={[theme.bgyellow]}>
        <YoutubePlayer
          height={height}
          play={playing}
          videoId={"M0imb71GNY4"}
          onChangeState={onStateChange}
        />
      </View>
      <View style={[theme.fRow,theme.faCenter,theme.mt15,theme.px15]}>
        <View style={[{backgroundColor:'#FB0808'},theme.h27,theme.px8,theme.br6,theme.fjCenter,theme.faCenter,theme.me10]}>
          <Text style={[theme['p12-600'],theme.cwhite]}>Live</Text>
        </View>
        <View style={[{backgroundColor:'rgba(255,255,255,.2)'},theme.h27,theme.px8,theme.br6,theme.fjCenter,theme.faCenter]}>
          <View style={[theme.fRow,theme.faCenter]}>
          <Image source={require('../assets/images/icons/eye.png')} style={[theme.w15,theme.h15,{objectFit:'contain'}]}/>
          <Text style={[theme['p12-600'],theme.cwhite,theme.ms5]}>1.9K</Text>
          </View>
        </View>
      </View>
      <ScrollView style={[]}>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LiveStreaming