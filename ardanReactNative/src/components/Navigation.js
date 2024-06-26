import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import {AuthContext} from '../context/AuthContext';
import {RadioContext} from '../context/RadioContext';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';
import {useProgress} from 'react-native-track-player';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../config/Api';
import SvgUri from 'react-native-svg-uri';
import Draggable from 'react-native-draggable';
// import SvgUri from './Svg';
import Icons from './Icons';
const Nav = ({navigation, ...props}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const {radioAct} = useContext(RadioContext);
  const [radio, setRadio] = useState('paused');
  const [showLive, setShowLive] = useState(true);
  const [liveAvailable, setLiveAvailable] = useState(false);
  const {currentScreen} = props;
  const image = {
    home: require('../assets/images/icons/nav-home.png'),
    radio: require('../assets/images/icons/nav-radio.png'),
    plus: require('../assets/images/icons/btn-plus.png'),
    profile: require('../assets/images/icons/nav-profile.png'),
    bg: require('../assets/images/nav-bg.png'),
  };
  // const url = 'https://n09.rcs.revma.com/1q762wy5a9hvv.m4a?1675997040=&rj-tok=AAABhjk-eo4Aj03-Z03mDUOA_A&rj-ttl=5'
  const url = 'https://stream.rcs.revma.com/ugpyzu9n5k3vv'
  const track = {
    id: '1',
    url: url,
    title: 'Ardan FM',
    artist: 'Ardan Radio',
    artwork: 'https://api.radiosworld.info/files/radio/logo/1411605f0a94430b873a6d09580d02cc1c151725.jpeg',
  };
  const [currentProgram, setCurrentProgram] = useState({
    image: null,
    title: null,
    penyiar_name: null,
    text: null,
  });
  const {position, buffered, duration} = useProgress();
  const setupTrackPlayer = async () => {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    }
    catch {
      TrackPlayer.registerPlaybackService(() =>
        require('../services/TrackPlayer.js'),
      );
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(track);
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        progressUpdateEventInterval: 2,
      });
      isSetup = true;
      const playerState = await TrackPlayer.getState();
      if (
        playerState === 'paused' ||
        playerState === 'ready' ||
        playerState === 'idle' ||
        playerState === 'connecting' ||
        playerState === 'stopped'
      ) {
        setRadio('paused');
      } else {
        setRadio('playing');
      }
    }
    finally {
      return isSetup;
    }
  };
  const handlePlayPause = async () => {
    if((currentScreen != 'Ardan Radio' && radio == 'paused') || currentScreen == 'Ardan Radio'){
      try {
        let playerState = await TrackPlayer.getState();
        if (playerState === 'stopped') {
          await TrackPlayer.reset();
        }
        if (
          playerState === 'paused' ||
          playerState === 'ready' ||
          playerState === 'idle' ||
          playerState === 'connecting' ||
          playerState === 'stopped' ||
          playerState === 'idle'
        ) {
          await TrackPlayer.play();
          playerState = await TrackPlayer.getState();
          console.log(playerState);
          setRadio('playing');
          radioAct.setRadio('playing')
          getCurrentProgram();
        } else {
          await TrackPlayer.pause();
          await TrackPlayer.reset();
          await TrackPlayer.add(track);
          playerState = await TrackPlayer.getState();
          console.log(playerState);
          setRadio('paused');
          radioAct.setRadio('paused')
        }
      } catch (error) {
        console.log('error toggled', error);
      }
    }
  };
  const checkRadioState = async () => {
      try {
        const playerState = await TrackPlayer.getState();
        console.log('playerState', playerState);
        if (
          playerState === 'paused' ||
          playerState === 'ready' ||
          playerState === 'idle' ||
          playerState === 'connecting' ||
          playerState === 'stopped' ||
          playerState === 'idle'
        ) {
          radioAct.setRadio('paused')
        } else {
          radioAct.setRadio('playing')
        }
      } catch (error) {
        console.log('error toggled', error);
        radioAct.setRadio('paused')
      }
  };
  const DefaultButton = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Radio');
          handlePlayPause()
        }}>
        <View
          style={[
            theme.mx80,
            theme.fjCenter,
            theme.faCenter,
            theme.mmt35,
            theme.w70,
          ]}>
          <View
            style={[
              theme.w70,
              theme.h70,
              theme.br100,
              theme.faCenter,
              theme.fjCenter,
              {backgroundColor: '#29373d'},
              theme.mb13,
              theme.relative,
            ]}>
            <Image source={image.radio} style={[{width:49,height:49,objectFit:'contain'}]}/>
            {currentScreen == 'Ardan Radio' ? (
              <View
                style={[
                  theme.absolute,
                  theme.w70,
                  theme.h70,
                  theme.br100,
                  {backgroundColor: '#29373d'},
                  theme.faCenter,
                  theme.fjCenter,
                ]}>
                {radio == 'paused' || radio == 'buffering' ? (
                  <Icon name="play" color="#FDD100" size={40} />
                ) : (
                  <Icon name="stop" color="#FDD100" size={40} />
                )}
              </View>
            ) : (
              ''
            )}
          </View>
          <Text style={[theme['h10-500'], {color: '#fff'}]}>Radio</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const toggleLive = () => {
    setShowLive(!showLive);
  };
  const SocialButton = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('CreateFeed');
        }}>
        <View
          style={[
            theme.mx80,
            theme.fjCenter,
            theme.faCenter,
            theme.mmt35,
            theme.w70,
          ]}>
          <TouchableOpacity
            style={[
              theme.w70,
              theme.h70,
              theme.br100,
              theme.faCenter,
              theme.fjCenter,
              theme.bgyellow,
              theme.mb13,
              theme.relative,
            ]}>
            <Image source={image.plus} />
          </TouchableOpacity>
          <Text style={[theme['h10-500'], theme.cyellow]}>Add</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const LiveButton = () => {
    return (
      <View
        style={[
          theme.bottom300,
          !showLive ? (theme.right0, theme.relative) : null,
        ]}>
        {showLive ? (
          <Draggable x={290} y={60}>
            <View style={[theme.relative]}>
              <TouchableOpacity
                style={[
                  theme.absolute,
                  theme.br100,
                  {backgroundColor: '#fff', top: -10, right: -10},
                ]}
                onPress={() => {
                  toggleLive();
                }}>
                <Icon name="close" color="#1d2226" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LiveStreaming');
                }}>
                <View
                  style={[
                    theme.w70,
                    theme.h70,
                    theme.bgyellow,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.br200,
                    {overflow: 'hidden'},
                  ]}>
                  <Image
                    source={require('../assets/images/icons/played-banner.png')}
                    style={[theme.wp100, theme.h50, {objectFit: 'contain'}]}
                  />
                </View>
                <View
                  style={[
                    {backgroundColor: '#EB4646'},
                    theme.fRow,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.br100,
                  ]}>
                  <Text style={[theme['h11-500'], theme.cwhite, theme.me5]}>
                    Live
                  </Text>
                  <Image
                    source={require('../assets/images/icons/network-white.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Draggable>
        ) : (
          <TouchableOpacity
            style={[
              {backgroundColor: '#EB4646'},
              theme.faCenter,
              theme.fjCenter,
              theme.br5,
              theme.py5,
              theme.px10,
              theme.absolute,
              theme.right0,
            ]}
            onPress={() => {
              toggleLive();
            }}>
            <Text style={[theme['h11-500'], theme.cwhite]}>L</Text>
            <Text style={[theme['h11-500'], theme.cwhite]}>I</Text>
            <Text style={[theme['h11-500'], theme.cwhite]}>V</Text>
            <Text style={[theme['h11-500'], theme.cwhite]}>E</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const RadioPlayer = () => {
    return (
      <View
        style={[
          theme.absolute,
          {backgroundColor: 'rgba(29,34,38,.9)'},
          theme.p10,
          theme.px40,
          currentScreen == 'Home' ? theme.top140 : theme.top63,
          theme.wp100,
          theme.fRow,
          theme.faCenter,
          theme.fjBetween,
          theme.bsolid,
          theme.btw1,
          theme.byellow,
        ]}>
        <TouchableOpacity
          style={[theme.fRow, theme.faCenter]}
          onPress={() => {
            navigation.navigate('Radio');
          }}>
          <Image
            source={(currentProgram.image) ? {uri: currentProgram.image} : require('../assets/images/radio-play-cover.png')}
            style={[
              theme.w35,
              theme.h35,
              theme.bsolid,
              theme.bw2,
              {borderColor: '#F8C303'},
              theme.br34,
            ]}
          />
          <View style={[theme.mx15]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>
              Live - {currentProgram.title ? currentProgram.title : 'Ardan Radio'}
            </Text>
            <Text style={[theme['h12-400'], {color: '#919191'}]}>
              {currentProgram.penyiar_name}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Radio');
          }}
          style={[
            theme.w35,
            theme.h35,
            theme.faCenter,
            theme.fjCenter,
            theme.br40,
            {backgroundColor: '#F8C303'},
          ]}>
          <Icon name="stop" color="#1d2226" />
        </TouchableOpacity>
      </View>
    );
  };
  const getCurrentProgram = async () => {
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let minutes = date.getMinutes().toString();
    minutes = minutes.padStart(2, '0');
    let payload = {
      day: day,
      time: `${hour}:${minutes}`,
    };
    try {
      let req = await Api.programsGet(payload);
      const {status, data, msg} = req.data;
      if (status && data[0]) {
        setCurrentProgram(data[0]);
      }
    } catch (error) {
      console.log('error current program:',error);
    }
  };
  const getLiveStream = async () => {
    let date = new Date(),
      d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear();
    let payload = {
      date: `${y}-${m}-${d}`,
    };
    try {
      let req = await Api.livestreamingsGet(payload);
      let {status, data, msg} = req.data;
      if (status) {
        setLiveAvailable(true)
      }
    } catch (error) {
      console.log('Live stream error', error);
    }
  };
  useEffect(() => {
    setupTrackPlayer();
    getCurrentProgram();
    getLiveStream()
    checkRadioState()
  }, []);
  return (
    <>
      {currentScreen == 'Home' ? liveAvailable ? <LiveButton />: '' : ''}
      {currentScreen != 'Ardan Radio' && radio == 'playing' ? <RadioPlayer /> : ''}
      <ImageBackground
        source={image.bg}
        resizeMode="cover"
        style={[
          theme.absolute,
          theme.bottom0,
          theme.wp100,
          theme.h70,
          theme.fRow,
          theme.fjCenter,
          theme.faStart,
          {backgroundPosition: 'center center', backgroundSize: '100% 50px'},
        ]}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <View
            style={[
              theme.faCenter,
              theme.fjCenter,
              theme.pt13,
              theme.w40,
              theme.btw2,
              theme.bsolid,
              {
                borderColor:
                  currentScreen == 'Home' ? '#FDD100' : 'transparent',
              },
            ]}>
            {currentScreen == 'Home' ? (
              <Image source={Icons.navHomeActive} style={[{height:30,width:30,objectFit:'contain'}]}/>
            ) : (
              <Image source={Icons.navHome} style={[{height:30,width:30,objectFit:'contain'}]}/>
            )}
            <Text
              style={[
                theme['h10-500'],
                {
                  color: currentScreen == 'Home' ? '#FDD100' : '#FFF',
                },
              ]}>
              Home
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {(currentScreen == 'Ardan Social' || currentScreen == 'My Profile') && user.role != 'guest' ? (
          <SocialButton />
        ) : (
          <DefaultButton />
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            if (user.role == 'guest') {
              removeUser();
            } else {
              navigation.navigate('MyProfile');
            }
          }}>
          <View
            style={[
              theme.faCenter,
              theme.fjCenter,
              theme.pt13,
              theme.w40,
              theme.btw2,
              theme.bsolid,
              {
                borderColor:
                  currentScreen == 'My Profile' ? '#FDD100' : 'transparent',
              },
            ]}>
            {currentScreen == 'My Profile' ? (
              <Image source={Icons.navProfileActive} style={[{height:30,width:30,objectFit:'contain'}]}/>
            ) : (
              <Image source={Icons.navProfile} style={[{height:30,width:30,objectFit:'contain'}]}/>
            )}
            {/* <Image source={image.profile} /> */}
            <Text
              style={[
                theme['h10-500'],
                {
                  color: currentScreen == 'My Profile' ? '#FDD100' : '#FFF',
                },
              ]}>
              Profile
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </>
  );
};

export default Nav;
