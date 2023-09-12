import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from '../context/ThemeContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
import RenderHtml from 'react-native-render-html';
const SocialSharingDetails = ({ route, navigation }) => {
  const imageWidth = Dimensions.get('window').width - 60;
  const theme = useContext(ThemeContext)
  const [feedsItem,setFeedsItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null,
      user: {
        name: null
      }
    },
    loading: false
  })
  const {id} = route.params
  const getFeeds = async () => {
    setFeedsItem({
      data: {
        image: 'https://placehold.co/600x400',
        title: null,
        text: null,
        user: {
          name: null
        }
      },
      loading: true
    })
    try {
      let theData = []
      let payload = {
        id: id
      }
      let req = await Api.feedsGet(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = data
        }
      }
      setFeedsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setFeedsItem({
        data: {
          image: 'https://placehold.co/600x400',
          title: null,
          text: null
        },
        loading: false
      })
    }
  }
  const commentsItems = [
    {
      image: require('../assets/images/user/1.png'),
      name: 'Austin Nomad',
      comments: 'Nulla sed ullamcorper ligula. Vivamus sit quis  amet tellus fermentum, sodales dui id.'
    },
    {
      image: require('../assets/images/user/2.png'),
      name: 'Nikita',
      comments: 'Nulla sed ullamcorper ligula. Vivamus sit quis  amet tellus fermentum, sodales dui id.'
    },
    {
      image: require('../assets/images/user/3.png'),
      name: 'MIchael',
      comments: 'Nulla sed ullamcorper ligula. Vivamus sit quis  amet tellus fermentum, sodales dui id.'
    },
    {
      image: require('../assets/images/user/4.png'),
      name: 'Ronan',
      comments: 'Nulla sed ullamcorper ligula. Vivamus sit quis  amet tellus fermentum, sodales dui id.'
    }
  ]
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
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[theme.px15]}>
        <View style={[theme.mt25,{backgroundColor:'#444548'},theme.p15,theme.br12]}>
          <View style={[theme.fRow, theme.faCenter, theme.me10]}>
            <Image source={(feedsItem.data.user.image_url) ? {uri:feedsItem.data.user.image_url} : {uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}} style={[theme.w55,theme.h55,theme.br100,theme.me15]}/>
            <View>
              <Text style={[theme['h20-500'],theme.cwhite]}>{feedsItem.data.user.name}</Text>
              <View style={[theme.fRow,theme.faCenter]}>
                {/* <Text style={[theme['p12-400'],theme.cyellow,theme.me3]}>Musik -</Text> */}
                <Text style={[theme['p12-400'],theme.cyellow,theme.me5]}>{Helper.dateIndo(feedsItem.data.created_at)}</Text>
              </View>
            </View>
          </View>
          <Text style={[theme['h22-700'],theme.cwhite,theme.mt15,theme.mb5]}>{feedsItem.data.title}</Text>
          <AutoHeightImage
            width={imageWidth}
            source={{uri:feedsItem.data.image}}
          />
          <RenderHtml
            contentWidth={imageWidth}
            source={{html:`<div style="color:#9DA3AF;">${feedsItem.data.text}</div>`}}
          />
          <View style={[theme.fRow,theme.fjBetween,theme.mt25]}>
            <View style={[theme.fRow,theme.faCenter]}>
              <Image source={require('../assets/images/user/1.png')} style={[theme.w17,theme.h17]}/>
              <Image source={require('../assets/images/user/2.png')} style={[theme.w17,theme.h17]}/>
              <Image source={require('../assets/images/user/3.png')} style={[theme.w17,theme.h17]}/>
              <Text style={[theme['p6-400'],{color:'#C9C9C9'},theme.ms5]}>12 orang menyukai ini</Text>
            </View>
            <View style={[theme.fRow,theme.faCenter]}>
              <Image source={require('../assets/images/icons/reply.png')} style={[theme.w9,theme.h9]}/>
              <Text style={[theme['p6-400'],{color:'#C9C9C9'},theme.ms5]}>Balas</Text>
            </View>
          </View>
        </View>
        {
          commentsItems.map((item,i) => {
            return (
              <View style={[theme.mt25,{backgroundColor:'#444548'},theme.p15,theme.br12]} key={i}>
              <View style={[theme.fRow, theme.faCenter, theme.me10]}>
                <Image source={item.image} style={[theme.w55,theme.h55,theme.br100,theme.me15]}/>
                <View>
                  <Text style={[theme['h20-500'],theme.cwhite]}>{item.name}</Text>
                  <View style={[theme.fRow,theme.faCenter]}>
                    <Text style={[theme['p12-400'],theme.cyellow,theme.me3]}>Sep 25 -</Text>
                    <Text style={[theme['p12-400'],theme.cyellow,theme.me5]}>12.00</Text>
                  </View>
                </View>
              </View>
              <Text style={[theme['p14-400'],{color:'#9DA3AF'},theme.mt25]}>
              {item.comments}
              </Text>
              <View style={[theme.fRow,theme.fjEnd,theme.mt25]}>
                <View style={[theme.fRow,theme.faCenter,theme.me10]}>
                  <Image source={require('../assets/images/icons/heart.png')} style={[theme.w9,theme.h9]}/>
                  <Text style={[theme['p6-400'],{color:'#C9C9C9'},theme.ms5]}>Like</Text>
                </View>
                <View style={[theme.fRow,theme.faCenter]}>
                  <Image source={require('../assets/images/icons/reply.png')} style={[theme.w9,theme.h9]}/>
                  <Text style={[theme['p6-400'],{color:'#C9C9C9'},theme.ms5]}>Balas</Text>
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

export default SocialSharingDetails