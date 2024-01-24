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
  Dimensions,
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
const Radio = ({navigation}) => {
  const scrollViewRef = useRef();
  const mainScrollViewRef = useRef();
  const imageWidth = Dimensions.get('window').width - 40;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
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
      console.log('current radio', data);
      if (status && data[0]) {
        setCurrentProgram(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const listenChat = async () => {
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://chat.kopikoding.com:6001',
      client: io,
    });
    let listen = echo.channel('publicChat').listen('PublicChatEvent', event => {
      const {target} = event;
      let theChat = radiochat;
      if (target == 'radio') {
        console.log(event);
        theChat.push(event);
        setRadiochat(theChat);
      }
    });
  };
  const sendChat = async () => {
    try {
      let url = 'https://chat.kopikoding.com/publicchat/send';
      let payload = {
        message: msg,
        target: 'radio',
        name: user.name,
      };
      let req = await axios.post(url, payload);
      setMsg('');
      Keyboard.dismiss();
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
            getLike(target,type);
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
          setFav(true,type);
        } else {
          setFav(false,type);
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
      url: 'ardanmobileapps://ProgramDetails/' + id,
    };
    let share = Share.open(opt);
  };
  useEffect(() => {
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
        <ScrollView
          nestedScrollEnabled={true}
          style={[theme.mb70]}
          ref={mainScrollViewRef}>
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
                <Image source={Icons.share} width={16} height={16} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[theme.px20, theme.mt20, theme.mb50]}>
            <View style={[theme.fRow, theme.faCenter]}>
              <Text style={[theme.cwhite, theme['h18-700'], theme.me5]}>
                Live Chat
              </Text>
              <Icon name="feed" size={14} color="#F8C303" />
            </View>
            <ScrollView
              nestedScrollEnabled={true}
              style={[theme.h220, theme.mb10]}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              {radiochat.map((item, i) => {
                return (
                  <View
                    style={[theme.fRow, theme.mb15, theme.faCenter]}
                    key={i}>
                    <View
                      style={[
                        theme.faCenter,
                        theme.fjCenter,
                        theme.w40,
                        theme.h40,
                        theme.br100,
                        theme.me15,
                        {backgroundColor: 'rgba(45, 171, 210, 0.12)'},
                      ]}>
                      <Image
                        source={require('../assets/images/icons/user-grey.png')}
                      />
                    </View>
                    <View style={[theme.wp80]}>
                      <Text
                        style={[
                          theme.cwhite,
                          theme['h10-500'],
                          {opacity: 0.6},
                        ]}>
                        {item.name}
                      </Text>
                      <Text style={[theme.cwhite, theme['h12-500']]}>
                        {item.message}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={[
                {backgroundColor: 'rgba(45, 171, 210, 0.12)'},
                theme.br30,
                theme.ps15,
                theme.fRow,
                theme.faCenter,
                theme.fjBetween,
              ]}>
              <TextInput
                style={[theme.wp85, theme.cwhite, theme['h12-400']]}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Radio;
