import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Navigation from '../components/Navigation'
import analytics from '@react-native-firebase/analytics';
const Feed = ({ navigation }) => {
    const theme = useContext(ThemeContext)
    
    const gAnalytics = () => {
        analytics().logScreenView({
        screen_name: 'Feed',
        screen_class: 'Feed',
        });
    }
    useEffect(() => {
        gAnalytics()
    }, [])

    return (
        <SafeAreaView style={[theme.bgPrimary, theme.container]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={[theme.px1, theme.py2, theme.textH2, theme.textLightPurple, theme.bgSecondary, theme.textUppercase]}>Feed</Text>
                </View>
            </ScrollView>
            <Navigation navigation={navigation}/>
        </SafeAreaView>
    )
}

export default Feed