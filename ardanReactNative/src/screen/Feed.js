import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Navigation from '../components/Navigation'
const Feed = ({ navigation }) => {
    const theme = useContext(ThemeContext)
    useEffect(() => {
        
    }, [])

    return (
        <SafeAreaView style={[theme.bgPrimary, theme.container]}>
            <ScrollView>
                <View>
                    <Text style={[theme.px1, theme.py2, theme.textH2, theme.textLightPurple, theme.bgSecondary, theme.textUppercase]}>Feed</Text>
                </View>
            </ScrollView>
            <Navigation navigation={navigation}/>
        </SafeAreaView>
    )
}

export default Feed