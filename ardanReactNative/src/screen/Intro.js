import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Navigation from '../components/Navigation'
import AppIntroSlider from 'react-native-app-intro-slider';
const Feed = ({ navigation }) => {
    const theme = useContext(ThemeContext)
    useEffect(() => {
        
    }, [])
    let introItems = [
      {
        title: 'Pelajari banyak hal dari Audio Streaming',
        text: 'Temukan berbagai konten menarik disini',
        image: require('../assets/images/splash.png'),
      },
      {
        title: 'Makin dekat dalam siaran',
        text: 'Kamu bisa ikuti kegiatan melalui Live Streaming',
        image: require('../assets/images/splash-2.png'),
      },
      {
        title: 'Nikmati musik  lebih seru',
        text: 'Nyaman menikmati musik dimanapun dan kapanpun',
        image: require('../assets/images/splash-3.png'),
      }
    ]
    let dotStyle = {
      ...theme.bsolid,
      ...theme.byellow,
      ...theme.bw1,
      ...theme.w8,
      ...theme.h8,
      ...theme.me10,
      ...theme.br100
    }
    let activeDotStyle = { 
      ...theme.bgyellow, 
      ...theme.w50
    }
    let btnStyle = {
      ...theme.bgyellow,
      ...theme.w190,
      ...theme.h70,
      ...theme.faCenter,
      ...theme.fjCenter,
      ...theme.br42
    }
    let pagination = (activeIndex) => {
      return (
        <View style={[theme.absolute, theme.bottom0,theme.left0,theme.right0, theme.wp100, theme.px20, theme.pb60]}>
          <View style={[theme.fRow, theme.wp100, theme.mb70]}>
          {introItems.length > 1 &&
              introItems.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    dotStyle,
                    i === activeIndex
                      ? activeDotStyle
                      : theme.bgnone,
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          <View style={[theme.faCenter, theme.wp100]}>
            <TouchableOpacity style={btnStyle} onPress={() => {navigation.navigate('Login');}}>
              <Text style={[theme['h20-600'], theme.cblack]}>Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    let elementItems = ({item}) => {
      return (
        <ImageBackground source={item.image} resizeMode="cover" style={[theme.wp100, theme.hp100, theme.bgblack, {flex: 1}]}>
          <View style={[ theme.px20, theme.py20, theme.absolute, theme.bottom200 ]}>
            <Text style={[theme['h27-700'], theme.cwhite]}>{item.title}</Text>
            <Text style={[theme['h18-500'], theme.cwhite]}>{item.text}</Text>
          </View>
        </ImageBackground>
      )
    }
    return (
      <AppIntroSlider renderItem={elementItems} renderPagination={pagination} data={introItems}/>
    )
}

export default Feed