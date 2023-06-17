import React, {Component, useState, useEffect, useContext} from 'react';
import {Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView} from 'react-native';
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
  const doRegister = async () => {
    setLoading(true);
    try {
      let payload = {
        address: null,
        city: null,
        dana_account: null,
        discord: null,
        email: email,
        facebook: null,
        id: null,
        image: null,
        instagram: null,
        job: null,
        name: name,
        password: password,
        pc_brand: null,
        pc_processor: null,
        pc_ram: null,
        pc_storage: null,
        phone: null,
        phone_brand: null,
        phone_os_version: null,
        phone_ram: null,
        provice: null,
        skill: null,
        telegram: null,
        twitter: null,
        type: 'member',
        wallet_account: null,
      };
      
      let req = await Api.createMember(payload, 'randomToken');
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        setUser(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
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
          <TextInput style={[theme.p0,theme['p13-500']]} placeholder='Nama lengkap kamu'/>
        </View>
        <Text style={[theme['p14-500'], theme.cyellow_bold, theme.mt15]}>Email</Text>
        <View style={[ theme.bgwhite, theme.px20, theme.ps50, theme.w%100, theme.mt5, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/envelope.png')}/>
          <TextInput style={[theme.p0,theme['p13-500']]} placeholder='Alamat Email'/>
        </View>
        <Text style={[theme['p14-500'], theme.cyellow_bold, theme.mt15]}>Password</Text>
        <View style={[ theme.bgwhite, theme.px50, theme.w%100, theme.mt5, theme.br12]}>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.left20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/lock.png')}/>
          <TextInput style={[theme.p0,theme['p13-500']]} placeholder='Password' secureTextEntry={true}/>
          <Image style={[theme.w20,theme.h20, theme.absolute,theme.right20, theme.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/eye.png')}/>
        </View>
        <TouchableOpacity style={[theme.bgyellow, theme.faCenter, theme.py15, theme.br52, theme.mt30]}>
          <Text style={[theme['p14-500'], theme.cblack]}>Daftar Sekarang</Text>
        </TouchableOpacity>
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
