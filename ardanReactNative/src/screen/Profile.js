import React, { useEffect, useContext, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, ActivityIndicator,Dimensions} from 'react-native'
import RenderHtml from 'react-native-render-html';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from '../context/ThemeContext'
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
const Profile = ({ navigation }) => {
  const imageWidth = Dimensions.get('window').width-20;
  const theme = useContext(ThemeContext)
  const user = useContext(UserContext);
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
        id_user: user.id,
        type: 'POST',
      }
      console.log(payload)
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
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60]}>
      <ScrollView style={[]}>
        <View style={[theme.px10,theme.pt10,theme.mb100]}>
          <View style={[theme.fRow]}>
            <Image source={(user.image) ? {uri: user.image} : {uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}} style={[theme.w80, theme.h80,theme.br10, {objectFit: 'cover'}]}/>
            <View style={[theme.ms10]}>
              <Text style={[theme.cwhite, theme['h16-700']]}>{user.name}</Text>
              {
                (user.address) ? (
                  <Text style={[theme.cpale_white, theme['h12-400']]}>{user.address}</Text>
                ) : null
              }
              <Text style={[theme.cpale_white, theme['h12-400']]}>{user.email}</Text>
            </View>
          </View>
          <View style={[theme.fRow, theme.py30]}>
            <View style={[theme.wp33,theme.faCenter,theme.fjCenter]}>
              <Text style={[theme.cwhite,theme['h18-600']]}>167</Text>
              <Text style={[theme.cpale_white,theme['h14-500']]}>Post</Text>
            </View>
            <View style={[theme.wp33,theme.faCenter,theme.fjCenter]}>
              <Text style={[theme.cwhite,theme['h18-600']]}>5000</Text>
              <Text style={[theme.cpale_white,theme['h14-500']]}>Followers</Text>
            </View>
            <View style={[theme.wp33,theme.faCenter,theme.fjCenter]}>
              <Text style={[theme.cwhite,theme['h18-600']]}>350</Text>
              <Text style={[theme.cpale_white,theme['h14-500']]}>Following</Text>
            </View>
          </View>
          <View style={[theme.faCenter,theme.wp100,theme.fRow,theme.fjCenter]}>
            <TouchableOpacity style={[theme.bw2,theme.bsolid,theme.byellow,theme.w100,theme.h40,theme.mx20,theme.faCenter,theme.fjCenter,theme.br100]}>
              <Text style={[theme.cwhite,theme['h16-600']]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[theme.bw2,theme.bsolid,theme.byellow,theme.w100,theme.h40,theme.mx20,theme.faCenter,theme.fjCenter,theme.br100]}>
              <Text style={[theme.cwhite,theme['h16-600']]}>Message</Text>
            </TouchableOpacity>
          </View>
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
                  <View style={[theme.h15]}/>
                  <RenderHtml
                    contentWidth={imageWidth}
                    source={{html:`<div style="color:#fff;">${item.text}</div>`}}
                    style={[theme.mt10,theme.mb10]}
                  />
                  <View style={[theme.h10]}/>
                  {/* <Text style={[theme['p14-400'],theme.cwhite,theme.mb20]}>{item.text}</Text> */}
                  {
                  (item.image_url) &&
                    <AutoHeightImage
                      width={imageWidth}
                      source={{uri:item.image_url}}
                    />
                  }
                  <View style={[theme.fRow,theme.faCenter,theme.mt10]}>
                    <TouchableOpacity style={[theme.fRow,theme.faCenter,theme.me15]}>
                      <Icon name="heart" size={20} color="#F8C303" />
                      <Text style={[theme['p12-400'],theme.cwhite,theme.ms5]}>100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[theme.fRow,theme.faCenter]}>
                      <Icon name="comment" size={20} color="#F8C303" />
                      <Text style={[theme['p12-400'],theme.cwhite,theme.ms5]}>100</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile