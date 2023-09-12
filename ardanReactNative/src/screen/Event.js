import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput,
  ActivityIndicator } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
const News = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const [eventsItem,setEventsItem] = useState({
    data: [],
    loading: false
  })
  const getEvents = async () => {
    setEventsItem({
      data: [],
      loading: true
    })
    try {
      let theData = []
      let payload = {
        page : 1,
        perPage : 5,
        sortDir : 'DESC',
        sortBy : 'id',
        search : null,
      }
      let req = await Api.eventsRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setEventsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setEventsItem({
        data: [],
        loading: false
      })
    }
  }
  useEffect(() => {
    getEvents()
  }, [])
  let categoryItem = [
    {
      title:"Terbaru"
    },
    {
      title:"Musik"
    },
    {
      title:"Film"
    },
    {
      title:"Hiburan"
    },
    {
      title:"Jalan-Jalan"
    },
    {
      title:"Kuliner"
    },
    {
      title:"Dunia"
    },
    {
      title:"Fashion"
    },
  ]
  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <View style={[theme.px15]}>
        <View style={[theme.fRow,theme.faCenter,{backgroundColor:'#12120B'},theme.my25,theme.br12,theme.px15]}>
          <Image source={require('../assets/images/icons/search.png')} style={[theme.me5,theme.w25,theme.h25]}/>
          <TextInput placeholder="Search..." style={[theme.cwhite,theme['p14-400'],theme.wp90]} placeholderTextColor="#fff"/>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[theme.px15]}>
        {
          categoryItem.map((item,i) => {
            return (
              <TouchableOpacity style={[theme.me15,theme.faCenter,theme.px20,theme.h30,theme.mb10,(i==0)? {backgroundColor:'#ED2929'}:{backgroundColor:'#252525'},theme.br8,theme.pt2]} key={i}>
                <Text style={[theme['p10-500'],theme.cwhite,theme.mt5 ]}>{item.title}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <ScrollView style={[theme.mb150,theme.mt20]}>
        <View style={[theme.fRow,theme.px15,theme.fjBetween]}>
        {
          eventsItem.data.map((item,i) => {
            return (
            <TouchableOpacity style={[theme.wp48, theme.br24,theme.mb20, {backgroundColor:'#252525'}]} key={i} onPress={() => {
              navigation.navigate('EventsDetails', {
                id: item.id
              });
            }}>
              <Image source={{uri:item.image_url}} style={[theme.wp100, theme.h120,theme.brtl24,theme.brtr24, {objectFit: 'cover'}]}/>
              <View style={[theme.p10]}>
                <Text style={[theme['h14-700'], theme.cwhite]}>{item.title}</Text>
                <Text style={[theme['h10-400'], theme.cwhite]}>{Helper.dateIndo(item.created_at)}</Text>
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

export default News