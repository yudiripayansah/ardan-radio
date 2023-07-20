import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const SocialSharingDetails = ({ navigation }) => {
  const theme = useContext(ThemeContext)
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
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[theme.px15]}>
        <View style={[theme.mt25,{backgroundColor:'#444548'},theme.p15,theme.br12]}>
          <View style={[theme.fRow, theme.faCenter, theme.me10]}>
            <Image source={require('../assets/images/user/1.png')} style={[theme.w55,theme.h55,theme.br100,theme.me15]}/>
            <View>
              <Text style={[theme['h20-500'],theme.cwhite]}>Rezky Zakiri</Text>
              <View style={[theme.fRow,theme.faCenter]}>
                <Text style={[theme['p12-400'],theme.cyellow,theme.me3]}>Musik -</Text>
                <Text style={[theme['p12-400'],theme.cyellow,theme.me5]}>Sep 25</Text>
              </View>
            </View>
          </View>
          <Text style={[theme['h22-700'],theme.cwhite,theme.mt15]}>Football New Pandemic-Related Rules for 2021</Text>
          <Image source={require('../assets/images/forum.png')} style={[theme.wp100,theme.h190,theme.br24,theme.mt5]}/>
          <Text style={[theme['p14-400'],{color:'#9DA3AF'},theme.mt25]}>
          These are among the many new wrinkles in the 108-page operations manual governing the 2021 Major League Baseball season. After the players’ union rejected a recent effort by the league to push back the start of the season and shave off eight games in response to the continuing threat from the coronavirus, the standard 162-game schedule, starting on April 1 with normal travel, will be used. With pitchers and catchers reporting to spring training in Arizona and Florida in just over a week, the union and the league agreed late Monday on new health and safety protocols that build on the regulations and the lessons learned from last season
          </Text>
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