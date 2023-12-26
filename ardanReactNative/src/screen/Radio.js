import React, { useEffect, useContext, useState, useRef } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Animated, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import Echo from 'laravel-echo';
import io from 'socket.io-client';
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../config/Api';
const Radio = ({ navigation }) => {
  const scrollViewRef = useRef();
  const mainScrollViewRef = useRef();
  const imageWidth = Dimensions.get('window').width - 40;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const theme = useContext(ThemeContext)
  const user = useContext(UserContext)
  const [radiochat, setRadiochat] = useState([]) 
  const [msg, setMsg] = useState()
  const [ziChat, setZiChat] = useState(1)
  const [currentProgram, setCurrentProgram] = useState({
    image: null,
    title: null,
    penyiar_name: null,
    text: null
  })
  const [showC, setShowC] = useState(true)
  const getCurrentProgram = async () => {
    let date = new Date()
    let day = date.getDay() + 1
    let hour = date.getHours()
    let minutes = date.getMinutes().toString()
    minutes = minutes.padStart(2, "0");
    let payload = {
      day: day,
      time: `${hour}:${minutes}`,
    }
    try {
      let req = await Api.programsGet(payload)
      const {status,data,msg} = req.data
      if(status) {
        setCurrentProgram(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const listenChat = async () => {
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://chat.kopikoding.com:6001',
      client: io
    });
    let listen =echo.channel('publicChat').listen('PublicChatEvent', (event) => {
      const {target} = event
      let theChat = radiochat
      if(target == 'radio') {
        theChat.push(event)
        setRadiochat(theChat)
      }
    });
  }
  const sendChat = async () => {
    try {
      let url = 'https://chat.kopikoding.com/publicchat/send'
      let payload = {
        message: msg,
        target: "radio",
        name: user.name
      }
      let req = await axios.post(url,payload)
      setMsg('')
      Keyboard.dismiss()
    } catch (error) {
      console.log(error)
    }
  }
  const showChat = () => {
    let anim = {
      fade: 0,
      slide: 110
    }
    if(showC){
      anim.fade = 1
      anim.slide = 0
      setZiChat(2)
    } else {
      setZiChat(1)
    }
    setShowC(!showC)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: anim.fade,
        duration: 500, // adjust the duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: anim.slide,
        duration: 500, // adjust the duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  }
  useEffect(() => {
    listenChat()
    getCurrentProgram()
  }, [])

  return (
    <>
    <KeyboardAvoidingView style={[theme.bgblack,{flexGrow: 1},theme.mt50, theme.relative, {zIndex: 2}]}>
      <ScrollView nestedScrollEnabled={true} style={[theme.mb120]} ref={mainScrollViewRef}>
        <View style={[theme.fRow, theme.fjCenter, theme.faCenter, theme.mt25]}>
          <TouchableOpacity 
            style={[theme.fRow, theme.faCenter, theme.px15, theme.py5, theme.byellow, theme.bsolid, theme.bw1, theme.br42, theme.wAuto, theme.mx10, theme.fjCenter]}>
            <Image source={require('../assets/images/icons/heart.png')}/>
            <Text style={[theme['h14-600'],theme.cwhite, theme.ms5]}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[theme.fRow, theme.faCenter, theme.px15, theme.py5, theme.byellow, theme.bsolid, theme.bw1, theme.br42, theme.wAuto, theme.mx10, theme.fjCenter]}
            onPress={()=>{navigation.navigate('RadioDetails')}}>
            <Image source={require('../assets/images/icons/logo-small.png')}/>
            <Text style={[theme['h14-600'],theme.cwhite, theme.ms5]}>Ardan Radio</Text>
          </TouchableOpacity>
        </View>
        <View style={[theme.mt35]}>
          <View style={[theme.faCenter]}>
            <AutoHeightImage
              width={imageWidth}
              source={{uri:currentProgram.image}}
              style={[theme.br10]}
            />
          </View>
          <Text style={[theme.cwhite, theme['h14-500'], theme.mt5, theme.tCenter]}>{currentProgram.penyiar_name}</Text>
          <Text style={[theme.cwhite, theme['h32-600'], theme.tCenter]}>{currentProgram.title}</Text>
        </View>
        <View style={[theme.px20]}>
          <View style={[theme.fRow, theme.faCenter]}>
            <Text style={[theme.cwhite,theme['h18-700'], theme.me5]}>Live Chat</Text>
            <Icon name="feed" size={14} color="#F8C303" />
          </View>
          <ScrollView nestedScrollEnabled={true}
            style={[theme.h220, theme.mb10]}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            {
              radiochat.map((item,i) => {
                return (
                <View style={[theme.fRow, theme.mb15, theme.faCenter]} key={i}>
                  <View style={[theme.faCenter,theme.fjCenter,theme.w40,theme.h40,theme.br100,theme.me15,{backgroundColor:'rgba(45, 171, 210, 0.12)'}]}>
                    <Image source={require('../assets/images/icons/user-grey.png')}/>
                  </View>
                  <View>
                    <Text style={[theme.cwhite,theme['h10-500'],{opacity:.6}]}>{item.name}</Text>
                    <Text style={[theme.cwhite,theme['h12-500']]}>{item.message}</Text>
                  </View>
                </View>
                )
              })
            }
          </ScrollView>
          <View style={[{backgroundColor:'rgba(45, 171, 210, 0.12)'}, theme.br30, theme.ps15, theme.fRow, theme.faCenter,theme.fjBetween]}>
            <TextInput style={[theme.wp85, theme.cwhite,theme['h12-400']]} placeholderTextColor={'#fff'} onFocus={() => mainScrollViewRef.current.scrollToEnd({ animated: true })} onChangeText={setMsg} value={msg} onSubmitEditing={() => {sendChat()}} clearButtonMode="while-editing"/>
            <TouchableOpacity style={[theme.br30,theme.w50,theme.h50,theme.bgyellow,theme.fjCenter,theme.faCenter]} onPress={() => { sendChat() }}>
              <Image source={require('../assets/images/icons/send.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  )
}

export default Radio