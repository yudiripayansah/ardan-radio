import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from '../context/ThemeContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
const NewsDetails = ({ route,navigation }) => {
  const imageWidth = Dimensions.get('window').width - 60;
  const theme = useContext(ThemeContext)
  const [newsItem,setNewsItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null
    },
    loading: false
  })
  const {id} = route.params
  const getNews = async () => {
    setNewsItem({
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
      let req = await Api.newsGet(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = data
        }
      }
      setNewsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setNewsItem({
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
    getNews()
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.px30]}>
          <AutoHeightImage
            width={imageWidth}
            source={{uri:newsItem.data.image}}
          />
          <View style={[theme.mt10]}>
            <Text style={[theme['h24-700'],theme.cwhite]}>{newsItem.data.title}</Text>
            <Text style={[theme['p12-400'],theme.cyellow]}>{Helper.dateIndo(newsItem.data.created_at)}</Text>
            <Text style={[theme['h12-400'],theme.cwhite,theme.mt20]}>
            {newsItem.data.text} 
            </Text>
          </View>
        </View>
        <View style={[theme.mb150]}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewsDetails