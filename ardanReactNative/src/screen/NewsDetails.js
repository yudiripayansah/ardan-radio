import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Share from 'react-native-share';
import Icons from '../components/Icons';
import {RadioContext} from '../context/RadioContext';
import RenderHtml from 'react-native-render-html';
import analytics from '@react-native-firebase/analytics';
const NewsDetails = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = useWindowDimensions().width - 40;
  const theme = useContext(ThemeContext);
  const [newsItem, setNewsItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null,
    },
    loading: false,
  });
  const {id} = route.params;
  const getNews = async () => {
    setNewsItem({
      data: {
        image: 'https://placehold.co/600x400',
        title: null,
        text: null,
      },
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        id: id,
      };
      let req = await Api.newsGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setNewsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setNewsItem({
        data: {
          image: 'https://placehold.co/600x400',
          title: null,
          text: null,
        },
        loading: false,
      });
    }
  };
  const doShare = async id => {
    let opt = {
      title: 'Check this News on Ardan Radio',
      message: 'Check this News on Ardan Radio',
      url: 'https://ardanmobileapps.ardangroup.fm/news/' + id,
    };
    let share = Share.open(opt);
  };
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'News Details',
      screen_class: 'NewsDetails',
    });
  }
  useEffect(() => {
    gAnalytics()
    getNews();
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt130 : theme.pt60, theme.relative]}>
      <ScrollView style={[]} showsVerticalScrollIndicator={false}>
        <View style={[theme.px20]}>
          <AutoHeightImage
            contentWidth={imageWidth}
            width={imageWidth}
            source={{uri: newsItem.data.image}}
          />
          <View style={[theme.mt10]}>
            <Text style={[theme['h24-700'], theme.cwhite]}>
              {newsItem.data.title}
            </Text>
            <Text style={[theme['p12-400'], theme.cyellow]}>
              {Helper.dateIndo(newsItem.data.created_at)}
            </Text>
            <TouchableOpacity
              style={[theme.fRow, theme.faCenter, theme.mt10]}
              onPress={() => {
                doShare(newsItem.data.id);
              }}>
              <Image source={Icons.share} style={[{height:16,width:16,objectFit:'contain'}]} />
            </TouchableOpacity>
            <View style={[theme.mt20]}>
              <RenderHtml
                contentWidth={imageWidth}
                source={{
                  html: `<div style="color:#fff;">${newsItem.data.text}</div>`,
                }}
              />
            </View>
          </View>
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetails;
