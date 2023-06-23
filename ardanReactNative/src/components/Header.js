import React, {useEffect, useContext} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
const Home = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const doLogout = () => {
    removeUser();
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <View style={[theme.wp100, theme.fRow, theme.fjBetween, theme.faCenter, theme.p10, theme.absolute, theme.top0, theme.bgblack, {zIndex: 2}]}>
      <View style={[theme.wp20]}>
        <Image source={require('../assets/images/logo-ardan-simple.png')} style={[theme.w50]}/>
      </View>
      <View style={[theme.wp60, theme.faCenter]}>
        <TextInput placeholder="Search..." style={[{backgroundColor:'#12120B'}, theme.cwhite,theme.br14,theme['h10-500'], theme.h40,theme.w165, theme.px10, theme.fjCenter, {textAlignVertical: 'center'}]} placeholderTextColor="#4F4F3F" multiline numberOfLines={1}/>
      </View>
      <View style={[theme.wp20, theme.faEnd]}>
        <TouchableOpacity>
          <Image source={require('../assets/images/icons/notif.png')} style={[theme.w20]}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;