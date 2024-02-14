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
import {RadioContext} from '../context/RadioContext';
const Message = ({navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const OnlineMessage = () => {
    return (
      <TouchableOpacity style={[theme.py10,theme.fRow,theme.fjBetween,theme.faCenter]} onPress={()=>{navigation.navigate('MessageDetail')}}>
        <View style={[theme.fRow,theme.faCenter]}>
          {/* <Image source={require('../assets/images/penyiar/1.png')} style={[theme.w50,theme.h50,{objectFit:'cover'},theme.br100,theme.me15]}/> */}
          <View>
            <Text style={[theme.cwhite,theme['h16-600']]}>Salsabila</Text>
            <Text style={[theme.cwhite,theme['p14-400']]}>Hallo yang disana...</Text>
          </View>
        </View>
        <View style={[theme.faEnd]}>
          <Text style={[theme.cyellow]}>New</Text>
          <Text style={[theme.cwhite,theme['p12-400']]}>08:32 PM</Text>
        </View>
      </TouchableOpacity>
    )
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
  const getMessage = async () => {
    setUserList({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 100,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
      };
      if (route.params) {
        payload.id_user = user.id;
      }
      let req = await Api.userFollow(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setUserList({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setUserList({
        data: [],
        loading: false,
      });
    }
  };
  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt140 : theme.pt60]}>
      <ScrollView style={[theme.mx15]}>
        {/* <View style={[theme.fRow,theme.faCenter,theme.fjBetween,theme.py10]}>
          <Text style={[theme['p14-400'],theme.cyellow]}>Online</Text>
          <TouchableOpacity>
            <Text style={[theme['p14-400'],theme.cyellow]}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
        <OnlineMessage/>
        <OnlineMessage/>
        <OnlineMessage/> */}
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
