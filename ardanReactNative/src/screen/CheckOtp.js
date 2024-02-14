import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import Api from '../config/Api'
import Icon from 'react-native-vector-icons/FontAwesome';
const CheckOtp = ({route,navigation}) => {
  const theme = useContext(ThemeContext)
  const {setUser} = useContext(AuthContext);
  const [otp, setOtp] = useState()
  const [password, setPassword] = useState()
  const [sPassword, setSpassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState({
    status: true,
    msg: null,
    data: null
  })
  useEffect(() => {
    
  },[])
  const checkotp = async () => {
    setLoading(true)
    try {
      let payload = {
        otp: otp
      }
      if(otp) {
          let req = await Api.checkotp(payload)
          if(req.status == 200){
            let {data,status,msg} = req.data
            if(status) {
              navigation.navigate('UpdatePassword',{email: route.params.email})
            }
          } else {
            setLogin({
              status: false,
              msg: 'Failed to verify OTP',
              data: null
            })
          }
      } else {
        setLogin({
          status: false,
          msg: 'Please enter OTP',
          data: null
        })
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  const guest = () => {
    let data = {
      username: 'guest',
      email: 'guest@ardanradio.com',
      name: 'Guest',
      phone: '-',
      address: '-',
      gender: '-',
      image: '-',
      role: 'guest',
      dob: '-'
    }
    setUser(data)
  }
  return (
    <KeyboardAvoidingView style={[theme.w%100,theme.h%100, theme.bgblack, theme.fjStart, theme.px20, theme.py20 ,{flexGrow: 1}]}>
      <View style={[theme.faCenter]}>
        <Image
          style={[theme.w135, theme.h78, {objectFit: 'contain'}]}
          source={require('../assets/images/logo-ardan.png')}
        />
      </View>
      <View style={[theme.w%100, theme.mt50,]}>
        <Text style={[theme.cwhite,theme['p24-500'], theme.tCenter]}>Verify</Text>
        <Text style={[theme.cblue_grey,theme['p14-500'], theme.tCenter]}>Please enter OTP code we send to email {route.params.email}</Text>
        <View style={[ theme.bgwhite, theme.px20, theme.w%100, theme.mt20, theme.br12]}>
          <TextInput style={[theme.p0,theme['p13-500'],theme.cblack]} placeholder='OTP' onChangeText={setOtp} value={otp} placeholderTextColor={'#000'}/>
        </View>
        <View style={[theme.fRow, theme.mt5, theme.fjBetween]}>
          <TouchableOpacity onPress={() => {navigation.navigate('Login');}}>
            <Text style={[theme.cindian_red, theme['p14-500']]}>Back to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('Forgot');}}>
            <Text style={[theme.cindian_red, theme['p14-500']]}>Reenter Email</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[theme.bgyellow, theme.faCenter, theme.py15, theme.br52, theme.mt20]} onPress={() => {checkotp()}} disabled={(loading) ? true : false}>
          <Text style={[theme['p14-500'], theme.cblack]}>{(loading) ? 'Processing...' : 'Submit'}</Text>
        </TouchableOpacity>
        {
          (!login.status) ? (
            <Text style={[theme.cindian_red,theme['p10-400'],theme.tCenter,theme.pt5]}>{login.msg}</Text>
          ) : null
        }
      </View>
    </KeyboardAvoidingView>
  )
}

export default CheckOtp