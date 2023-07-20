import React, {useEffect, useContext, useState} from 'react';
import {Text, View, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import TrackPlayer from 'react-native-track-player';
import { TouchableOpacity } from 'react-native-gesture-handler';
TrackPlayer.registerPlaybackService(() => require('../services/TrackPlayer.js'));
const Nav = ({navigation, ...props}) => {
  const theme = useContext(ThemeContext);
  const [radio,setRadio] = useState('paused')
  const {currentScreen} = props;
  const image = {
    home: require('../assets/images/icons/nav-home.png'),
    radio: require('../assets/images/icons/nav-radio.png'),
    profile: require('../assets/images/icons/nav-profile.png'),
    bg: require('../assets/images/nav-bg.png')
  };
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
    if(playerState === 'stopped'){
      await TrackPlayer.reset();
    }
    if (playerState === 'paused' || playerState === 'ready' || playerState === 'idle' || playerState === 'connecting' || playerState === 'stopped') {
      await TrackPlayer.play();
      setRadio('paused')
    } else {
      await TrackPlayer.pause();
      setRadio('playing')
    }
    console.log('Radio State',radio)
  };
  useEffect(() => {
    setupTrackPlayer();
  }, []);
  return (
    <>
    {
      (currentScreen != 'LiveStreaming') ? (
        <View style={[theme.absolute,theme.right10,theme.bottom300]}>
          <TouchableOpacity onPress={()=>{navigation.navigate('LiveStreaming')}}>
            <View style={[theme.w70,theme.h70,theme.bgyellow,theme.faCenter,theme.fjCenter,theme.br200,{overflow:'hidden'}]}>
            <Image source={require('../assets/images/icons/played-banner.png')} style={[theme.wp100,theme.h50,{objectFit:'contain'}]}/>
            </View>
            <View style={[{backgroundColor:'#EB4646'},theme.fRow,theme.faCenter,theme.fjCenter,theme.br100]}>
              <Text style={[theme['h11-500'],theme.cwhite,theme.me5]}>Live</Text>
              <Image source={require('../assets/images/icons/network-white.png')}/>
            </View>
          </TouchableOpacity>
        </View>
      ) : ''
    }
    {
      (currentScreen != 'Ardan Radio' && currentScreen != 'LiveStreaming' && (radio == 'paused')) ? (
        <View style={[theme.absolute,theme.bgblack,theme.p10,theme.bottom0,theme.wp100,theme.fRow,theme.faStart,theme.fjBetween,theme.pb110,theme.bsolid,theme.btw1,theme.byellow]}>
          <Image source={require('../assets/images/icons/played-banner.png')} style={[theme.w60,theme.h35]}/>
          <View style={[theme.mx15]}>
            <Text style={[theme['h14-500'],theme.cwhite]}>Ardan Radio 105.9 FM</Text>
            <Text style={[theme['h12-400'],{color:'#919191'}]}>Radio Anak Muda No. 1 Di Bandung</Text>
          </View>
          <TouchableOpacity onPress={()=>{handlePlayPause()}}>
            <Image source={require('../assets/images/icons/btn-pause.png')} style={[theme.w35,theme.h35]}/>
          </TouchableOpacity>
        </View>
      ) : ''
    }
    <ImageBackground source={image.bg} resizeMode="cover" style={[theme.absolute, theme.bottom0, theme.wp100, theme.h70, theme.fRow, theme.fjCenter, theme.faStart, {backgroundPosition: 'center center', backgroundSize: '100% 50px'}]}>
      <TouchableWithoutFeedback onPress={()=>{navigation.navigate('Home')}}>
        <View style={[theme.faCenter, theme.fjCenter, theme.pt13, theme.w40]}>
          <Image source={image.home}/>
          <Text style={[theme['h10-500'], theme.cyellow]}>Home</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>{
        navigation.navigate('Radio')
        handlePlayPause()
      }}>
        <View style={[theme.mx80, theme.fjCenter, theme.faCenter, theme.mmt35, theme.w70]}>
          <View style={[theme.w70,theme.h70,theme.br100,theme.faCenter,theme.fjCenter,theme.bgblack_chocolate, theme.mb13,theme.relative]}>
            <Image source={image.radio}/>
            {
              (currentScreen == 'Ardan Radio') ? (
                <View style={[theme.absolute,theme.w70,theme.h70,theme.br100,{backgroundColor:'fill: rgba(248, 195, 3, 0.50);'},theme.faCenter,theme.fjCenter]}>
                  {
                    (radio == 'paused' || radio == 'buffering') ? (
                      <Image source={require('../assets/images/icons/pause.png')}/>
                    ) : (
                      <Image source={require('../assets/images/icons/play-black.png')}/>
                    )
                  }
                </View>
              ) : ''
            }
            
          </View>
          <Text style={[theme['h10-500'], theme.cyellow]}>Radio Stream</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>{navigation.navigate('Profile')}}>
        <View style={[theme.faCenter, theme.fjCenter, theme.pt13, theme.w40]}>
          <Image source={image.profile}/>
          <Text style={[theme['h10-500'], theme.cyellow]}>Profile</Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
    </>
  );
};

export default Nav;
