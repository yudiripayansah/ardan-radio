import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header'
const Radio = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const chatList = [
    {
      name: 'Bocil Kehidupan',
      message: 'Absen dulu bang...'
    },
    {
      name: 'Ahmad Asep',
      message: 'Absen dulu bang...'
    },
    {
      name: 'Steven John',
      message: 'Absen dulu bang...'
    },
    {
      name: 'Joni Bersaudara',
      message: 'Absen dulu bang...'
    },
    {
      name: 'Bocil Kehidupan',
      message: 'Absen dulu bang...'
    },
    {
      name: 'Ahmad Asep',
      message: 'Absen dulu bang...'
    },
    {
      name: 'Steven John',
      message: 'Absen dulu bang...'
    },
    {
      name: 'Joni Bersaudara',
      message: 'Absen dulu bang...'
    }
  ]
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
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
            <Image source={require('../assets/images/program-cover.png')} style={[theme.br28]}/>
          </View>
          <Text style={[theme.cblack_green, theme['h14-500'], theme.mt5, theme.tCenter]}>Alda, Keepe</Text>
          <Text style={[theme.cwhite, theme['h32-600'], theme.tCenter]}>Ardanesia</Text>
        </View>
        <View style={[theme.mxAuto, theme.w300]}>
          <View style={[theme.fRow, theme.faCenter]}>
            <Text style={[theme.cwhite,theme['h18-700'], theme.me5]}>Live Chat</Text>
            <Image source={require('../assets/images/icons/network.png')}/>
          </View>
          <View style={[theme.bgblack_green, theme.br12, theme.py12,theme.px20, theme.fRow, theme.faCenter]}>
            <Image source={require('../assets/images/profile-circle.png')}/>
            <View style={[theme.ps15, theme.w220]}>
              <Text style={[theme['h12-700'], theme.cwhite]}>Rezky Zakiri</Text>
              <Text style={[theme['h10-500'], theme.cwhite]}>Haii wah bagus banget siarannya seru</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[theme.absolute, theme.top0,theme.bottom0, theme.right0, theme.left0, theme.h0,{backgroundColor:'rgba(0,0,0,.5)'}]}>
        <View style={[theme.absolute,theme.bottom80, theme.right0, theme.left0]}>
          <View style={[theme.fRow, theme.faCenter, theme.px15, theme.mb5]}>
            <Text style={[theme.cwhite,theme['h18-700'], theme.me5]}>Live Chat</Text>
            <Image source={require('../assets/images/icons/network.png')}/>
          </View>
          <View style={[{backgroundColor:'#30302B'}, theme.py22,theme.px20, theme.br24]}>
            <ScrollView style={[theme.h220, theme.mb10]}>
              {
                chatList.map((item,i) => {
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
              <TextInput style={[theme.wp85, theme.cwhite,theme['h12-400']]} placeholderTextColor={'#fff'}/>
              <TouchableOpacity style={[theme.br30,theme.w50,theme.h50,theme.bgyellow,theme.fjCenter,theme.faCenter]}>
                <Image source={require('../assets/images/icons/send.png')}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Radio