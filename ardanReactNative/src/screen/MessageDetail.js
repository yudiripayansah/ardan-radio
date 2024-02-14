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
import {RadioContext} from '../context/RadioContext';
const MessageDetail = ({route,navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const scrollViewRef = useRef();
  const [msg, setMsg] = useState()
  const [privatechatOld, setPrivatechatOld] = useState([])
  const [privatechat, setPrivatechat] = useState([])
  const [chatRoomId, setChatRoomId] = useState(0)
  const getChat = async (id) => {
    try {
      let url = 'https://mobileapps.ardanradio.com/api/privatechat/get';
      let payload = {
        page: 1,
        perPage: 20,
        sortDir: 'DESC',
        sortBy: 'id',
        chat_room_id: id
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
    let theChat = [...privatechat]
    try {
      let url = 'https://mobileapps.ardanradio.com/api/privatechat';
      let payload = {
        reciever: route.params.id,
        sender: user.id
      };
      let req = await axios.post(url, payload);
      const {status, data, msg} = req.data;
      const echo = new Echo({
        broadcaster: 'socket.io',
        host: 'https://mobileapps.ardanradio.com:6001',
        client: io,
      });
      setChatRoomId(data.chatRoom.id)
      getChat(data.chatRoom.id)
      echo
      .channel('laravel_database_privateChat-'+data.chatRoom.id)
      .listen('PrivateMessageEvent', event => {
        theChat.push(event.message)
        setPrivatechat(theChat)
      });
    } catch (error) {
      console.log('error:',error);
    }
  }
  const sendChat = async () => {
    try {
      let url = 'https://mobileapps.ardanradio.com/api/privatechat/send';
      let payload = {
        chat_room_id: chatRoomId,
        sender_id: user.id,
        reciever_id: route.params.id,
        message: msg
      }
      console.log('payload: ',payload)
      let req = await axios.post(url,payload)
      setMsg('')
    } catch (error) {
      console.log(error)
    }
  }
  const Chat = chat => {
    return chat.map((item,index) => {
      return (
        <View style={[(item.sender.id == user.id) && theme.faEnd, theme.pb20]} key={index}>
          <Text
            style={[
              theme['p14-400'],
              (item.sender.id == user.id) ? theme.cwhite : theme.cblack,
              {backgroundColor: (item.sender.id == user.id) ? '#304BF7' : '#EDEDED'},
              theme.px15,
              theme.py10,
              theme.brtl10,
              theme.brtr10,
              theme.brbl10,
              theme.wp80,
            ]}>
            {item.message}
          </Text>
        </View>
      );
    })
  };
  
  useEffect(() => {
    listenChat()
  }, []);

  return (
    <KeyboardAvoidingView style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt140 : theme.pt60]}>
      <ScrollView style={[theme.px20]}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        <View style={[theme.pt20]}>
        {Chat(privatechatOld)}
        {Chat(privatechat)}
        </View>
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
