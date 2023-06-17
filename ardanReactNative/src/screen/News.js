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
import Api from '../config/Api';
import Helper from '../config/Helper';
const News = ({navigation}) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const news = () => {
    return newsData.map((news, i) => {
      if (i > 0) {
        return (
          <TouchableOpacity
            style={[
              theme.boxNews,
              theme.mb1,
              theme.bgSecondary,
              theme.borderRounded,
              theme.flexRow,
            ]}
            key={`news-${i}`}
            onPress={() => {
              navigation.navigate('NewsDetails', {
                news: news,
              });
            }}>
            <Image
              source={{uri: news.image}}
              style={[theme.boxNewsImage, theme.borderRounded, theme.w40]}
            />
            <View style={[theme.w60, theme.p1]}>
              <Text style={[theme.textH4, theme.textWhite]}>{news.title}</Text>
              <Text
                style={[theme.textWhite, theme.overflowHide, theme.textWrap]}>
                {Helper.limitWords(news.content, 20)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={[theme.boxMainNews, theme.mb2]}
            key={`news-${i}`}
            onPress={() => {
              navigation.navigate('NewsDetails', {
                news: news,
              });
            }}>
            <Image
              source={{uri: news.image}}
              style={[theme.boxMainNewsImage, theme.borderRounded]}
            />
            <View style={[theme.boxMainNewsCaption, theme.p1]}>
              <Text style={[theme.textWhite, theme.textH6]}>{news.title}</Text>
              <Text style={[theme.textWhite]}>
                {Helper.limitWords(news.content, 20)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };
  const getNews = async () => {
    setLoading(true);
    try {
      let payload = {
        page: 1,
        perPage: '~',
        search: '',
        sortBy: 'id',
        sortDesc: true,
      };
      let req = await Api.listNews(payload, 'randomtoken');
      if (req && req.status === 200) {
        let {data, total} = req.data;
        setNewsData(data);
      } else {
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getNews();
      }
    });
    return () => (mounted = false);
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
            News and Feed
          </Text>
          <View style={[theme.p1]}>
            {news()}
            <View style={[theme.w100, theme.alignCenter, theme.pb5, theme.mt3]}>
              <TouchableOpacity>
                <Text style={[theme.textH4, theme.textWhite]}>Show More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Navigation navigation={navigation} />
    </SafeAreaView>
  );
};

export default News;
