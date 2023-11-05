import Echo from 'laravel-echo';
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
  const listenChat = () => {
    const apiKey = 'ardanradiopusher'
    const cluster = 'mt1'
    const channelName = 'chat'
    const eventName = 'NewChatMessage'
    try {
      const ws = new Echo({
        broadcaster: "pusher",
        Pusher, // sets the instance imported above
        key: apiKey, // app key
        wsHost: "mobileapps.ardanradio.com", // host
        wssHost: "mobileapps.ardanradio.com",
        wsPort: 6001, // port
        wssPort: 6001, 
        forceTLS: false,
        encrypted: false,
        cluster: cluster,
        enabledTransports: ["ws", "wss"],
      });
      const channel = ws.channel(channelName);
      channel.error((error) => {
        // Handle the channel subscription error
        console.error('Channel Subscription Error:', error);
    });
      const subs = channel.subscribed( () => {
        console.log('subscribed');
      })
      channel.listen(eventName, (e) => {
        console.log("ada cuuy :",e);
      });
    } catch (error) {
      console.log("error", error);
    }
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
