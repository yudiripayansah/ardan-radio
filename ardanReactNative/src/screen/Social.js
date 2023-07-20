import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SocialPost from './SocialPost'
import SocialSharing from './SocialSharing'
const SocialTab = createMaterialTopTabNavigator();
const Social = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative, theme.px30]}>
      <SocialTab.Navigator 
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: [theme['p16-700']],
          tabBarStyle: { backgroundColor: 'transparent' },
          tabBarIndicatorStyle:{backgroundColor: '#F8C303'}
        }}
      >
        <SocialTab.Screen name="Post" component={SocialPost} />
        <SocialTab.Screen name="Sharing" component={SocialSharing} />
      </SocialTab.Navigator>
    </SafeAreaView>
  )
}

export default Social