import React, {Component, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Helper from '../config/Helper'
const NewsDetails = ({route, navigation}) => {
  const theme = useContext(ThemeContext);
  const {news} = route.params;
  useEffect(() => {
    
  }, []);
  return (
    <SafeAreaView style={[theme.bgPrimary, theme.container]}>
      <ScrollView>
        <View>
          <Text
            style={[
              theme.px1,
              theme.py2,
              theme.textH2,
              theme.textLightPurple,
              theme.bgSecondary,
              theme.textUppercase,
            ]}>
            {news.title}
          </Text>
          <View style={[theme.p1]}>
            <Image
              source={{uri: news.image}}
              style={[theme.boxMainNewsImage, theme.borderRounded, theme.w100]}
            />
            <Text style={[theme.mt1, theme.textWhite, theme.textH6]}>{Helper.dateFormatId(news.created_at)}</Text>
            <Text style={[theme.mt2, theme.textWhite, theme.pb5, theme.mb5]}>
                {news.content}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Navigation navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewsDetails;
