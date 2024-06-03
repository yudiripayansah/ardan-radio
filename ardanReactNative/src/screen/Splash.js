import React, { useEffect, useContext } from 'react'
import { View, Image, SafeAreaView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import analytics from '@react-native-firebase/analytics';
const Splash = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Splash',
      screen_class: 'Splash',
    });
  }
  useEffect(() => {
    gAnalytics()
  }, [])

  return (
    <SafeAreaView style={[{backgroundColor:'#090903'}, theme.wp100, theme.hp100,theme.faCenter, theme.fjCenter, {flex: 1}]}>
          <Image
            style={[theme.w135, theme.h78, {objectFit: 'contain'}]}
            source={require('../assets/images/logo-ardan.png')}
          />
    </SafeAreaView>
  )
}

export default Splash