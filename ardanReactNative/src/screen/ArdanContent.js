import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const ArdanContent = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const contentItem = [
    {
      image: require('../assets/images/content-1.png'),
      info: '323k views . 2 years ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #33 | PENGALAMAN SERAM PRAMUGARI'
    },
    {
      image: require('../assets/images/content-2.png'),
      info: '870k views . 2 years ago',
      title: 'EP. 6 DIBALIK LAYAR JURNAL RISA "NIGHTMARE SIDE" DOCUMYSTERY'
    },
    {
      image: require('../assets/images/content-3.png'),
      info: '897k views . 2 week ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #121 | NGOBROLIN JURNALRISA THE SERIES'
    },
    {
      image: require('../assets/images/content-1.png'),
      info: '323k views . 2 years ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #33 | PENGALAMAN SERAM PRAMUGARI'
    },
    {
      image: require('../assets/images/content-2.png'),
      info: '870k views . 2 years ago',
      title: 'EP. 6 DIBALIK LAYAR JURNAL RISA "NIGHTMARE SIDE" DOCUMYSTERY'
    },
    {
      image: require('../assets/images/content-3.png'),
      info: '897k views . 2 week ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #121 | NGOBROLIN JURNALRISA THE SERIES'
    },
  ]
  const instagramItem = [
    {
      image: require('../assets/images/ig/1.png')
    },
    {
      image: require('../assets/images/ig/2.png')
    },
    {
      image: require('../assets/images/ig/3.png')
    },
    {
      image: require('../assets/images/ig/4.png')
    },
    {
      image: require('../assets/images/ig/1.png')
    },
    {
      image: require('../assets/images/ig/2.png')
    },
    {
      image: require('../assets/images/ig/3.png')
    },
    {
      image: require('../assets/images/ig/4.png')
    },
  ]
  const tiktokItem = [
    {
      image: require('../assets/images/tiktok/1.png')
    },
    {
      image: require('../assets/images/tiktok/2.png')
    },
    {
      image: require('../assets/images/tiktok/3.png')
    },
    {
      image: require('../assets/images/tiktok/1.png')
    },
    {
      image: require('../assets/images/tiktok/2.png')
    },
    {
      image: require('../assets/images/tiktok/3.png')
    },
  ]
  const Content = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Content</Text>
          <TouchableOpacity style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            contentItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15, theme.w230]} key={i}>
                <Image source={item.image} style={[theme.wp100, theme.h130,theme.brtl24,theme.brtr24, {objectFit: 'cover'}]}/>
                <View style={[theme.py10]}>
                  <Text style={[theme['h12-500'], theme.cwhite]}>{item.title}</Text>
                  <Text style={[theme['h10-400'], theme.cblue_grey]}>{item.info}</Text>
                </View>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const Instagram = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Instagram</Text>
          <TouchableOpacity 
            style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            instagramItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15]}  key={i}>
                <Image source={item.image} style={[theme.w90, theme.h95,theme.br5, {objectFit: 'cover'}]}/>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const Tiktok = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Tiktok</Text>
          <TouchableOpacity 
            style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            tiktokItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15]} key={i}>
                <Image source={item.image} style={[theme.w202, theme.h264,theme.br5, {objectFit: 'cover'}]}/>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <Content/>
        <Instagram/>
        <View style={[theme.mt35, theme.px10, theme.wp100]}>
          <Image source={require('../assets/images/ads-1.png')} style={[theme.wp100,{objectFit: 'contain'}]}/>
        </View>
        <Tiktok/>
        <View style={[theme.mb180]}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ArdanContent