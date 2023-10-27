import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
const MessageDetail = ({navigation}) => {
  const listenChat = () => {
    let echo = new Echo({
      broadcaster: 'socket.io',
      host: 'ws://mobileapps.ardanradio.com:6001/app/ardanradiopusher',
      client: Socketio,
    });
    console.log(echo)
    echo.private('chat').listen('NewChatMessage', event => {
      console.log(event);
    });
    // Pusher.logToConsole = true;
    // let PusherClient = new Pusher('ardanradiopusher', {
    //   cluster: 'mt1',
    //   wsHost: 'mobileapps.ardanradio.com',
    //   wsPort: '6001',
    //   enabledTransports: ['ws'],
    //   forceTLS: false,
    // });

    // let echo = new Echo({
    //   broadcaster: 'pusher',
    //   client: PusherClient,
    // });

    // echo.channel('chat').listen('NewChatMessage', e => {
    //   console.log('hello', e);
    // });
    // const pusher = Pusher.getInstance();

    // try {
    //   pusher.init({
    //     apiKey: '<your_pusher_key>',
    //     cluster: 'eu',
    //     onAuthorizer: async (channelName, socketId) => {
    //       const response = await axios.post('/api/broadcasting/auth', {
    //         socket_id: socketId,
    //         channel_name: channelName,
    //       });
    //       return response.data;
    //     },
    //     onError(message, code, e) {
    //       console.log(
    //         `onError: $message code: ${code} exception: ${e} message= ${message}`,
    //       );
    //     },
    //   });
    // } catch (e) {
    //   console.log(`ERROR: ${e}`);
    // }
  };
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const FriendChat = chat => {
    return (
      <View style={[theme.pb20]}>
        <Text
          style={[
            theme['p14-400'],
            theme.cblack,
            {backgroundColor: '#EDEDED'},
            theme.px15,
            theme.py10,
            theme.brtl10,
            theme.brtr10,
            theme.brbr10,
            theme.wp80,
          ]}>
          {chat}
        </Text>
      </View>
    );
  };
  const MyChat = chat => {
    return (
      <View style={[theme.faEnd, theme.pb20]}>
        <Text
          style={[
            theme['p14-400'],
            theme.cwhite,
            {backgroundColor: '#304BF7'},
            theme.px15,
            theme.py10,
            theme.brtl10,
            theme.brtr10,
            theme.brbl10,
            theme.wp80,
          ]}>
          {chat}
        </Text>
      </View>
    );
  };
  useEffect(() => {
    listenChat();
  }, []);

  return (
    <SafeAreaView style={[theme.bgblack, {flexGrow: 1}, theme.pt60]}>
      <ScrollView style={[theme.px15]}>
        {FriendChat(
          'lorem ipsum dolor sit amet, consectetur adipis constrender nunc vitae et just euismod tempor incididunt ut labore et dolore magna aliqu sapient',
        )}
        {FriendChat('incididunt ut labore et dolore magna aliqu sapient')}
        {MyChat(
          'lorem ipsum dolor sit amet, consectetur adipis constrender nunc vitae et just euismod tempor incididunt ut labore et dolore magna aliqu sapient',
        )}
        {FriendChat(
          'lorem ipsum dolor sit amet, consectetur adipis constrender nunc vitae et just euismod tempor incididunt ut labore et dolore magna aliqu sapient',
        )}
        {MyChat(
          'vitae et just euismod tempor incididunt ut labore et dolore magna aliqu sapient',
        )}
        {MyChat('ut labore et dolore magna aliqu sapient')}
        {FriendChat(
          'lorem ipsum dolor sit amet, consectetur adipis constrender nunc vitae et just euismod tempor incididunt ut labore et dolore magna aliqu sapient',
        )}
        {FriendChat(
          'lorem ipsum dolor sit amet, consectetur adipis constrender nunc vitae et just euismod tempor incididunt ut labore et dolore magna aliqu sapient',
        )}
        <View style={[theme.h100]}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageDetail;
