import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from '../context/ThemeContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
import RenderHtml from 'react-native-render-html';
const SocialPost = ({ navigation }) => {
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
        type: 'POST',
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
  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1}, theme.relative]}>
      <ScrollView style={[]}>
        {
          (feedsItem.loading) ? (
            <View style={[theme.py100]}>
              <ActivityIndicator size="large" color="#F8C303" />
            </View>
          ) :
          feedsItem.data.map((item,i) => {
            return (
              <View style={[theme.my20]} key={i}>
                <View style={[theme.fRow]}>
                  <Image source={(item.user.image_url) ? {uri:item.user.image_url} : {uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}} style={[theme.h40,theme.w40,theme.br12,theme.me15]}/>
                  <View>
                    <Text style={[theme['p16-700'],theme.cwhite]}>{item.user.name}</Text>
                    <View style={[theme.fRow, theme.faCenter]}>
                      {/* <Image source={require('../assets/images/icons/map-pin.png')} style={[theme.h15,theme.w15,theme.me5]}/>
                      <Text style={[theme['p12-400'],{color:'grey'},theme.me10]}>{item.location}</Text> */}
                      <Image source={require('../assets/images/icons/discovery.png')} style={[theme.h15,theme.w15,theme.me5]}/>
                      <Text style={[theme['p12-400'],{color:'grey'}]}>{Helper.dateIndo(item.created_at)}</Text>
                    </View>
                  </View>
                </View>
                <RenderHtml
                  contentWidth={imageWidth}
                  source={{html:`<div style="color:#fff;">${item.text}</div>`}}
                />
                {/* <Text style={[theme['p14-400'],theme.cwhite,theme.mb20]}>{item.text}</Text> */}
                <AutoHeightImage
                  width={imageWidth}
                  source={{uri:item.image_url}}
                />
                <View style={[theme.fRow,theme.faCenter,theme.mt10]}>
                  {/* <Image source={require('../assets/images/icons/likes.png')} style={[theme.h15,theme.w15,theme.me5,{objectFit:'contain'}]}/>
                  <Text style={[theme['p12-400'],{color:'grey'},theme.me10]}>{item.likes}</Text>
                  <Image source={require('../assets/images/icons/comments.png')} style={[theme.h15,theme.w15,theme.me5,{objectFit:'contain'}]}/>
                  <Text style={[theme['p12-400'],{color:'grey'}]}>{item.comments}</Text> */}
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

export default SocialPost