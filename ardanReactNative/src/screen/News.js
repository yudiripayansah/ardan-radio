import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
const News = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const [newsItem,setNewsItem] = useState({
    data: [],
    loading: false
  })
  const getNews = async () => {
    setNewsItem({
      data: [],
      loading: true
    })
    try {
      let theData = []
      let payload = {
        page : 1,
        perPage : 10,
        sortDir : 'DESC',
        sortBy : 'id',
        search : null,
      }
      let req = await Api.newsRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setNewsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setNewsItem({
        data: [],
        loading: false
      })
    }
  }
  useEffect(() => {
    getNews()
  }, [])
  let categoryItem = [
    {
      image: require('../assets/images/category/1.png'),
      title:"Terbaru"
    },
    {
      image: require('../assets/images/category/2.png'),
      title:"Musik"
    },
    {
      image: require('../assets/images/category/3.png'),
      title:"Film"
    },
    {
      image: require('../assets/images/category/4.png'),
      title:"Hiburan"
    },
    {
      image: require('../assets/images/category/5.png'),
      title:"Jalan-Jalan"
    },
    {
      image: require('../assets/images/category/1.png'),
      title:"Kuliner"
    },
    {
      image: require('../assets/images/category/2.png'),
      title:"Dunia"
    },
    {
      image: require('../assets/images/category/3.png'),
      title:"Fashion"
    },
  ]
  
  const Recomended = () => {
    return (
      <View style={[]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Recomended</Text>
          <TouchableOpacity style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            newsItem.data.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15, theme.w230, theme.br24, {backgroundColor:'#504B4B'}]} key={i} onPress={() => {
                navigation.navigate('NewsDetails', {
                  id: item.id
                });
              }}>
                <Image source={{uri:item.image_url}} style={[theme.wp100, theme.h150,theme.brtl24,theme.brtr24, {objectFit: 'cover'}]}/>
                <View style={[theme.p10]}>
                  <Text style={[theme['h12-500'], theme.cwhite]}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const Latest = () => {
    return (
      <View style={[theme.mt25]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter,theme.mb10]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Latest News</Text>
        </View>
        <View style={[theme.px15]}>
        {
          newsItem.data.map((item,i) => {
            return (
            <TouchableOpacity style={[theme.me15, theme.wp100, theme.br24, {backgroundColor:'#504B4B'}, theme.fRow,theme.p15, theme.mb10]} key={i} onPress={() => {
              navigation.navigate('NewsDetails', {
                id: item.id
              });
            }}>
              <Image source={{uri:item.image_url}} style={[theme.w100, theme.h100,theme.br12, {objectFit: 'cover'}]}/>
              <View style={[theme.ps15, theme.wp68]}>
                <Text style={[theme['h16-500'], theme.cwhite]}>{item.title}</Text>
                <View style={[theme.fRow,theme.faCenter,theme.fjBetween]}>
                  {/* <Text style={[theme['h10-400'], theme.cwhite, theme.bgyellow,theme.px10,theme.py3,theme.br100,theme.fjCenter]}>{item.category}</Text> */}
                  <Text style={[theme['h10-400'], theme.cyellow]}>{Helper.dateIndo(item.created_at)}</Text>
                </View>
              </View>
            </TouchableOpacity>
            )
          })
        }
        </View>
      </View>
    )
  }
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
              <TouchableOpacity style={[theme.me15,theme.faCenter, theme.mb50]} key={i}>
                <View style={[theme.w60,theme.h60,theme.faCenter,theme.fjCenter,(i!=0) ? {backgroundColor:'#EDEDED'}: (theme.bgyellow),theme.br12]}>
                  <Image source={item.image}/>
                </View>
                <Text style={[theme['p12-500'],(i!=0) ? {color: '#8D9093'}: (theme.cyellow),theme.mt5 ]}>{item.title}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <ScrollView style={[theme.mb150]}>
        <Recomended/>
        <Latest/>
        <View style={[theme.mb150]}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default News