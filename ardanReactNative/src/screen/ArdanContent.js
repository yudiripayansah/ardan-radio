import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import axios from 'axios';
import {ThemeContext} from '../context/ThemeContext';
import {RadioContext} from '../context/RadioContext';
import Api from '../config/Api';
import analytics from '@react-native-firebase/analytics';
const ArdanContent = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const radioState = useContext(RadioContext).state;
  let apiKey = 'AIzaSyBOr3JxvvNcGariUrqnvsjUktQKxYGGWiI',
    channelId = 'UCogKRAj4-WLY1INM7vESjhw',
    channelName = '@ardanradio1059FM',
    tiktokUsername = '@ardanradiobdg',
    instagramUsername = 'ardanradio';
  const [youtube, setYoutube] = useState([]);
  const [ig, setIg] = useState({
    data: [],
    loading: false,
  });
  const [tiktok, setTiktok] = useState({
    data: [],
    loading: false,
  });
  const [yt, setYt] = useState({
    data: [],
    loading: false,
  });
  const [bannerAdsItem, setBannerAdsItem] = useState({
    data: [],
    loading: false,
  });
  const [search, setSearch] = useState(null);
  const getBannerAds = async () => {
    setBannerAdsItem({
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
        search: null,
        cta: 'ARDAN CONTENT',
      };
      let req = await Api.bannerRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setBannerAdsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error('Home Banner Ads', error);
      setBannerAdsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getYoutube = async () => {
    url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;
    try {
      let req = await axios.get(url);
      const {status, data} = req;
      if (status === 200) {
        setYoutube(data.items);
      }
    } catch (error) {
      console.error('get youtube:', error);
    }
  };
  const getIg = async () => {
    setIg({
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
        type: 'Instagram',
      };
      if (search) {
        payload.search = search;
      }
      let req = await Api.contentRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setIg({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setIg({
        data: [],
        loading: false,
      });
    }
  };
  const getYt = async () => {
    setYt({
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
        type: 'Youtube',
      };
      if (search) {
        payload.search = search;
      }
      let req = await Api.contentRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setYt({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setYt({
        data: [],
        loading: false,
      });
    }
  };
  const getTiktok = async () => {
    setTiktok({
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
        type: 'Tiktok',
      };
      if (search) {
        payload.search = search;
      }
      let req = await Api.contentRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setTiktok({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setTiktok({
        data: [],
        loading: false,
      });
    }
  };
  const goToUrl = async url => {
    await Linking.openURL(url);
  };
  const goToBanner = id => {
    navigation.navigate('BannerDetails', {
      id: id,
    });
  };
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Ardan Content',
      screen_class: 'ArdanContent',
    });
  }
  useEffect(() => {
    gAnalytics()
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getYoutube();
        getIg()
        getTiktok()
        getYt()
        getBannerAds()
      }
    });
    return () => (mounted = false);
  }, []);
  const SlideBanner = (theAds) => {
    if (theAds.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      );
    } else {
      return (
        <View style={[theme.mt0, theme.wp100, {flexGrow: 1}]}>
          <ScrollView
            horizontal
            style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.mt10]}
            showsHorizontalScrollIndicator={false}>
            {theAds.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    i == 0 ? theme.ms20 : theme.ms0,
                    i == theAds.length - 1 ? theme.me20 : theme.me10,
                  ]}
                  key={i}
                  onPress={() => {
                    goToBanner(item.id);
                  }}>
                  <Image
                    source={{uri: item.image_url}}
                    style={[
                      theme.w300,
                      theme.h140,
                      theme.br15,
                      {objectFit: 'cover'},
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };
  const Content = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Youtube</Text>
          <TouchableOpacity
            onPress={() => {
              goToUrl(`https://www.youtube.com/${channelName}`);
            }}
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={[
            theme.wp100,
            {flexGrow: 1},
            theme.fRow,
            theme.px20,
            theme.mt10,
          ]}
          showsHorizontalScrollIndicator={false}>
          {yt.data.map((item, i) => {
            return (
              <TouchableOpacity
                style={[theme.me15, theme.w230,theme.bgyellow,
                  theme.brtl10,
                  theme.brtr10,
                  theme.brbl10,
                  theme.brbr10]}
                key={i}
                onPress={() => {
                  goToUrl(`${item.url}`);
                }}>
                <Image
                  source={{uri: item.image_url}}
                  style={[
                    theme.wp100,
                    theme.h130,
                    theme.brtl10,
                    theme.brtr10,
                    {objectFit: 'cover'},
                  ]}
                />
                <View style={[theme.py10,theme.px15]}>
                  <Text style={[theme['h12-500'], theme.cblack]}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const Instagram = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Instagram</Text>
          <TouchableOpacity
            onPress={() => {
              goToUrl(`https://www.instagram.com/${instagramUsername}`);
            }}
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={[
            theme.wp100,
            {flexGrow: 1},
            theme.fRow,
            theme.px20,
            theme.mt10,
          ]}
          showsHorizontalScrollIndicator={false}>
          {ig.data.map((item, i) => {
            return (
              <TouchableOpacity
                style={[theme.me15]}
                key={i}
                onPress={() => {
                  goToUrl(`${item.url}`);
                }}>
                <Image
                  source={{uri: item.image_url}}
                  style={[
                    theme.w90,
                    theme.h95,
                    theme.br5,
                    {objectFit: 'cover'},
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const Tiktok = () => {
    return (
      <View style={[theme.mt35,theme.mb110]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Tiktok</Text>
          <TouchableOpacity
            onPress={() => {
              goToUrl(`https://www.tiktok.com/${tiktokUsername}`);
            }}
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={[
            theme.wp100,
            {flexGrow: 1},
            theme.fRow,
            theme.px20,
            theme.mt10,
          ]}
          showsHorizontalScrollIndicator={false}>
          {tiktok.data.map((item, i) => {
            return (
              <TouchableOpacity
                style={[theme.me15]}
                key={i}
                onPress={() => {
                  goToUrl(`${item.url}`);
                }}>
                <Image
                  source={{uri:item.image_url}}
                  style={[
                    theme.w202,
                    theme.h264,
                    theme.br5,
                    {objectFit: 'cover'},
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={[
        theme.bgblack,
        {flexGrow: 1},
        radioState && radioState.status == 'playing' ? theme.pt100 : theme.pt60,
        theme.relative,
      ]}>
      <ScrollView style={[]} showsVerticalScrollIndicator={false}>
        {SlideBanner(bannerAdsItem)}
        <Content />
        <Instagram />
        <Tiktok />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArdanContent;
