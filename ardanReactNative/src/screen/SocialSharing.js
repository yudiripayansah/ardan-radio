import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const SocialSharing = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  useEffect(() => {
    
  }, []) 
  let postItem = [
    {
      profile: require('../assets/images/user/1.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '204',
      comments: '30',
      title: 'Any Nomad’s want to live in Austin; April, May or June?'
    },
    {
      profile: require('../assets/images/user/2.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '304',
      comments: '30',
      title: 'Where do you spend winter?'
    },
    {
      profile: require('../assets/images/user/3.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '304',
      comments: '30',
      title: 'How do you avoid settling in one place?'
    },
    {
      profile: require('../assets/images/user/4.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '304',
      comments: '30',
      title: 'Where do you spend winter?'
    },
    {
      profile: require('../assets/images/user/1.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '204',
      comments: '30',
      title: 'Any Nomad’s want to live in Austin; April, May or June?'
    },
    {
      profile: require('../assets/images/user/2.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '304',
      comments: '30',
      title: 'Where do you spend winter?'
    },
    {
      profile: require('../assets/images/user/3.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '304',
      comments: '30',
      title: 'How do you avoid settling in one place?'
    },
    {
      profile: require('../assets/images/user/4.png'),
      name: 'Lucas Mokmana',
      time: '2m ago',
      likes: '304',
      comments: '30',
      title: 'Where do you spend winter?'
    }
  ]
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
          postItem.map((item,i) => {
            return (
              <View style={[theme.mb20,{backgroundColor:'#444548'},theme.py12,theme.px15,theme.br12,theme.fRow]} key={i}>
                <Image source={item.profile} style={[theme.h55,theme.w55,theme.br12,theme.me15]}/>
                <View style={[theme.fRow,theme.wp70]}>
                  <TouchableOpacity onPress={() => {navigation.navigate('SocialSharingDetails')}}>
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