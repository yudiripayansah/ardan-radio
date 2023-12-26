import React, {useEffect, useContext, useState} from 'react';
import {View, Image, TouchableOpacity, TextInput, Text} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';
// import SvgUri from './Svg';
import Icons from './Icons';
const Header = ({navigation, ...props}) => {
  const route = useRoute();
  const {currentScreen} = props;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const [header, setHeader] = useState(Object);
  const doLogout = () => {
    removeUser();
  };
  const menu = [
    {
      icon: Icons.menuContent,
      title: 'Content',
      target: () => {
        navigation.navigate('ArdanContent');
      },
    },
    {
      icon: Icons.menuSocial,
      title: 'Social',
      target: () => {
        navigation.navigate('Social');
      },
    },
    {
      icon: Icons.menuNews,
      title: 'News',
      target: () => {
        navigation.navigate('News');
      },
    },
    {
      icon: Icons.menuEvents,
      title: 'Event',
      target: () => {
        navigation.navigate('Event');
      },
    },
  ];
  const CLogo = () => {
    return (
      <></>
      // <Image
      //   source={require('../assets/images/logo-ardan-simple.png')}
      //   style={[theme.w50]}
      // />
    );
  };
  const CSearch = () => {
    return (
      <TextInput
        placeholder="Search..."
        style={[
          {backgroundColor: '#12120B'},
          theme.cwhite,
          theme.br14,
          theme['h10-500'],
          theme.h40,
          theme.w165,
          theme.px10,
          theme.fjCenter,
          {textAlignVertical: 'center'},
        ]}
        placeholderTextColor="#4F4F3F"
        multiline
        numberOfLines={1}
      />
    );
  };
  const CTitle = () => {
    return (
      <Text style={[theme['h20-600'], theme.cwhite]}>{currentScreen}</Text>
    );
  };
  const CNotif = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notifications');
        }}>
        <Icon name="bell" size={20} color="#fff" />
      </TouchableOpacity>
    );
  };
  const CBack = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="angle-left" size={30} color="#fff" />
      </TouchableOpacity>
    );
  };
  const CFavorite = () => {};
  const HeaderHome = () => {
    return (
      <>
        <View
          style={[
            {backgroundColor: '#28353b'},
            theme.wp100,
            theme.py25,
            theme.px40,
            theme.fRow,
            theme.fjBetween,
            theme.faCenter,
          ]}>
          <View style={[theme.fRow, theme.faCenter]}>
            <View
              style={[
                theme.faCenter,
                theme.fjCenter,
                theme.w35,
                theme.h35,
                {backgroundColor: '#fff', borderColor: '#F8C303'},
                theme.br100,
                theme.bsolid,
                theme.bw2,
                theme.me17,
              ]}>
              <Image source={Icons.user} style={[{objectFit:'contain',width:20}]}/>
            </View>
            <View>
              <Text style={[theme['h15-700'], {color: '#fff'}]}>
                Welcome back!
              </Text>
              <Text
                style={[
                  theme['h12-400'],
                  {color: '#fff', opacity: 0.5, marginTop: -5},
                ]}>
                {user.name}
              </Text>
            </View>
          </View>
          <View style={[theme.fRow]}>
            <TouchableOpacity style={[theme.me10]}>
              <Image source={Icons.search} width={25} height={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Notifications')}}>
              <Image source={Icons.notif} width={25} height={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            {backgroundColor: '#21292f'},
            theme.wp100,
            theme.py17,
            theme.px40,
            theme.fRow,
            theme.faCenter,
            theme.fjBetween,
          ]}>
          {menu.map(item => {
            return (
              <TouchableOpacity
                style={[theme.faCenter, theme.fjCenter]}
                onPress={item.target}>
                <View
                  style={[
                    {backgroundColor: '#F8C303'},
                    theme.br100,
                    theme.h55,
                    theme.w55,
                    theme.faCenter,
                    theme.fjCenter,
                  ]}>
                  <Image source={item.icon} width={35} />
                </View>
                <Text
                  style={[
                    {color: '#fff', letterSpacing: 0.3},
                    theme['h10-500'],
                    theme.mt5,
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };
  const HeaderTitle = () => {
    return (
      <>
        <View
          style={[
            {backgroundColor: '#28353b'},
            theme.wp100,
            theme.py15,
            theme.px20,
            theme.fRow,
            theme.fjBetween,
            theme.faCenter,
          ]}>
          <View style={[theme.wp20]}>
            <TouchableOpacity style={[theme.me10]} onPress={()=>{navigation.goBack();}}>
              <Image source={Icons.back} width={25} height={25} />
            </TouchableOpacity>
          </View>
          <View style={[theme.fRow, theme.faCenter]}>
            <Text style={[theme['h18-700'], {color: '#fff'}]}>
              {currentScreen}
            </Text>
          </View>
          <View style={[theme.fRow,theme.wp20,theme.fjEnd]}>
            <TouchableOpacity style={[theme.me10]} onPress={()=>{}}>
              <Image source={Icons.search} width={25} height={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Notifications');}}>
              <Image source={Icons.notif} width={25} height={25} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  const getHeader = () => {
    if (currentScreen == 'Home') {
      return <HeaderHome />;
    } else {
      return <HeaderTitle />;
    }
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        setHeader();
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <View
      style={[
        theme.wp100,
        theme.fRow,
        theme.fjBetween,
        theme.faCenter,
        theme.absolute,
        theme.top0,
        {zIndex: 2},
      ]}>
      {getHeader()}
    </View>
  );
};

export default Header;
