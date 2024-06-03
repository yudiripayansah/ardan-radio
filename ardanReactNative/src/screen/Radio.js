import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  useWindowDimensions,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Echo from 'laravel-echo';
import io from 'socket.io-client';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../config/Api';
import Share from 'react-native-share';
import Icons from '../components/Icons';
import analytics from '@react-native-firebase/analytics';
const Radio = ({navigation}) => {
  const scrollViewRef = useRef();
  const mainScrollViewRef = useRef();
  const imageWidth = useWindowDimensions().width - 40;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [radiochatold, setRadiochatold] = useState([]);
  const [radiochat, setRadiochat] = useState([]);
  const [msg, setMsg] = useState();
  const [ziChat, setZiChat] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [remind, setRemind] = useState(false);
  const [currentProgram, setCurrentProgram] = useState({
    id: null,
    image: null,
    title: null,
    penyiar_name: null,
    text: null,
  });
  const [showC, setShowC] = useState(true);
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
      console.log(error);
    }
  };
  const listenChat = () => {
    let theChat = [...radiochat];
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://ardanmobileapps.ardangroup.fm:6001',
      client: io,
    });
    echo
      .channel('laravel_database_publicChat')
      .listen('PublicChatEvents', event => {
        const {target_type} = event;
        if (target_type == 'radio') {
          console.log('chat count:', theChat.length);
          theChat.push(event);
          setRadiochat(theChat);
        }
      });
  };
  const sendChat = async () => {
    try {
      let url = 'https://ardanmobileapps.ardangroup.fm/api/chat/send';
      let payload = {
        id_user: user.id,
        id_target: 0,
        target_type: 'radio',
        title: user.name,
        chat: msg,
        penyiar: user.penyiar,
        verified: user.verified,
      };
      let req = await axios.post(url, payload);
      setMsg('');
    } catch (error) {
      console.log(error);
    }
  };
  const getChat = async () => {
    try {
      let url = 'https://ardanmobileapps.ardangroup.fm/api/chat/read';
      let payload = {
        page: 1,
        perPage: 50,
        sortDir: 'DESC',
        sortBy: 'id',
        target_type: 'radio',
      };
      let req = await axios.post(url, payload);
      const {status, data, msg} = req.data;
      if (status && data.length > 0) {
        data.sort((a, b) => a.id - b.id);
        setRadiochatold(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showChat = () => {
    let anim = {
      fade: 0,
      slide: 110,
    };
    if (showC) {
      anim.fade = 1;
      anim.slide = 0;
      setZiChat(2);
    } else {
      setZiChat(1);
    }
    setShowC(!showC);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: anim.fade,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: anim.slide,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const sentLike = async (target, type, i) => {
    if (user.role != 'guest') {
      let payload = {
        id_user: user.id,
        id_target: target,
        type: type,
      };
      try {
        let req = await Api.likeCreate(payload, user.access_token);
        if (req.status == 200) {
          let {data, status, msg} = req.data;
          if (status) {
            getLike(target, type);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getLike = async (id, type, idx = null) => {
    let payload = {
      id_target: id,
      type: type,
      id_user: user.id,
    };
    try {
      let req = await Api.likeGet(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status && data) {
          setFav(true, type);
        } else {
          setFav(false, type);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const setFav = (status, type, idx = null) => {
    switch (type) {
      case 'Program':
        setFavorite(status);
        break;
      case 'RemindProgram':
        setRemind(status);
        break;
    }
  };
  const doShare = async id => {
    let opt = {
      title: 'Check cooL Program that i listen to on Ardan Radio',
      message: 'Check cool Program that i listen to on Ardan Radio',
      url: 'https://ardanmobileapps.ardangroup.fm/program/' + id,
    };
    let share = Share.open(opt);
  };
  const chatList = list => {
    return list.map((item, index) => {
      return (
        <View style={[theme.fRow, theme.mb10]} key={index}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {
                id: item.id_user,
              });
            }}>
            <Image
              source={{
                uri:
                  item.user && item.user.image
                    ? item.user.image
                    : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
              }}
              style={[
                theme.br100,
                theme.w25,
                theme.h25,
                {objectFit: 'contain'},
                theme.me5,
              ]}
            />
          </TouchableOpacity>
          <View style={[theme.wp80]}>
            <View style={[theme.fRow, theme.faCenter]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile', {
                    id: item.id_user,
                  });
                }}>
                <Text style={[theme.cwhite, theme['p14-600']]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              {item.penyiar == 'Yes' ? (
                <View
                  style={[
                    theme.br100,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.bgyellow,
                    theme.h10,
                    theme.w10,
                    theme.ms5,
                  ]}>
                  <Icon name="check" size={6} color="#000" />
                </View>
              ) : null}
            </View>
            <Text style={[theme.cwhite, theme['p12-400']]}>{item.chat}</Text>
          </View>
        </View>
      );
    });
  };
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Radio',
      screen_class: 'Radio',
    });
  }
  useEffect(() => {
    gAnalytics()
    getChat();
    listenChat();
    getCurrentProgram();
    getLike(currentProgram.id, 'Program');
    getLike(currentProgram.id, 'RemindProgram');
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={[
          theme.bgblack,
          {flexGrow: 1},
          theme.mt50,
          theme.relative,
          {zIndex: 2},
        ]}>
        <View
          style={[
            {
              backgroundColor: 'rgba(45, 171, 210, 0.12)',
              flexWrap: 'nowrap',
              zIndex: 99999
            },
            theme.br30,
            theme.ps15,
            theme.fRow,
            theme.faCenter,
            theme.fjBetween,
            theme.absolute,
            theme.left0,
            theme.right0,
            theme.bottom115
          ]}>
          <TextInput
            style={[theme.wp75, theme.cwhite, theme['h12-400']]}
            placeholderTextColor={'#fff'}
            onFocus={() =>
              mainScrollViewRef.current.scrollToEnd({animated: true})
            }
            onChangeText={setMsg}
            value={msg}
            onSubmitEditing={() => {
              sendChat();
            }}
            clearButtonMode="while-editing"
          />
          <TouchableOpacity
            style={[
              theme.br30,
              theme.w50,
              theme.h50,
              theme.bgyellow,
              theme.fjCenter,
              theme.faCenter,
            ]}
            onPress={() => {
              sendChat();
            }}>
            <Image source={require('../assets/images/icons/send.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView
          nestedScrollEnabled={true}
          style={[theme.mb170]}
          ref={mainScrollViewRef}
          showsVerticalScrollIndicator={false}>
          <View
            style={[theme.fRow, theme.fjCenter, theme.faCenter, theme.mt25]}>
            {user.id ? (
              <TouchableOpacity
                style={[
                  theme.fRow,
                  theme.faCenter,
                  theme.px15,
                  theme.py5,
                  theme.byellow,
                  theme.bsolid,
                  theme.bw1,
                  theme.br42,
                  theme.wAuto,
                  theme.mx10,
                  theme.fjCenter,
                ]}
                onPress={() => {
                  sentLike(currentProgram.id, 'Program');
                }}>
                <Icon
                  name="heart"
                  size={20}
                  color={favorite ? '#ee0000' : '#fff'}
                />
                <Text style={[theme['h14-600'], theme.cwhite, theme.ms5]}>
                  {favorite ? 'Favorited' : 'Favorite'}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={[
                theme.fRow,
                theme.faCenter,
                theme.px15,
                theme.py5,
                theme.byellow,
                theme.bsolid,
                theme.bw1,
                theme.br42,
                theme.wAuto,
                theme.mx10,
                theme.fjCenter,
              ]}
              onPress={() => {
                navigation.navigate('RadioDetails');
              }}>
              <Image
                source={require('../assets/images/icons/logo-small.png')}
              />
              <Text style={[theme['h14-600'], theme.cwhite, theme.ms5]}>
                Ardan Radio
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[theme.mt35, theme.fjCenter, theme.faCenter]}>
            <View style={[theme.faCenter]}>
              <AutoHeightImage
                contentWidth={imageWidth}
                width={imageWidth}
                source={
                  currentProgram.image
                    ? {uri: currentProgram.image}
                    : require('../assets/images/radio-play-cover.png')
                }
                style={[theme.br10]}
              />
            </View>
            <Text
              style={[
                theme.cwhite,
                theme['h14-500'],
                theme.mt5,
                theme.tCenter,
              ]}>
              {currentProgram.penyiar_name}
            </Text>
            <Text style={[theme.cwhite, theme['h32-600'], theme.tCenter]}>
              {currentProgram.title ? currentProgram.title : 'Ardan Radio'}
            </Text>
            <View style={[theme.fRow, theme.faCenter, theme.fjCenter]}>
              {user.id ? (
                <TouchableOpacity
                  onPress={() => {
                    sentLike(currentProgram.id, 'RemindProgram');
                  }}
                  style={[theme.me5]}>
                  <Icon
                    name="bell"
                    size={20}
                    color={remind ? '#F8C303' : '#fff'}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={[theme.fRow, theme.faCenter, theme.ms5]}
                onPress={() => {
                  doShare(currentProgram.id);
                }}>
                <Image
                  source={Icons.share}
                  style={[{height: 16, width: 16, objectFit: 'contain'}]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[theme.px20, theme.mt20,]}>
            <View style={[theme.fRow, theme.faCenter]}>
              <Text style={[theme.cwhite, theme['h18-700'], theme.me5]}>
                Live Chat
              </Text>
              <Icon name="feed" size={14} color="#F8C303" />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={[theme.h220, theme.mb10]}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              {chatList(radiochatold)}
              {chatList(radiochat)}
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Radio;
