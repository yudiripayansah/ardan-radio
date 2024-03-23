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
import axios from 'axios'
import Helper from '../config/Helper';
import {RadioContext} from '../context/RadioContext';
const Message = ({navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [messageList, setMessageList] = useState({
    data: [],
    loading: true,
  })
  const MessageList = () => {
    return messageList.data.map((item) => {
      return (
        <TouchableOpacity style={[theme.py10,theme.fRow,theme.fjBetween,theme.faCenter]} onPress={()=>{navigation.navigate('MessageDetail',{id:item.with.id,data:item})}}>
          <View style={[theme.fRow,theme.faCenter]}>
            <Image source={
                          item.with.image_url
                            ? {uri: item.with.image_url}
                            : {
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                              }
                        } style={[theme.w50,theme.h50,{objectFit:'cover'},theme.br100,theme.me15]}/>
            <View>
              <Text style={[theme.cwhite,theme['h16-600']]}>{item.with.name}</Text>
              <Text style={[theme.cwhite,theme['p14-400']]}>{item.message.message}</Text>
            </View>
          </View>
          <View style={[theme.faEnd]}>
            {/* <Text style={[theme.cyellow]}>New</Text> */}
            <Text style={[theme.cwhite,theme['p12-400']]}>{item.message.on}</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }
  const OfflineMessage = () => {
    return (
      <TouchableOpacity style={[theme.py10,theme.fRow,theme.fjBetween,theme.faCenter]} onPress={()=>{navigation.navigate('MessageDetail')}}>
        <View style={[theme.fRow,theme.faCenter]}>
          {/* <Image source={require('../assets/images/penyiar/2.png')} style={[theme.w50,theme.h50,{objectFit:'cover'},theme.br100,theme.me15]}/> */}
          <View>
            <Text style={[theme.cwhite,theme['h16-600']]}>Johan</Text>
            <Text style={[theme.cwhite,theme['p14-400']]}>Oke siap gaskeun...</Text>
          </View>
        </View>
        <View style={[theme.faEnd]}>
          <Text style={[theme.cyellow]}></Text>
          <Text style={[theme.cwhite,theme['p12-400']]}>08:32 PM</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const getMessageList = async () => {
    setMessageList({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let url = 'https://ardanmobileapps.ardangroup.fm/api/privatechat/messageList'
      let payload = {
        user_id: user.id
      };
      let req = await axios.post(url,payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setMessageList({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setMessageList({
        data: [],
        loading: false,
      });
    }
  };
  useEffect(() => {

    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getMessageList()
      }
    });
    return () => (mounted = false);
  }, []);
  

  return (
    <SafeAreaView style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt140 : theme.pt60]}>
      <ScrollView style={[theme.mx15]} showsVerticalScrollIndicator={false}>
        {/* <View style={[theme.fRow,theme.faCenter,theme.fjBetween,theme.py10]}>
          <Text style={[theme['p14-400'],theme.cyellow]}>Online</Text>
          <TouchableOpacity>
            <Text style={[theme['p14-400'],theme.cyellow]}>Mark all as read</Text>
          </TouchableOpacity>
        </View> */}
        <MessageList/>
        {/* <View style={[theme.fRow,theme.faCenter,theme.fjBetween,theme.py10]}>
          <Text style={[theme['p14-400'],theme.cyellow]}>Offline</Text>
        </View>
        <OfflineMessage/>
        <OfflineMessage/>
        <OfflineMessage/>
        <OfflineMessage/>
        <OfflineMessage/>
        <OfflineMessage/>
        <OfflineMessage/> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Message;
