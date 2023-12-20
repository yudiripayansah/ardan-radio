import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
const News = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState(null);
  const [newsItem, setNewsItem] = useState({
    data: [],
    loading: false,
  });
  const [category, setCategory] = useState({
    data: [],
    loading: false,
  });
  const [activeCat, setActiveCat] = useState('All');
  const getCategory = async () => {
    setCategory({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 10,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
        type: 'News',
      };
      let req = await Api.categoryRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setCategory({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setCategory({
        data: [],
        loading: false,
      });
    }
  };
  const getNews = async (cat = null) => {
    setNewsItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 10,
        sortDir: 'DESC',
        sortBy: 'id',
      };
      if (search) {
        payload.search = search;
      }
      if (cat) {
        payload.category = cat;
        setActiveCat(cat);
      } else {
        setActiveCat('All');
      }
      let req = await Api.newsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setNewsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setNewsItem({
        data: [],
        loading: false,
      });
    }
  };
  useEffect(() => {
    getNews();
    getCategory();
  }, []);

  const Recomended = () => {
    return (
      <View style={[]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Recomended</Text>
        </View>
        <ScrollView
          horizontal
          style={[
            theme.wp100,
            {flexGrow: 1},
            theme.fRow,
            theme.px10,
            theme.mt10,
          ]}
          showsHorizontalScrollIndicator={false}>
          {newsItem.loading ? (
            <View style={[theme.py50]}>
              <ActivityIndicator size="large" color="#F8C303" />
            </View>
          ) : newsItem.data.length < 1 ? (
            <View style={[theme.py10, theme.fjCenter]}>
              <Text style={[theme.cwhite, theme['h12-400']]}>
                No News in this category
              </Text>
            </View>
          ) : (
            newsItem.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    theme.me15,
                    theme.w230,
                    theme.br24,
                    {backgroundColor: '#504B4B'},
                  ]}
                  key={i}
                  onPress={() => {
                    navigation.navigate('NewsDetails', {
                      id: item.id,
                    });
                  }}>
                  <Image
                    source={{uri: item.image_url}}
                    style={[
                      theme.wp100,
                      theme.h150,
                      theme.brtl24,
                      theme.brtr24,
                      {objectFit: 'cover'},
                    ]}
                  />
                  <View style={[theme.p10]}>
                    <Text style={[theme['h12-500'], theme.cwhite]}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    );
  };
  const Latest = () => {
    return (
      <View style={[theme.mt25]}>
        <View
          style={[
            theme.fRow,
            theme.fjBetween,
            theme.px10,
            theme.faCenter,
            theme.mb10,
          ]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Latest News</Text>
        </View>
        <View style={[theme.px15]}>
          {newsItem.loading ? (
            <View style={[theme.py50]}>
              <ActivityIndicator size="large" color="#F8C303" />
            </View>
          ) : newsItem.data.length < 1 ? (
            <View style={[theme.py10, theme.fjCenter]}>
              <Text style={[theme.cwhite, theme['h12-400']]}>
                No News in this category
              </Text>
            </View>
          ) : (
            newsItem.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    theme.me15,
                    theme.wp100,
                    theme.br24,
                    {backgroundColor: '#504B4B'},
                    theme.fRow,
                    theme.p15,
                    theme.mb10,
                  ]}
                  key={i}
                  onPress={() => {
                    navigation.navigate('NewsDetails', {
                      id: item.id,
                    });
                  }}>
                  <Image
                    source={{uri: item.image_url}}
                    style={[
                      theme.w100,
                      theme.h100,
                      theme.br12,
                      {objectFit: 'cover'},
                    ]}
                  />
                  <View style={[theme.ps15, theme.wp68]}>
                    <Text style={[theme['h16-500'], theme.cwhite]}>
                      {item.title}
                    </Text>
                    <View style={[theme.fRow, theme.faCenter, theme.fjBetween]}>
                      {/* <Text style={[theme['h10-400'], theme.cwhite, theme.bgyellow,theme.px10,theme.py3,theme.br100,theme.fjCenter]}>{item.category}</Text> */}
                      <Text style={[theme['h10-400'], theme.cyellow]}>
                        {Helper.dateIndo(item.created_at)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, theme.pt60, theme.relative]}>
      <View style={[theme.px15]}>
        <View
          style={[
            theme.fRow,
            theme.faCenter,
            {backgroundColor: '#12120B'},
            theme.my25,
            theme.br12,
            theme.px15,
          ]}>
          <TouchableOpacity
            onPress={() => {
              getNews();
            }}>
            <Image
              source={require('../assets/images/icons/search.png')}
              style={[theme.me5, theme.w25, theme.h25]}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search..."
            style={[theme.cwhite, theme['p14-400'], theme.wp90]}
            placeholderTextColor="#fff"
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={() => {
              getNews();
            }}
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[theme.px15]}>
        <TouchableOpacity
          style={[theme.me15, theme.faCenter, theme.mb50]}
          onPress={() => {
            getNews();
          }}>
          <View
            style={[
              theme.w60,
              theme.h60,
              theme.faCenter,
              theme.fjCenter,
              activeCat == 'All'
                ? theme.bgyellow
                : {backgroundColor: '#EDEDED'},
              theme.br12,
            ]}>
            <Icon name="star" size={30} color="#fff" />
          </View>
          <Text
            style={[
              theme['p12-500'],
              activeCat == 'All' ? theme.cyellow : {color: '#8D9093'},
              theme.mt5,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        {category.data.map((item, i) => {
          return (
            <TouchableOpacity
              style={[theme.me15, theme.faCenter, theme.mb50]}
              key={i}
              onPress={() => {
                getNews(item.title);
              }}>
              <View
                style={[
                  theme.w60,
                  theme.h60,
                  theme.faCenter,
                  theme.fjCenter,
                  activeCat == item.title
                    ? theme.bgyellow
                    : {backgroundColor: '#EDEDED'},
                  theme.br12,
                ]}>
                <Image
                  source={{uri: item.image_url}}
                  style={[theme.w30, theme.h30]}
                />
              </View>
              <Text
                style={[
                  theme['p12-500'],
                  activeCat == item.title ? theme.cyellow : {color: '#8D9093'},
                  theme.mt5,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView style={[theme.mb150]}>
        <Recomended />
        <Latest />
        <View style={[theme.mb150]} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default News;
