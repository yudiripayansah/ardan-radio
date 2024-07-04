import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Animated,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import {useRoute} from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import AutoHeightImage from 'react-native-auto-height-image';
import usePushNotification from '../hook/usePushNotification';
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';
import Api from '../config/Api';
// import SvgUri from './Svg';
import Icons from './Icons';
import messaging from '@react-native-firebase/messaging';
const Header = ({navigation, ...props}) => {
  const profileImageWidth = useWindowDimensions().width - 40;
  const acProfile = useRef(null);
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();
  const route = useRoute();
  const screenWidth = useWindowDimensions().width
  const widthAnim = useRef(new Animated.Value(screenWidth)).current;
  const opacityAnim = useRef(new Animated.Value(100)).current;
  const [keyword, setKeyword] = useState(null);
  const {currentScreen} = props;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const [openSearch, setOpenSearch] = useState(false);
  const [dUser, setDUser] = useState({});
  const doLogout = () => {
    removeUser();
  };
  const menu = [
    {
      icon: Icons.menuSocial,
      title: 'Social',
      target: () => {
        navigation.navigate('Social', {activeTab: 'Post'});
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
      icon: Icons.menuContent,
      title: 'Content',
      target: () => {
        navigation.navigate('ArdanContent');
      },
    },
    {
      icon: Icons.menuEvents,
      title: 'Event',
      target: () => {
        navigation.navigate('Event');
      },
    }
  ];
  const doSearch = keyword => {
    toggleSearch();
    navigation.navigate('Search', {
      keyword: keyword,
    });
  };
  const toggleSearch = () => {
    let width = 0;
    if (openSearch) {
      width = screenWidth;
    }
    setOpenSearch(!openSearch);
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: width,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const SearchBar = () => {
    return (
      <Animated.View
        style={[
          theme.absolute,
          theme.left0,
          theme.right0,
          theme.faCenter,
          theme.fjCenter,
          theme.bottom0,
          theme.top0,
          {
            transform: [
              {
                translateX: widthAnim,
              },
            ],
            backgroundColor: '#28353b',
          },
        ]}>
        <View
          style={[
            theme.fRow,
            theme.faCenter,
            {backgroundColor: '#12120B',
            flexWrap: 'nowrap'},
            theme.br12,
            theme.px20,
            theme.wp90,
          ]}>
          <TouchableOpacity
            style={[theme.me10]}
            onPress={() => {
              toggleSearch();
            }}>
            <Image source={Icons.back} style={[{height:25,width:25,objectFit:'contain'}]} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search..."
            style={[theme.cwhite, theme['p14-400'], theme.wp75, theme.h40]}
            placeholderTextColor="#fff"
            onSubmitEditing={e => {
              doSearch(e.nativeEvent.text);
            }}
            clearButtonMode="while-editing"
          />
        </View>
      </Animated.View>
    );
  };
  const HeaderHome = () => {
    return (
      <View style={[theme.wp100]}>
        <AcsProfile/>
        <View
          style={[
            // {backgroundColor: '#28353b'},
            theme.bgyellow,
            theme.wp100,
            theme.py5,
            theme.px20,
            theme.fRow,
            theme.fjBetween,
            theme.faCenter,
            theme.relative,
          ]}>
          <View style={[theme.fRow, theme.faCenter]}>
            <TouchableOpacity
              onPress={()=>{
                if (user.role == 'guest') {
                  removeUser();
                } else {
                  navigation.navigate('MyProfile');
                }
              }}
              style={[
                theme.faCenter,
                theme.fjCenter,
                theme.w35,
                theme.h35,
                {backgroundColor: '#fff', borderColor: '#28353b', overflow: 'hidden'},
                theme.br100,
                theme.bsolid,
                theme.bw2,
                theme.me17,
              ]}>
              <Image
                source={user.image_url ? {uri:user.image_url} : Icons.user}
                style={[{objectFit: 'contain', width: user.image_url ? 35: 20,height: user.image_url ? 35: 20}]}
              />
            </TouchableOpacity>
            <View>
              <Text style={[theme['h15-700'], {color: '#28353b'}]}>
                Welcome back!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (user.role == 'guest') {
                    removeUser();
                  } else {
                    navigation.navigate('MyProfile');
                  }
                }}>
                <Text
                  style={[
                    theme['h12-600'],
                    {color: '#28353b', opacity: 0.5, marginTop: -5},
                  ]}>
                  {user.name}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[theme.fRow]}>
            <TouchableOpacity
              style={[theme.me10]}
              onPress={() => {
                toggleSearch();
              }}>
              <Image source={Icons.searchDark} style={[{height:25,width:25,objectFit:'contain'}]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notifications');
              }}>
              <Image source={Icons.notifDark} style={[{height:25,width:25,objectFit:'contain'}]} />
            </TouchableOpacity>
          </View>
          <SearchBar />
        </View>
        <View
          style={[
            {backgroundColor: '#21292f'},
            theme.wp100,
            theme.py10,
            theme.px20,
            theme.fRow,
            theme.faCenter,
            theme.fjBetween,
          ]}>
          {menu.map((item, index) => {
            return (
              <TouchableOpacity
                style={[theme.faCenter, theme.fjCenter]}
                onPress={item.target}
                key={index}>
                <View
                  style={[
                    theme.br100,
                    theme.h45,
                    theme.w45,
                    theme.faCenter,
                    theme.fjCenter,
                  ]}>
                  <Image source={item.icon} style={[{width: 45,height: 45, objectFit:'contain'}]} />
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
      </View>
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
            theme.relative,
          ]}>
          <View style={[theme.wp20]}>
            <TouchableOpacity
              style={[theme.me10]}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={Icons.back} style={[{height:25,width:25,objectFit:'contain'}]} />
            </TouchableOpacity>
          </View>
          <View style={[theme.fRow, theme.faCenter]}>
            <Text style={[theme['h18-700'], {color: '#fff'}]}>
              {currentScreen}
            </Text>
          </View>
          <View style={[theme.fRow, theme.wp20, theme.fjEnd]}>
            <TouchableOpacity
              style={[theme.me10]}
              onPress={() => {
                toggleSearch();
              }}>
              <Image source={Icons.search} style={[{height:25,width:25,objectFit:'contain'}]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notifications');
              }}>
              <Image source={Icons.notif} style={[{height:25,width:25,objectFit:'contain'}]} />
            </TouchableOpacity>
          </View>
          <SearchBar />
        </View>
      </>
    );
  };
  const AcsProfile = () => {
    return (
      <ActionSheet ref={acProfile} isModal={true}>
        <View style={[theme.px20, theme.py15, theme.bgblack,theme.hp100,theme.fjCenter,theme.faCenter]}>
          <View style={[theme.absolute,theme.top15,theme.right15]}>
            <TouchableOpacity onPress={() => {hideAcp()}}>
              <Icon name="close" size={30} color="#F8C303" />
            </TouchableOpacity>
          </View>
          <AutoHeightImage
            contentWidth={profileImageWidth}
            width={profileImageWidth}
            source={
              dUser.image
                ? {uri: dUser.image_url}
                : {
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                  }
            }
          />
        </View>
      </ActionSheet>
    );
  };
  const hideAcp = () => {
    acProfile.current?.hide();
  };
  const showAcp = item => {
    acProfile.current?.show();
  };
  const getHeader = () => {
    if (currentScreen == 'Home') {
      return <HeaderHome />;
    } else {
      return <HeaderTitle />;
    }
  };
  const registerToken = async () => {
    let token = await getFCMToken();
    try {
      let payload = {
        id_user: user.id ? user.id : 0,
        name: user.name,
        token: token,
      };
      let req = await Api.registerToken(payload);
    } catch (error) {
      console.error('Register Token:',error);
    }
  };
  const foregroundnotif = async () => {
    const unsubscribe = messaging().onMessage(async msg => {
      // console.log(msg.data);
    });
  };
  const getUser = async () => {
    let id = user.id;
    try {
      let theData = {};
      let payload = {
        id: id,
      };
      let req = await Api.userGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setDUser(theData);
    } catch (error) {
      console.error(error);
      setDUser({});
    }
  };
  useEffect(() => {
    onNotificationOpenedAppFromQuit();
    listenToBackgroundNotifications();
    foregroundnotif();
    listenToForegroundNotifications();
    onNotificationOpenedAppFromBackground();
    registerToken();
    getUser();
  }, []);

  return (
    <KeyboardAvoidingView
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
    </KeyboardAvoidingView>
  );
};

export default Header;
