import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput,KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SocialPost from './SocialPost'
import SocialSharing from './SocialSharing'
import {RadioContext} from '../context/RadioContext';
const SocialTab = createMaterialTopTabNavigator();
const Social = ({ route,navigation }) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext)
  useEffect(() => {
    if(route.params.activeTab){
      navigation.navigate(route.params.activeTab)
    }
  }, [])

  return (
    <KeyboardAvoidingView style={[theme.bgblack,{flexGrow: 1},(radioState && radioState.status == 'playing') ? theme.pt130 : theme.pt60, theme.relative, theme.px20]}>
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
    </KeyboardAvoidingView>
  )
}

export default Social