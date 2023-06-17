import React, {useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
const Nav = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const icon = {
    home: require('../assets/images/icons/nav-home.png'),
    gift: require('../assets/images/icons/nav-home.png'),
    newspaper: require('../assets/images/icons/nav-home.png'),
    time: require('../assets/images/icons/nav-home.png'),
    user: require('../assets/images/icons/nav-home.png'),
  };
  useEffect(() => {
    
  }, []);
  return (
    <>
      <View
        style={[
          theme.bgSecondary,
          theme.container,
          theme.alignCenter,
          theme.justifyCenter,
          theme.boxNavigation,
          theme.flexRow,
          theme.py1,
          theme.borderRounded,
        ]}>
        <TouchableOpacity
          style={[
            theme.boxNavigationBtn,
            theme.alignCenter,
            theme.justifyCenter,
            theme.borderPill,
          ]}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Image style={[theme.boxNavigationImage]} source={icon.home} />
          <Text style={[theme.textWhite, theme.textBody2]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            theme.boxNavigationBtn,
            theme.alignCenter,
            theme.justifyCenter,
            theme.borderPill,
          ]}
          onPress={() => {
            navigation.navigate('Radio');
          }}>
          <Image style={[theme.boxNavigationImage]} source={icon.time} />
          <Text style={[theme.textWhite, theme.textBody2]}>Radio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            theme.boxNavigationBtn,
            theme.alignCenter,
            theme.justifyCenter,
            theme.borderPill,
          ]}
          onPress={() => {
            navigation.navigate('LiveStreaming');
          }}>
          <Image style={[theme.boxNavigationImage]} source={icon.gift} />
          <Text style={[theme.textWhite, theme.textBody2, theme.textCenter]}>Live Streaming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            theme.boxNavigationBtn,
            theme.alignCenter,
            theme.justifyCenter,
            theme.borderPill,
          ]}
          onPress={() => {
            navigation.navigate('Music');
          }}>
          <Image style={[theme.boxNavigationImage]} source={icon.newspaper} />
          <Text style={[theme.textWhite, theme.textBody2]}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            theme.boxNavigationBtn,
            theme.alignCenter,
            theme.justifyCenter,
            theme.borderPill,
          ]}
          onPress={() => {
            navigation.navigate('Feed');
          }}>
          <Image style={[theme.boxNavigationImage]} source={icon.user} />
          <Text style={[theme.textWhite, theme.textBody2]}>Feed</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Nav;
