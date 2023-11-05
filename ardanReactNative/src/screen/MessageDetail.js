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
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
const MessageDetail = ({navigation}) => {
  const listenChat = async () => {
    const apiKey = 'ardanradiopusher'
    const cluster = 'mt1'
    const channelName = 'chat'
    const pusher = Pusher.getInstance();
    await pusher.init({
      apiKey,
      cluster
    });

    await pusher.connect();
    await pusher.subscribe({ channelName });
    let echo = new Echo({
      broadcaster: 'pusher',
      pusher, // sets the instance imported above
  
      // Tweak the options according to your settings
      key: 'ardanradiopusher', // set the key defined in your .env
      wsHost: 'mobileapps.ardanradio.com', // the host defined in your .env
      wssHost: 'mobileapps.ardanradio.com', // the host defined in your .env
      wsPort: 6001, // or the port defined in your .env
      wssPort: 6001, // or the port defined in your .env
      forceTLS: false,
      encrypted: false,
      cluster: 'mt1',
      enabledTransports: ['ws', 'wss'],
    })
    echo.channel('chat')
      .listen('NewChatMessage', (eventData) => {
        // do something when the event fires
      });
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
