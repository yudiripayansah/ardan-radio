import React, {Component, useState, useEffect, useContext} from 'react';
import {Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, Alert} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import Api from '../config/Api';
const Register = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const {setUser} = useContext(AuthContext);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const doRegister = async () => {
    setError(null);
    setLoading(true);
    try {
      let payload = {
        id: null,
        username: name+makeid(10),
        email: email,
        name: name,
        password: password,
        phone: null,
        image: null,
        address: null,
        gender: null,
        dob: null,
        role: 'member',
        status: 'active',
      };
      
      let req = await Api.userCreate(payload, 'randomToken');
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if(status) {
          setUser(data);
        } else {
          setError(msg);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log('catch',error);
      setLoading(false);
    }
  };
  useEffect(() => {
    
  }, []);
  return (
    <ScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[theme.w%100,theme.h%100, theme.bgblack, theme.px20, theme.py20, { flexGrow: 1}]}>
      <View style={[theme.faCenter]}>
        <Image
          style={[theme.w135, theme.h78, {objectFit: 'contain'}]}
          source={require('../assets/images/logo-ardan.png')}
        />
      </View>
      <View style={[theme.w%100, theme.mt50,]}>
        <Text style={[theme.cwhite,theme['p24-500'], theme.tCenter]}>SIGN UP</Text>
        <Text style={[theme.cblue_grey,theme['p14-500'], theme.tCenter]}>Buat akunmu sekarang!!!</Text>
        <Text style={[theme['p14-500'], theme.cyellow_bold, theme.mt20]}>Nama Lengkap</Text>
        <View style={[ theme.bgwhite, theme.px20, theme.ps50, theme.w%100, theme.mt5, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/user.png')}/>
          <TextInput style={[theme.p0,theme['p13-500'],theme.cblack]} onChangeText={setname} placeholder='Nama lengkap kamu'placeholderTextColor={'#000'}/>
        </View>
        <Text style={[theme['p14-500'], theme.cyellow_bold, theme.mt15]}>Email</Text>
        <View style={[ theme.bgwhite, theme.px20, theme.ps50, theme.w%100, theme.mt5, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/envelope.png')}/>
          <TextInput style={[theme.p0,theme['p13-500'],theme.cblack]} onChangeText={setemail} placeholder='Alamat Email' placeholderTextColor={'#000'}/>
        </View>
        <Text style={[theme['p14-500'], theme.cyellow_bold, theme.mt15]}>Password</Text>
        <View style={[ theme.bgwhite, theme.px50, theme.w%100, theme.mt5, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/lock.png')}/>
          <TextInput style={[theme.p0,theme['p13-500'],theme.cblack]} onChangeText={setpassword} placeholder='Password' secureTextEntry={true} placeholderTextColor={'#000'}/>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.right20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/eye.png')}/>
        </View>
        <TouchableOpacity style={[theme.bgyellow, theme.faCenter, theme.py15, theme.br52, theme.mt30]} onPress={() => {doRegister()}} disabled={loading}>
          <Text style={[theme['p14-500'], theme.cblack]}>{(loading) ? 'Processing...' : 'Daftar Sekarang'}</Text>
        </TouchableOpacity>
        {
          (error) ? 
          (
            <View style={[theme.faCenter,theme.mt15]}>
              <Text style={[theme['p12-400'],theme.cindian_red]}>{error}</Text>
            </View>
          ) : null
        }
        <View style={[theme.relative,theme.mt30, theme.faCenter]}>
          <TouchableOpacity style={[theme.fRow]} onPress={() => {navigation.navigate('Login');}}>
            <Text style={[theme.cwhite, theme['p15-500'], theme.me5]}>Sudah punya akun?</Text>
            <Text style={[theme.cyellow_bold, theme['p15-500']]}>Login disini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
