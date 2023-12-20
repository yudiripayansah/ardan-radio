import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreatePost from './CreatePost'
import CreateSharing from './CreateSharing'
const CreateFeedTab = createMaterialTopTabNavigator();
const CreateFeed = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  useEffect(() => {
    
  }, [])

  return (
    <KeyboardAvoidingView style={[theme.bgblack,{flexGrow: 1},theme.pt60, theme.relative, theme.px25]}>
      <CreateFeedTab.Navigator 
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: [theme['p16-700']],
          tabBarStyle: { backgroundColor: 'transparent' },
          tabBarIndicatorStyle:{backgroundColor: '#F8C303'}
        }}
      >
        <CreateFeedTab.Screen name="Post" component={CreatePost} />
        <CreateFeedTab.Screen name="Sharing" component={CreateSharing} />
      </CreateFeedTab.Navigator>
    </KeyboardAvoidingView>
  )
}

export default CreateFeed