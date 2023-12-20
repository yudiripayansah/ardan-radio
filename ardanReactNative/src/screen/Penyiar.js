import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const Penyiar = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const penyiarList = []
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <View style={[theme.px30, theme.mb5]}>
        <View style={[theme.br14,{backgroundColor:'#2B2B16'},theme.px10,theme.pt5]}>
          <TextInput placeholder='Search Announchers' style={[theme.cwhite,theme['h12-500']]} placeholderTextColor="#fff"/>
        </View>
      </View>
      <ScrollView style={[theme.px30]}>
        {
          penyiarList.map((item,i) => {
            return (
              <View style={[theme.bgwhite, theme.br14,theme.p12, theme.fRow, theme.mb15]} key={i}>
                <Image source={item.image} style={[theme.w160,theme.h160,theme.br12, theme.me10]}/>
                <View>
                  <Text style={[theme['h14-600']]}>{item.name}</Text>
                  <Text style={[theme['h8-500']]}>{item.likes}</Text>
                  <View style={[theme.fRow]}>
                    <TouchableOpacity style={[theme.me10]}>
                      <Image source={require('../assets/images/icons/ig.png')} style={[theme.h20,theme.w20]}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={require('../assets/images/icons/twitter.png')} style={[theme.h20,theme.w20]}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })
        }
        <View style={[theme.mb150]}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Penyiar