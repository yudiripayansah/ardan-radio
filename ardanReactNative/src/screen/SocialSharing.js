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
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';
const SocialSharing = ({navigation}) => {
  const imageWidth = Dimensions.get('window').width - 60;
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState(null);
  const [feedsItem, setFeedsItem] = useState({
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
        type: 'Feeds',
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
  const getFeeds = async (cat = null) => {
    setFeedsItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
        type: 'SHARING',
        status: 'PUBLISHED',
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
      let req = await Api.feedsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setFeedsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setFeedsItem({
        data: [],
        loading: false,
      });
    }
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getFeeds();
        getCategory();
      }
    });
    return () => (mounted = false);
  }, []);
  let categoryItem = [
    'Terbaru',
    'Musik',
    'Film',
    'Hiburan',
    'Jalan-Jalan',
    'Kuliner',
    'Dunia',
    'Fashion',
  ];
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, theme.relative, theme.pb120]}>
      <View
        style={[
          theme.fRow,
          theme.faCenter,
          {backgroundColor: '#444548'},
          theme.my25,
          theme.br12,
          theme.px15,
        ]}>
        <TouchableOpacity
          onPress={() => {
            getFeeds();
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
            getFeeds();
          }}
          clearButtonMode="while-editing"
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[]}>
        <TouchableOpacity
          style={[theme.mb25]}
          onPress={() => {
            getFeeds();
          }}>
          <Text
            style={[
              theme['p14-500'],
              theme.fjCenter,
              theme.h32,
              theme.px13,
              theme.py5,
              theme.br12,
              'All' == activeCat
                ? (theme.cwhite, theme.bgyellow)
                : {color: '#8D9093'},
            ]}>
            All
          </Text>
        </TouchableOpacity>
        {category.data.map((item, i) => {
          return (
            <TouchableOpacity
              style={[theme.mb25]}
              key={i}
              onPress={() => {
                getFeeds(item.title);
              }}>
              <Text
                style={[
                  theme['p14-500'],
                  theme.fjCenter,
                  theme.h32,
                  theme.px13,
                  theme.py5,
                  theme.br12,
                  item.title == activeCat
                    ? (theme.cwhite, theme.bgyellow)
                    : {color: '#8D9093'},
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView style={[theme.mb100]} showsVerticalScrollIndicator={false}>
        {feedsItem.loading ? (
          <View style={[theme.py100]}>
            <ActivityIndicator size="large" color="#F8C303" />
          </View>
        ) : (
          feedsItem.data.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SocialSharingDetails', {id: item.id});
                }}
                style={[
                  theme.mb20,
                  {backgroundColor: '#444548'},
                  theme.py12,
                  theme.px15,
                  theme.br12,
                  theme.fRow,
                ]}
                key={i}>
                <Image
                  source={
                    item.user.image_url
                      ? {uri: item.user.image_url}
                      : {
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                        }
                  }
                  style={[theme.h55, theme.w55, theme.br12, theme.me15]}
                />
                <View style={[theme.fRow, theme.wp70]}>
                  <View>
                    <Text style={[theme['p16-500'], theme.cwhite]}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={[theme.fRow, theme.faCenter, theme.mb15]}>
                    <Text
                      style={[theme['p12-400'], {color: 'grey'}, theme.me10]}>
                      {item.name}
                    </Text>
                    <Text style={[theme['p12-400'], {color: 'grey'}]}>
                      {item.time}
                    </Text>
                  </View>
                  <View style={[theme.fRow, theme.wp100]}>
                    <View
                      style={[
                        {backgroundColor: '#1D2028'},
                        theme.br6,
                        theme.p5,
                        theme.faCenter,
                        theme.fRow,
                        theme.me10,
                      ]}>
                      <Icon name="heart" size={15} color="#F8C303" />
                      <Text style={[theme['p12-400'], {color: '#8D9093'}]}>
                        {item.likes}
                      </Text>
                    </View>
                    <View
                      style={[
                        {backgroundColor: '#1D2028'},
                        theme.br6,
                        theme.p5,
                        theme.faCenter,
                        theme.fRow,
                      ]}>
                      <Icon name="comment" size={15} color="#F8C303" />
                      <Text style={[theme['p12-400'], {color: '#8D9093'}]}>
                        {item.comments}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SocialSharing;
