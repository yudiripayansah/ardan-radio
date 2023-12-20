import Echo from 'laravel-echo';
import axios from 'axios'
import Socketio from 'socket.io-client';
import Pusher from "pusher-js/react-native";
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
  const login = async () => {
    let login = 'https://chat.kopikoding.com/login'
    payload = {
      email: 'yudi@360and5.com',
      password: '123456'
    }
    let req = axios.post(login,payload)
    console.log(req)
  }
  const listenChat = () => {
    let hostname = 'ws://chat.kopikoding.com'
    let echo = new Echo({
        broadcaster: 'socket.io',
        client: Socketio,
        host: hostname + ':6001'
    });
    // console.log(echo)
    echo.join(`room-events-1`)
    .here((users) => {
        console.log('user',users)
        // users.forEach(function(user) {
        //     app.onlineUsers.push(user.name);
        // });
    }).joining((user) => {
      console.log(user)
        // app.onlineUsers.push(user.name);
        // $.notify(user.name + " joined.", "success");
    }).leaving((user) => {
      console.log(user)
        // var i = app.onlineUsers.indexOf(user.name);
        // app.onlineUsers.splice(i, 1);
        // $.notify(user.name + " left.", "error");
    });

    let listen = echo.channel(`public-chat-room-1`)
    .listen('PublicMessageEvent', (e) => {
        // app.updateChat(e);
        console.log(e)
    }).error((er) => {
      Alert.alert('Socket Err', 'An error occured')
      console.log('socket error msg:', JSON.stringify(er))        
    });
    console.log(listen)

    echo.private(`typing-room-1`)
    .listenForWhisper('typing', (e) => {
        // app.isTyping = e.name;
        // setTimeout(function() {
        //     app.isTyping = '';
        // }, 1000);
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
    listenChat()
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
