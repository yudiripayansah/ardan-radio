import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const SocialPost = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  useEffect(() => {
    
  }, [])
  let postItem = [
    {
      profile: require('../assets/images/postuser/1.png'),
      name: 'Lucas Mokmana',
      location: 'Shibuya, Tokyo',
      time: '2m ago',
      likes: '2.304',
      comments: '30',
      image: require('../assets/images/post/1.png'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sum sit emat 😎😎'
    },
    {
      profile: require('../assets/images/postuser/2.png'),
      name: 'Lucas Mokmana',
      location: 'Shibuya, Tokyo',
      time: '2m ago',
      likes: '2.304',
      comments: '30',
      image: require('../assets/images/post/2.png'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sum sit emat 😎😎'
    }
  ]
  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1}, theme.relative]}>
      <ScrollView style={[]}>
        {
          postItem.map((item,i) => {
            return (
              <View style={[theme.mt20,theme.mb50]} key={i}>
                <View style={[theme.fRow]}>
                  <Image source={item.profile} style={[theme.h40,theme.w40,theme.br12,theme.me15]}/>
                  <View style={[theme.mb20]}>
                    <Text style={[theme['p16-700'],theme.cwhite]}>{item.name}</Text>
                    <View style={[theme.fRow, theme.faCenter]}>
                      <Image source={require('../assets/images/icons/map-pin.png')} style={[theme.h15,theme.w15,theme.me5]}/>
                      <Text style={[theme['p12-400'],{color:'grey'},theme.me10]}>{item.location}</Text>
                      <Image source={require('../assets/images/icons/discovery.png')} style={[theme.h15,theme.w15,theme.me5]}/>
                      <Text style={[theme['p12-400'],{color:'grey'}]}>{item.time}</Text>
                    </View>
                  </View>
                </View>
                <Text style={[theme['p14-400'],theme.cwhite,theme.mb20]}>{item.caption}</Text>
                <Image source={item.image} style={[theme.wp100,theme.br12]}/>
                <View style={[theme.fRow,theme.faCenter]}>
                  <Image source={require('../assets/images/icons/likes.png')} style={[theme.h15,theme.w15,theme.me5]}/>
                  <Text style={[theme['p12-400'],{color:'grey'},theme.me10]}>{item.likes}</Text>
                  <Image source={require('../assets/images/icons/comments.png')} style={[theme.h15,theme.w15,theme.me5]}/>
                  <Text style={[theme['p12-400'],{color:'grey'}]}>{item.comments}</Text>
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