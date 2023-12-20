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
import TrackPlayer from 'react-native-track-player';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
const Nav = ({navigation, ...props}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const [radio, setRadio] = useState('paused');
  const {currentScreen} = props;
  const image = {
    home: require('../assets/images/icons/nav-home.png'),
    radio: require('../assets/images/icons/nav-radio.png'),
    plus: require('../assets/images/icons/btn-plus.png'),
    profile: require('../assets/images/icons/nav-profile.png'),
    bg: require('../assets/images/nav-bg.png'),
  };
  const setupTrackPlayer = async () => {
    try {
      await TrackPlayer.registerPlaybackService(() =>
        require('../services/TrackPlayer.js'),
      );
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: '1',
        url: 'https://n09.rcs.revma.com/1q762wy5a9hvv.m4a?1675997040=&rj-tok=AAABhjk-eo4Aj03-Z03mDUOA_A&rj-ttl=5',
        title: 'Ardan FM',
        artist: 'Ardan Radio',
        artwork:
          'https://api.radiosworld.info/files/radio/logo/1411605f0a94430b873a6d09580d02cc1c151725.jpeg',
      });
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
    } catch (error) {
      console.log('error init', error);
    }
  };
  const handlePlayPause = async () => {
    try {
      const playerState = await TrackPlayer.getState();
      console.log(playerState);
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
        setRadio('playing');
      } else {
        await TrackPlayer.pause();
        setRadio('paused');
      }
      console.log('Radio State', radio);
    } catch (error) {
      console.log('error toggled', error);
    }
  };
  const DefaultButton = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Radio');
          handlePlayPause();
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
              {backgroundColor:'#29373d'},
              theme.mb13,
              theme.relative,
            ]}>
            <Image source={image.radio} />
            {currentScreen == 'Ardan Radio' ? (
              <View
                style={[
                  theme.absolute,
                  theme.w70,
                  theme.h70,
                  theme.br100,
                  {backgroundColor: 'fill: rgba(248, 195, 3, 0.50);'},
                  theme.faCenter,
                  theme.fjCenter,
                ]}>
                {radio == 'paused' || radio == 'buffering' ? (
                  <Image source={require('../assets/images/icons/pause.png')} />
                ) : (
                  <Image
                    source={require('../assets/images/icons/play-black.png')}
                  />
                )}
              </View>
            ) : (
              ''
            )}
          </View>
          <Text style={[theme['h10-500'], theme.cyellow]}>Radio</Text>
        </View>
      </TouchableWithoutFeedback>
    );
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
  const AnimetedSocialButton = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            onPress={() => console.log('notes tapped!')}>
            <Icon
              name="android-create"
              style={[theme['h12-400'], theme.h22, theme.cwhite]}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {}}>
            <Icon
              name="android-notifications-none"
              style={[theme['h12-400'], theme.h22, theme.cwhite]}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            onPress={() => console.log('notes tapped!')}>
            <Icon
              name="android-create"
              style={[theme['h12-400'], theme.h22, theme.cwhite]}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {}}>
            <Icon
              name="android-notifications-none"
              style={[theme['h12-400'], theme.h22, theme.cwhite]}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            onPress={() => console.log('notes tapped!')}>
            <Icon
              name="android-create"
              style={[theme['h12-400'], theme.h22, theme.cwhite]}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {}}>
            <Icon
              name="android-notifications-none"
              style={[theme['h12-400'], theme.h22, theme.cwhite]}
            />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  };
  useEffect(() => {
    setupTrackPlayer();
  }, []);
  return (
    <>
      {currentScreen == 'Home' ? (
        <View style={[theme.absolute, theme.right10, theme.bottom300]}>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      ) : (
        ''
      )}
      {currentScreen != 'Ardan Radio' &&
      currentScreen != 'LiveStreaming' &&
      radio == 'playing' ? (
        <View
          style={[
            theme.absolute,
            theme.bgblack,
            theme.p10,
            theme.bottom0,
            theme.wp100,
            theme.fRow,
            theme.faStart,
            theme.fjBetween,
            theme.pb110,
            theme.bsolid,
            theme.btw1,
            theme.byellow,
          ]}>
          <Image
            source={require('../assets/images/icons/played-banner.png')}
            style={[theme.w60, theme.h35]}
          />
          <View style={[theme.mx15]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>
              Ardan Radio 105.9 FM
            </Text>
            <Text style={[theme['h12-400'], {color: '#919191'}]}>
              Radio Anak Muda No. 1 Di Bandung
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handlePlayPause();
            }}>
            <Image
              source={require('../assets/images/icons/btn-pause.png')}
              style={[theme.w35, theme.h35]}
            />
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}
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
          <View style={[theme.faCenter, theme.fjCenter, theme.pt13, theme.w40]}>
            <Image source={image.home} />
            <Text style={[theme['h10-500'], theme.cyellow]}>Home</Text>
          </View>
        </TouchableWithoutFeedback>
        {(currentScreen == 'Ardan Social' && user.role != 'guest') ? <SocialButton /> : <DefaultButton />}
        <TouchableWithoutFeedback
          onPress={() => {
            if(user.role == 'guest'){
              removeUser()
            } else {
              navigation.navigate('Profile');
            }
          }}>
          <View style={[theme.faCenter, theme.fjCenter, theme.pt13, theme.w40]}>
            <Image source={image.profile} />
            <Text style={[theme['h10-500'], theme.cyellow]}>Profile</Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </>
  );
};

export default Nav;
