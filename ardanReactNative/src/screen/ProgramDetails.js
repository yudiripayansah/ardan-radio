import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const ProgramDetails = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.px30]}>
          <Image source={require('../assets/images/program-cover.png')} style={[theme.w280,theme.h280, theme.br15, theme.mxAuto, theme.mb25]}/>
          <View>
            <Text style={[theme['h24-700'],theme.cwhite]}>Ardanesia</Text>
            <View style={[theme.fRow]}>
              <View style={[theme.fRow,theme.me15]}>
                <Image style={[theme.me5,theme.w15,theme.h15]} source={require('../assets/images/icons/calendar.png')}/>
                <Text style={[theme['h12-400'],theme.cwhite]}>Senin - Jumat</Text>
              </View>
              <View style={[theme.fRow]}>
                <Image style={[theme.me5,theme.w15,theme.h15]} source={require('../assets/images/icons/discovery.png')}/>
                <Text style={[theme['h12-400'],theme.cwhite]}>09.00 - 12.00</Text>
              </View>
            </View>
            <Text style={[theme['h18-700'],theme.cwhite,theme.mt15]}>Description</Text>
            <Text style={[theme['h12-400'],theme.cwhite]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel nunc vitae nisl viverra egestas. Curabitur blandit varius facilisis. 
            </Text>
            <Text style={[theme['h18-700'],theme.cwhite,theme.mt15]}>
              Penyiar
            </Text>
            <Text style={[theme['h12-400'],theme.cwhite]}>
            Alda Gusmarani , Keefe Akia
            </Text>
          </View>
        </View>
        <View style={[theme.mb150]}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProgramDetails