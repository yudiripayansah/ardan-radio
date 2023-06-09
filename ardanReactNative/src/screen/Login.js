import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import Api from '../config/Api'
const Login = ({navigation}) => {
  const theme = useContext(ThemeContext)
  const {setUser} = useContext(AuthContext);
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    
  },[])
  return (
    <KeyboardAvoidingView style={[theme.w%100,theme.h%100, theme.bgblack, theme.fjStart, theme.px20, theme.py20 ,{flexGrow: 1}]}>
      <View style={[theme.faCenter]}>
        <Image
          style={[theme.w135, theme.h78, {objectFit: 'contain'}]}
          source={require('../assets/images/logo-ardan.png')}
        />
      </View>
      <View style={[theme.w%100, theme.mt50,]}>
        <Text style={[theme.cwhite,theme['p24-500'], theme.tCenter]}>SIGN IN</Text>
        <Text style={[theme.cblue_grey,theme['p14-500'], theme.tCenter]}>Please enter your account here</Text>
        <View style={[ theme.bgwhite, theme.px20, theme.ps50, theme.w%100, theme.mt20, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/envelope.png')}/>
          <TextInput style={[theme.p0,theme['p13-500']]} placeholder='Email or phone number'/>
        </View>
        <View style={[ theme.bgwhite, theme.px50, theme.w%100, theme.mt15, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/lock.png')}/>
          <TextInput style={[theme.p0,theme['p13-500']]} placeholder='Password' secureTextEntry={true}/>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.right20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/eye.png')}/>
        </View>
        <View style={[theme.fRow, theme.mt5, theme.fjBetween]}>
          <TouchableOpacity onPress={() => {navigation.navigate('Register');}}>
            <Text style={[theme.cindian_red, theme['p14-500']]}>Daftar?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={[theme.cindian_red, theme['p14-500']]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[theme.bgyellow, theme.faCenter, theme.py15, theme.br52, theme.mt20]}>
          <Text style={[theme['p14-500'], theme.cblack]}>Login</Text>
        </TouchableOpacity>
        <View style={[theme.relative,theme.mt15, theme.faCenter]}>
          <View style={[theme.h1,theme.bgwhite,theme.absolute, theme.left0, theme.right0, theme.top10]}></View>
          <Text style={[theme.bgblack, theme.cyellow_bold, theme['p14-500'], theme.px5]}>Or Login with</Text>
        </View>
        <View style={[theme.fRow, theme.fjCenter, theme.mt15]}>
          <TouchableOpacity style={[theme.w80, theme.bwhite, theme.bSolid, theme.bw1, theme.faCenter, theme.py5, theme.br10, theme.mx5]}>
            <Image source={require('../assets/images/icons/google.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={[theme.w80, theme.bwhite, theme.bSolid, theme.bw1, theme.faCenter, theme.py5, theme.br10, theme.mx5]}>
            <Image source={require('../assets/images/icons/apple.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={[theme.w80, theme.bwhite, theme.bSolid, theme.bw1, theme.faCenter, theme.py5, theme.br10, theme.mx5]}>
            <Image source={require('../assets/images/icons/facebook.png')}/>
          </TouchableOpacity>
        </View>
        <View style={[theme.relative,theme.mt30, theme.faCenter]}>
          <TouchableOpacity style={[theme.fRow]}>
            <Text style={[theme.cwhite, theme['p15-500'], theme.me5]}>Atau masuk sebagai tamu !</Text>
            <Text style={[theme.cyellow_bold, theme['p15-500']]}>Lewati</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login