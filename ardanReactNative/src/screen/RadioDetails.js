import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const RadioDetails = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const programList = [
    {
      image: require('../assets/images/program-1.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
    {
      image: require('../assets/images/program-2.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
    {
      image: require('../assets/images/program-3.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
    {
      image: require('../assets/images/program-4.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
    {
      image: require('../assets/images/program-1.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
    {
      image: require('../assets/images/program-2.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
    {
      image: require('../assets/images/program-3.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
    {
      image: require('../assets/images/program-4.png'),
      name: 'Cipaganti',
      penyiar: 'Syarlita, Iqbal',
      time: '12.00 - 13.00 Wib'
    },
  ]
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.fjCenter, theme.faCenter, theme.mt25]}>
          <Image source={require('../assets/images/radio-play-cover.png')} style={[theme.w320,theme.br28]}/>
          <TouchableOpacity style={[theme.mt22]}>
            <Image source={require('../assets/images/icons/btn-play.png')}/>
          </TouchableOpacity>
          <Text style={[theme['h24-600'],theme.cwhite,theme.mt10]}>Ardan Radio 105..9 FM </Text>
          <Text style={[theme['h14-500'],{color:'#9F9F90'}]}>Radio Anak Muda No.1 Di Bandung</Text>
          <View style={[theme.fRow, theme.fjCenter, theme.faCenter, theme.mt25]}>
            <TouchableOpacity 
              style={[theme.fRow, theme.faCenter, theme.px15, theme.py5, theme.byellow, theme.bsolid, theme.bw1, theme.br42, theme.wAuto, theme.mx10, theme.fjCenter]}>
              <Image source={require('../assets/images/icons/heart.png')}/>
              <Text style={[theme['h14-600'],theme.cwhite, theme.ms5]}>Favorited</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[theme.fRow, theme.faCenter, theme.px15, theme.py5, theme.byellow, theme.bsolid, theme.bw1, theme.br42, theme.wAuto, theme.mx10, theme.fjCenter]}
              onPress={()=>{navigation.navigate('Penyiar')}}>
              <Text style={[theme['h14-600'],theme.cwhite, theme.ms5]}>Profile Penyiar</Text>
            </TouchableOpacity>
          </View>
          <View style={[theme.fRow,theme.faCenter, theme.mt35,theme.w320,theme.p10,theme.br12,theme.relative, {backgroundColor:'rgba(255, 255, 255, 0.16)'}]}>
            <Image source={require('../assets/images/program-2.png')} style={[theme.h55,theme.w55,theme.br7,theme.me10]}/>
            <View style={[theme.faStart]}>
              <Text style={[theme['h16-700'],theme.cwhite]}>Ardanesia</Text>
              <Text style={[theme['h8-600'],theme.cwhite,{opacity:.6}]}>Alda , Keepe</Text>
              <View style={[theme.bw1,theme.bsolid,theme.br5,theme.byellow,theme.fRow,theme.faCenter,theme.p2,theme.wauto]}>
                <Image source={require('../assets/images/icons/network.png')} style={[theme.h6,theme.w8,theme.me3]}/>
                <Text style={[theme['h5-400'],theme.cyellow]}>Live</Text>
              </View>
            </View>
            <Text style={[theme.absolute,theme.bottom5,theme.right10,theme.cwhite,theme['h10-500']]}>
            10.00 - 12.00 WIB
            </Text>
          </View>
        </View>
        <View style={[theme.fjCenter, theme.faCenter, theme.mt35, theme.mb100]}>
          <View style={[theme.w320, theme.faStart]}>
            <Text style={[theme['h12-500'],theme.cyellow,theme.pb0,theme.bbw1,theme.bsolid,theme.byellow, theme.mb20]}>Program Selanjutnya</Text>
            {
              programList.map((item,i) => {
                return (
                  <View style={[theme.fRow,theme.faCenter,theme.mb15,theme.w320,theme.p10,theme.br12,theme.relative, {backgroundColor:'rgba(255, 255, 255, 0.16)'}]} key={i}>
                    <Image source={item.image} style={[theme.h55,theme.w55,theme.br7,theme.me10]}/>
                    <View style={[theme.faStart]}>
                      <Text style={[theme['h16-700'],theme.cwhite]}>{item.name}</Text>
                      <Text style={[theme['h8-600'],theme.cwhite,{opacity:.6}]}>{item.penyiar}</Text>
                      <Text style={[theme.cwhite,theme['h10-500']]}>
                      {item.time}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RadioDetails