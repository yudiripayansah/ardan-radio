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
  Keyboard
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
const MessageDetail = ({route,navigation}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const scrollViewRef = useRef();
  const [msg, setMsg] = useState()
  const [privatechat, setPrivatechat] = useState([])
  const roomId = user.id+''+route.params.id
  const listenChat = () => {
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://chat.kopikoding.com:6001',
      client: io
    });
    echo.channel('private-chat-room-'+roomId).listen('PrivateChatEvent', (event) => {
      const {target} = event
      let theChat = privatechat
      theChat.push(event)
      setPrivatechat(theChat)
    });
  }
  const sendChat = async () => {
    try {
      let url = 'https://chat.kopikoding.com/publicchat/send'
      let payload = {
        message: msg,
        target: "livestream",
        name: user.name
      }
      let req = await axios.post(url,payload)
      setMsg('')
    } catch (error) {
      console.log(error)
    }
  }
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
    <KeyboardAvoidingView style={[theme.bgblack, {flexGrow: 1}, theme.pt60]}>
      <ScrollView style={[theme.px20]}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
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
        <View style={[theme.h170]}></View>
      </ScrollView>
      <View
      style={[theme.px30, theme.fRow, theme.absolute,theme.pb110,theme.pt20,theme.bottom0, theme.faCenter,theme.fjBetween, theme.bgblack]}>
        <View style={[theme.bgwhite,theme.px15,theme.br16,theme.me10,theme.wp84]}>
          <TextInput placeholder="Send Message" style={[theme.cblack,theme['p12-500']]} onChangeText={setMsg} value={msg} onSubmitEditing={() => {sendChat()}} clearButtonMode="while-editing"/>
        </View>
        <TouchableOpacity style={[theme.w43,theme.h43,theme.bgyellow,theme.br100,theme.fjCenter,theme.faCenter]} onPress={() => {sendChat();Keyboard.dismiss()}}>
          <Icon name="send" size={14} color="#fff" />
        </TouchableOpacity> 
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageDetail;
