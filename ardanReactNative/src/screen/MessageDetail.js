import Echo from 'laravel-echo';
import io from 'socket.io-client';
import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Animated,
  useWindowDimensions,
} from 'react-native';
import Icons from '../components/Icons';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {RadioContext} from '../context/RadioContext';
import analytics from '@react-native-firebase/analytics';
const MessageDetail = ({route, navigation}) => {
  const screenWidth = useWindowDimensions().width;
  const widthAnim = useRef(new Animated.Value(screenWidth)).current;
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const msgDetail = route.params.data;
  const scrollViewRef = useRef();
  const [msg, setMsg] = useState();
  const [privatechatOld, setPrivatechatOld] = useState([]);
  const [privatechat, setPrivatechat] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);

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
  const getChat = async id => {
    try {
      let url = 'https://ardanmobileapps.ardangroup.fm/api/privatechat/get';
      let payload = {
        page: 1,
        perPage: 20,
        sortDir: 'DESC',
        sortBy: 'id',
        chat_room_id: id,
      };
      let req = await axios.post(url, payload);
      const {status, data, msg} = req.data;
      if (status && data.length > 0) {
        data.sort((a, b) => a.id - b.id);
        setPrivatechatOld(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const listenChat = async () => {
    let theChat = [...privatechat];
    try {
      let url = 'https://ardanmobileapps.ardangroup.fm/api/privatechat';
      let payload = {
        reciever: route.params.id,
        sender: user.id,
      };
      let req = await axios.post(url, payload);
      const {status, data, msg} = req.data;
      const echo = new Echo({
        broadcaster: 'socket.io',
        host: 'https://ardanmobileapps.ardangroup.fm:6001',
        client: io,
      });
      setChatRoomId(data.chatRoom.id);
      getChat(data.chatRoom.id);
      echo
        .channel('laravel_database_privateChat-' + data.chatRoom.id)
        .listen('PrivateMessageEvent', event => {
          console.log('test:',event.message)
          theChat.push(event.message);
          setPrivatechat(theChat);
        });
    } catch (error) {
      console.log('error:', error);
    }
  };
  const sendChat = async () => {
    try {
      let url = 'https://ardanmobileapps.ardangroup.fm/api/privatechat/send';
      let payload = {
        chat_room_id: chatRoomId,
        sender_id: user.id,
        reciever_id: route.params.id,
        message: msg,
      };
      console.log('payload: ', payload);
      let req = await axios.post(url, payload);
      setMsg('');
    } catch (error) {
      console.log(error);
    }
  };
  const Chat = chat => {
    return chat.map((item, index) => {
      return (
        <View
          style={[item.sender.id == user.id && theme.faEnd, theme.pb20]}
          key={index}>
          <Text
            style={[
              theme['p14-400'],
              item.sender.id == user.id ? theme.cblack : theme.cblack,
              {
                backgroundColor:
                  item.sender.id == user.id ? '#F8C303' : '#EDEDED',
              },
              theme.px15,
              theme.py10,
              theme.brtl10,
              theme.brtr10,
              item.sender.id == user.id ? theme.brbl10 : theme.brbr10,
              theme.wp80,
            ]}>
            {item.message}
          </Text>
        </View>
      );
    });
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
            {backgroundColor: '#12120B', flexWrap: 'nowrap'},
            theme.br12,
            theme.px15,
            theme.wp90,
          ]}>
          <TouchableOpacity
            style={[theme.me10]}
            onPress={() => {
              toggleSearch();
            }}>
            <Image
              source={Icons.back}
              style={[{height: 25, width: 25, objectFit: 'contain'}]}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search..."
            style={[theme.cwhite, theme['p14-400'], theme.wp80, theme.h40]}
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
              <Image
                source={Icons.back}
                style={[{height: 25, width: 25, objectFit: 'contain'}]}
              />
            </TouchableOpacity>
          </View>
          <View style={[theme.fRow, theme.faCenter]}>
            <Text style={[theme['h18-700'], {color: '#fff'}]}>
              {msgDetail.with.name}
            </Text>
          </View>
          <View style={[theme.fRow, theme.wp20, theme.fjEnd]}>
            <TouchableOpacity
              style={[theme.me10]}
              onPress={() => {
                toggleSearch();
              }}>
              <Image
                source={Icons.search}
                style={[{height: 25, width: 25, objectFit: 'contain'}]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notifications');
              }}>
              <Image
                source={Icons.notif}
                style={[{height: 25, width: 25, objectFit: 'contain'}]}
              />
            </TouchableOpacity>
          </View>
          <SearchBar />
        </View>
      </>
    );
  };
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Message Details',
      screen_class: 'MessageDetails',
    });
  }
  useEffect(() => {
    gAnalytics()
    listenChat();
  }, []);

  return (
    <>
      <HeaderTitle />
      <KeyboardAvoidingView
        style={[
          theme.bgblack,
          {flexGrow: 1},
          radioState && radioState.status == 'playing' ? theme.pt80 : theme.pt0,
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[theme.px20]}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          <View style={[theme.pt20]}>
            {Chat(privatechatOld)}
            {Chat(privatechat)}
          </View>
          <View style={[theme.h170]}></View>
        </ScrollView>
        <View
          style={[
            theme.px20,
            theme.fRow,
            theme.absolute,
            theme.pb70,
            theme.pt10,
            theme.bottom0,
            theme.faCenter,
            theme.fjCenter,
            theme.bgblack,
            {flexWrap: 'nowrap'},
            theme.wp100,
          ]}>
          <View
            style={[
              theme.bgwhite,
              theme.px15,
              theme.br16,
              theme.me10,
              theme.wp75,
            ]}>
            <TextInput
              placeholder="Send Message"
              style={[theme.cblack, theme['p12-500']]}
              onChangeText={setMsg}
              value={msg}
              onSubmitEditing={() => {
                sendChat();
              }}
              clearButtonMode="while-editing"
            />
          </View>
          <TouchableOpacity
            style={[
              theme.w43,
              theme.h43,
              theme.bgyellow,
              theme.br100,
              theme.fjCenter,
              theme.faCenter,
            ]}
            onPress={() => {
              sendChat();
              Keyboard.dismiss();
            }}>
            <Icon name="send" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default MessageDetail;
