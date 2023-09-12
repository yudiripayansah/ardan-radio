import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from '../context/ThemeContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
import RenderHtml from 'react-native-render-html';
const SocialSharing = ({ navigation }) => {
  const imageWidth = Dimensions.get('window').width - 60;
  const theme = useContext(ThemeContext)
  const [feedsItem,setFeedsItem] = useState({
    data: [],
    loading: false
  })
  const getFeeds = async () => {
    setFeedsItem({
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
        type: 'SHARING',
        status: 'PUBLISHED'
      }
      let req = await Api.feedsRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setFeedsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setFeedsItem({
        data: [],
        loading: false
      })
    }
  }
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getFeeds()
      }
    });
    return () => (mounted = false);
  }, []);
  let categoryItem = ["Terbaru","Musik","Film","Hiburan","Jalan-Jalan","Kuliner","Dunia","Fashion"]
  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1}, theme.relative, theme.pb120]}>
      <View style={[theme.fRow,theme.faCenter,{backgroundColor:'#444548'},theme.my25,theme.br12,theme.px15]}>
        <Image source={require('../assets/images/icons/search.png')} style={[theme.me5,theme.w25,theme.h25]}/>
        <TextInput placeholder="Search..." style={[theme.cwhite,theme['p14-400'],theme.wp90]} placeholderTextColor="#fff"/>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[]}>
        {
          categoryItem.map((item,i) => {
            return (
              <TouchableOpacity style={[theme.mb25]} key={i}>
                <Text style={[theme['p14-500'],theme.fjCenter,theme.h32,theme.px13,theme.py5,theme.br12,(i!=0) ? {color: '#8D9093'}: (theme.cwhite,theme.bgyellow) ]}>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <ScrollView style={[theme.mb100]} showsVerticalScrollIndicator={false}>
        {
          (feedsItem.loading) ? (
            <View style={[theme.py100]}>
              <ActivityIndicator size="large" color="#F8C303" />
            </View>
          ) :
          feedsItem.data.map((item,i) => {
            return (
              <View style={[theme.mb20,{backgroundColor:'#444548'},theme.py12,theme.px15,theme.br12,theme.fRow]} key={i}>
                <Image source={(item.user.image_url) ? {uri:item.user.image_url} : {uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}} style={[theme.h55,theme.w55,theme.br12,theme.me15]}/>
                <View style={[theme.fRow,theme.wp70]}>
                  <TouchableOpacity onPress={() => {navigation.navigate('SocialSharingDetails',{id:item.id})}}>
                    <Text style={[theme['p16-500'],theme.cwhite]}>{item.title}</Text>
                  </TouchableOpacity>
                  <View style={[theme.fRow, theme.faCenter,theme.mb15]}>
                    <Text style={[theme['p12-400'],{color:'grey'},theme.me10]}>{item.name}</Text>
                    <Text style={[theme['p12-400'],{color:'grey'}]}>{item.time}</Text>
                  </View>
                  <View style={[theme.fRow,theme.wp100]}>
                    <View style={[{backgroundColor:'#1D2028'},theme.br6,theme.p5,theme.faCenter,theme.fRow,theme.me10]}>
                      <Image source={require('../assets/images/icons/likes-fill.png')} style={[theme.me3]}/>
                      <Text style={[theme['p12-400'],{color:'#8D9093'}]}>{item.likes}</Text>
                    </View>
                    <View style={[{backgroundColor:'#1D2028'},theme.br6,theme.p5,theme.faCenter,theme.fRow]}>
                      <Image source={require('../assets/images/icons/comments-fill.png')} style={[theme.me3]}/>
                      <Text style={[theme['p12-400'],{color:'#8D9093'}]}>{item.comments}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default SocialSharing