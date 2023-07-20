import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'
import Header from '../components/Header'
const Profile = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60]}>
      <ScrollView style={[]}>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile