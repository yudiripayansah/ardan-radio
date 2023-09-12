import React, { useEffect, useContext,useState,useCallback } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, Dimensions, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import YoutubePlayer from "react-native-youtube-iframe";
import { WebSocket } from 'react-native-websocket';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';
const LiveStreaming = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const [playing, setPlaying] = useState(true);
  const height = Dimensions.get("window").height;
  const chat = [
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/1.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/2.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/3.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/4.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/1.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/2.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/3.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/4.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/1.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/2.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/3.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/4.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/1.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/2.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/3.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/4.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/1.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/2.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/3.png')
    },
    {
      name: 'Hanna Aminoff',
      chat: 'How are you doing?',
      image: require('../assets/images/user/4.png')
    },
  ]
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
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1}]}>
      <View style={[]}>
        <YoutubePlayer
          height={height}
          play={playing}
          videoId={"M0imb71GNY4"}
          onChangeState={onStateChange}
        />
      </View>
      <View style={[theme.fRow,theme.faCenter,theme.mt15,theme.px15,theme.absolute,theme.top60]}>
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
      <ScrollView style={[theme.px30,theme.my15,theme.absolute,theme.top240,theme.bottom100,theme.wp100]}>
        {
          chat.map((item) => {
            return (
              <View style={[theme.fRow, theme.mb10]}>
                <Image source={item.image} style={[theme.br100,theme.w25,theme.h25,{objectFit:'contain'},theme.me5]}/>
                <View>
                  <Text style={[theme.cwhite,theme['p10-600']]}>{item.name}</Text>
                  <Text style={[theme.cwhite,theme['p10-400']]}>{item.chat}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={[theme.px30, theme.fRow, theme.absolute,theme.bottom50, theme.faCenter,theme.fjBetween]}>
        <View style={[theme.bgwhite,theme.px15,theme.br16,theme.me10,theme.wp80]}>
          <TextInput placeholder="Send Message" style={[theme.cblack,theme['p12-500']]}/>
        </View>
        <TouchableOpacity style={[theme.w43,theme.h43,theme.bgyellow,theme.br100,theme.fjCenter,theme.faCenter]}>
          <Image source={require('../assets/images/icons/heart-o-white.png')}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LiveStreaming