import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Share from 'react-native-share';
import Icons from '../components/Icons';
import {RadioContext} from '../context/RadioContext';
const NewsDetails = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = Dimensions.get('window').width - 40;
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
      url: 'ardanmobileapps://NewsDetails/' + id,
    };
    let share = Share.open(opt);
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt130 : theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.px20]}>
          <AutoHeightImage
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
                doShare(newsItem.id);
              }}>
              <Image source={Icons.share} width={16} height={16} />
            </TouchableOpacity>
            <Text style={[theme['h12-400'], theme.cwhite, theme.mt20]}>
              {newsItem.data.text}
            </Text>
          </View>
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetails;
