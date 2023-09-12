import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from '../context/ThemeContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
const ProgramDetails = ({ route, navigation }) => {
  const imageWidth = Dimensions.get('window').width - 60;
  const theme = useContext(ThemeContext)
  const [programsItem,setProgramsItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null
    },
    loading: false
  })
  const {id} = route.params
  const getPrograms = async () => {
    setProgramsItem({
      data: {
        image: 'https://placehold.co/600x400',
        title: null,
        text: null
      },
      loading: true
    })
    try {
      let theData = []
      let payload = {
        id: id
      }
      let req = await Api.programsGet(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = data
        }
      }
      setProgramsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setProgramsItem({
        data: {
          image: 'https://placehold.co/600x400',
          title: null,
          text: null
        },
        loading: false
      })
    }
  }
  useEffect(() => {
    getPrograms()
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.px30]}>
          <AutoHeightImage
            width={imageWidth}
            source={{uri:programsItem.data.image}}
          />
          <View style={[theme.mt10]}>
            <Text style={[theme['h24-700'],theme.cwhite]}>{programsItem.data.title}</Text>
            <View style={[theme.fRow]}>
              <View style={[theme.fRow,theme.me15]}>
                <Image style={[theme.me5,theme.w15,theme.h15]} source={require('../assets/images/icons/calendar.png')}/>
                <Text style={[theme['h12-400'],theme.cwhite]}>{programsItem.data.days_label}</Text>
              </View>
              <View style={[theme.fRow]}>
                <Image style={[theme.me5,theme.w15,theme.h15]} source={require('../assets/images/icons/discovery.png')}/>
                <Text style={[theme['h12-400'],theme.cwhite]}>{programsItem.data.time}</Text>
              </View>
            </View>
            <Text style={[theme['h18-700'],theme.cwhite,theme.mt15]}>Description</Text>
            <Text style={[theme['h12-400'],theme.cwhite]}>
              {programsItem.data.text}
            </Text>
            <Text style={[theme['h18-700'],theme.cwhite,theme.mt15]}>
              Penyiar
            </Text>
            <Text style={[theme['h12-400'],theme.cwhite]}>
            {programsItem.data.penyiar_name}
            </Text>
          </View>
        </View>
        <View style={[theme.mb150]}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProgramDetails