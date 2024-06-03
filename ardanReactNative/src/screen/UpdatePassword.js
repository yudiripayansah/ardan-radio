import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import Api from '../config/Api'
import Icon from 'react-native-vector-icons/FontAwesome';
import analytics from '@react-native-firebase/analytics';
const UpdatePassword = ({route,navigation}) => {
  const theme = useContext(ThemeContext)
  const {setUser} = useContext(AuthContext);
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [Cpassword, setCpassword] = useState()
  const [sPassword, setSpassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState({
    status: true,
    msg: null,
    data: null
  })
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Update Password',
      screen_class: 'UpdatePassword',
    });
  }
  useEffect(() => {
    gAnalytics()
  },[])
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const sendOtp = async () => {
    setLoading(true)
    try {
      let payload = {
        email: route.params.email,
        password: password
      }
      if(password == Cpassword) {
          let req = await Api.updatePassword(payload)
          if(req.status == 200){
            let {data,status,msg} = req.data
            if(status) {
              setLogin({
                status: false,
                msg: 'Reset password success',
                data: null
              })
              setTimeout(() => {
                navigation.navigate('Login',{email: route.params.email})
              },2000)
            }
          } else {
            setLogin({
              status: false,
              msg: 'Failed to update Password',
              data: null
            })
          }
      } else {
        setLogin({
          status: false,
          msg: 'Password doesnt match',
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
    <KeyboardAvoidingView style={[theme.wp100,theme.hp100, {backgroundColor:'#090903'}, theme.fjStart, theme.px20, theme.py20 ,{flexGrow: 1}]}>
      <View style={[theme.faCenter]}>
        <Image
          style={[theme.w135, theme.h78, {objectFit: 'contain'}]}
          source={require('../assets/images/logo-ardan.png')}
        />
      </View>
      <View style={[theme.wp100, theme.mt50,]}>
        <Text style={[theme.cwhite,theme['p24-500'], theme.tCenter]}>Update Password</Text>
        <Text style={[theme.cblue_grey,theme['p14-500'], theme.tCenter]}>Please enter your new password</Text>
        <View style={[ theme.bgwhite, theme.px50, theme.wp100, theme.mt15, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/lock.png')}/>
          <TextInput style={[theme.p0,theme['p13-500'],theme.cblack]} placeholder='Password' secureTextEntry={sPassword} onChangeText={setPassword} value={password} placeholderTextColor={'#000'}/>
          <TouchableOpacity onPress={()=> {setSpassword(!sPassword)}} style={[theme.absolute,theme.right20, theme.top15]}>
            <Icon name={(sPassword) ? "eye-slash" : "eye"} size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={[ theme.bgwhite, theme.px50, theme.wp100, theme.mt15, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/lock.png')}/>
          <TextInput style={[theme.p0,theme['p13-500'],theme.cblack]} placeholder='Reenter Password' secureTextEntry={sPassword} onChangeText={setCpassword} value={Cpassword} placeholderTextColor={'#000'}/>
          <TouchableOpacity onPress={()=> {setSpassword(!sPassword)}} style={[theme.absolute,theme.right20, theme.top15]}>
            <Icon name={(sPassword) ? "eye-slash" : "eye"} size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={[theme.fRow, theme.mt5, theme.fjEnd]}>
          <TouchableOpacity onPress={() => {navigation.navigate('Login');}}>
            <Text style={[theme.cindian_red, theme['p14-500']]}>Back to Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[theme.bgyellow, theme.faCenter, theme.py15, theme.br52, theme.mt20]} onPress={() => {sendOtp()}} disabled={(loading) ? true : false}>
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

export default UpdatePassword