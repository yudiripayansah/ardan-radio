import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const Program = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const programList = [
    {
      image: require('../assets/images/program/1.png'),
      name: 'Ardanesia',
      date: 'Setiap Hari',
      time: '18.00-21.00'
    },
    {
      image: require('../assets/images/program/2.png'),
      name: 'Cipaganti',
      date: 'Senin-Jumat',
      time: '06.00-09.00'
    },
    {
      image: require('../assets/images/program/3.png'),
      name: 'LDR',
      date: 'Setiap Hari',
      time: '18.00-21.00'
    },
    {
      image: require('../assets/images/program/4.png'),
      name: 'Aseek',
      date: 'Setiap Hari',
      time: '18.00-21.00'
    },
    {
      image: require('../assets/images/program/5.png'),
      name: 'Hegarmanah',
      date: 'Setiap Hari',
      time: '18.00-21.00'
    },
    {
      image: require('../assets/images/program/6.png'),
      name: 'Ardan Inde7',
      date: 'Setiap Hari',
      time: '18.00-21.00'
    },
  ]
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <View style={[theme.px30, theme.mb5]}>
        <View style={[theme.br14,{backgroundColor:'#2B2B16'},theme.px10,theme.pt5]}>
          <TextInput placeholder='Search Program' style={[theme.cwhite,theme['h12-500']]} placeholderTextColor={'#fff'}/>
        </View>
      </View>
      <ScrollView style={[theme.px30]}>
        <View style={[theme.fRow,theme.fjBetween]}>
        {
          programList.map((item,i) => {
            return (
              <TouchableOpacity 
                style={[{backgroundColor:'#252525'}, theme.br14, theme.mb15, theme.wp48]}
                onPress={()=>{navigation.navigate('ProgramDetails')}} key={i}>
                <Image source={item.image} style={[theme.wp100,theme.h125,theme.brtl12,theme.brtr12, theme.me10]}/>
                <View style={[theme.py8,theme.px12]}>
                  <Text style={[theme['h14-700'], theme.cwhite]}>{item.name}</Text>
                  <Text style={[theme['h10-400'], theme.cwhite]}>{item.date}</Text>
                  <Text style={[theme['h7-400'], theme.cyellow,theme.tRight]}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        </View>
        <View style={[theme.mb150]}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Program