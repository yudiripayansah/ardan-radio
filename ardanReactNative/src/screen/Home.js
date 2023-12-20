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
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import SvgUri from 'react-native-svg-uri';
import Icons from '../components/Icons';
const Home = ({navigation}) => {
  let apiKey = 'AIzaSyBOr3JxvvNcGariUrqnvsjUktQKxYGGWiI',
    channelId = 'UCogKRAj4-WLY1INM7vESjhw',
    channelName = '@ardanradio1059FM',
    tiktokUsername = '@ardanradiobdg',
    instagramUsername = 'ardanradio';
  const [youtube, setYoutube] = useState([]);
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const [bannerItem, setBannerItem] = useState({
    data: [],
    loading: false,
  });
  const [bannerAdsItem, setBannerAdsItem] = useState({
    data: [],
    loading: false,
  });
  const [newsItem, setNewsItem] = useState({
    data: [],
    loading: false,
  });
  const [eventsItem, setEventsItem] = useState({
    data: [],
    loading: false,
  });
  const [programsItem, setProgramsItem] = useState({
    data: [],
    loading: false,
  });
  const getBanner = async () => {
    setBannerItem({
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
        cta: 'MAIN BANNER',
      };
      let req = await Api.bannerRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setBannerItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setBannerItem({
        data: [],
        loading: false,
      });
    }
  };
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
        cta: 'HOMEPAGE',
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
      console.error(error);
      setBannerAdsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getNews = async () => {
    setNewsItem({
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
      };
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
  const getEvents = async () => {
    setEventsItem({
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
      };
      let req = await Api.eventsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setEventsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setEventsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getPrograms = async () => {
    setProgramsItem({
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
      };
      let req = await Api.programsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setProgramsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setProgramsItem({
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
        console.log(data.items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const doLogout = () => {
    removeUser();
  };
  const menuItem = [
    {
      title: 'Ardan Content',
      image: require('../assets/images/icons/menu-content.png'),
      target: () => {
        navigation.navigate('ArdanContent');
      },
    },
    {
      title: 'Social',
      image: require('../assets/images/icons/menu-social.png'),
      target: () => {
        navigation.navigate('Social');
      },
    },
    {
      title: 'News',
      image: require('../assets/images/icons/menu-news.png'),
      target: () => {
        navigation.navigate('News');
      },
    },
    {
      title: 'Event',
      image: require('../assets/images/icons/menu-event.png'),
      target: () => {
        navigation.navigate('Event');
      },
    },
  ];
  const goToBanner = id => {
    navigation.navigate('BannerDetails', {
      id: id,
    });
  };
  const goToNews = id => {
    navigation.navigate('NewsDetails', {
      id: id,
    });
  };
  const goToEvents = id => {
    navigation.navigate('EventsDetails', {
      id: id,
    });
  };
  const goToProgram = id => {
    navigation.navigate('ProgramDetails', {
      id: id,
    });
  };
  const goToUrl = async url => {
    await Linking.openURL(url);
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getBanner();
        getNews();
        getEvents();
        getPrograms();
        getBannerAds();
        getYoutube();
      }
    });
    return () => (mounted = false);
  }, []);
  const MainBanner = () => {
    if (bannerItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      );
    } else {
      return (
        <View style={[theme.mt20, theme.wp100, {flexGrow: 1}]}>
          <ScrollView
            horizontal
            style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.mt10]}
            showsHorizontalScrollIndicator={false}>
            {bannerItem.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    i == 0 ? theme.ms20 : theme.ms0,
                    i == bannerItem.length - 1 ? theme.me20 : theme.me10,
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
  const HomeMenu = () => {
    return (
      <View style={[theme.fRow, theme.fjCenter, theme.mt40]}>
        {menuItem.map((item, i) => {
          return (
            <TouchableOpacity
              style={[theme.fjCenter, theme.faCenter]}
              onPress={item.target}
              key={i}>
              <View
                style={[
                  theme.w50,
                  theme.h50,
                  theme.faCenter,
                  theme.fjCenter,
                  theme.bgyellow,
                  theme.mx15,
                  theme.br100,
                ]}>
                <Image source={item.image} />
              </View>
              <Text style={[theme['h10-500'], theme.cblack_green, theme.mt5]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const News = () => {
    if (newsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      );
    } else {
      return (
        <View style={[theme.mt35]}>
          <View
            style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
            <Text style={[theme['h16-600'], theme.cwhite]}>
              Ardan <Text style={[theme['h16-400'], theme.cwhite]}>News</Text>
            </Text>
            <TouchableOpacity
              style={[
                theme.bgblack_chocolate,
                theme.fjCenter,
                theme.py5,
                theme.px10,
                theme.br40,
              ]}
              onPress={() => {
                navigation.navigate('News');
              }}>
              <SvgUri source={Icons.chevronRight} />
            </TouchableOpacity>
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
            {newsItem.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    theme.me15,
                    theme.w230,
                    theme.br24,
                    {backgroundColor: '#F8C303'},
                  ]}
                  key={i}
                  onPress={() => {
                    goToNews(item.id);
                  }}>
                  <Image
                    source={{uri: item.image_url}}
                    style={[
                      theme.wp100,
                      theme.h170,
                      theme.brtl24,
                      theme.brtr24,
                      {objectFit: 'cover'},
                    ]}
                  />
                  <View style={[theme.p10]}>
                    <Text style={[theme['h10-400'], {color: '#000'}]}>
                      {Helper.dateIndo(item.created_at)}
                    </Text>
                    <Text style={[theme['h16-500'], {color: '#000'}]}>
                      {item.title}
                    </Text>
                  </View>
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
          <Text style={[theme['h16-600'], theme.cwhite]}>
            Content
            <Text style={[theme['h16-400'], theme.cwhite]}>Terbaru</Text>
          </Text>
          <TouchableOpacity
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}
            onPress={() => {
              navigation.navigate('ArdanContent');
            }}>
            <SvgUri source={Icons.chevronRight} />
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
          {youtube.map((item, i) => {
            return (
              <TouchableOpacity
                style={[
                  theme.me15,
                  theme.w230,
                  {backgroundColor: '#252D3A'},
                  theme.br24,
                ]}
                key={i}
                onPress={() => {
                  goToUrl(`https://www.youtube.com/watch?v=${item.id.videoId}`);
                }}>
                <Image
                  source={{uri: item.snippet.thumbnails.medium.url}}
                  style={[
                    theme.wp100,
                    theme.h170,
                    theme.brtl24,
                    theme.brtr24,
                    {objectFit: 'cover'},
                  ]}
                />
                <View style={[theme.p10]}>
                  <Text style={[theme['h10-400'], {color: '#fff'}]}>
                    {Helper.dateIndo(item.snippet.publishedAt)}
                  </Text>
                  <Text style={[theme['h16-500'], {color: '#fff'}, theme.h45]}>
                    {item.snippet.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const ProgramPopuler = () => {
    if (programsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      );
    } else {
      return (
        <View style={[theme.mt35]}>
          <View
            style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
            <Text style={[theme['h16-600'], theme.cwhite]}>
              Program{' '}
              <Text style={[theme['h16-400'], theme.cwhite]}>Popular</Text>
            </Text>
            <TouchableOpacity
              style={[
                theme.bgblack_chocolate,
                theme.fjCenter,
                theme.py5,
                theme.px10,
                theme.br40,
              ]}
              onPress={() => {
                navigation.navigate('Program');
              }}>
              <SvgUri source={Icons.chevronRight} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.mt10]}
            showsHorizontalScrollIndicator={false}>
            {programsItem.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    i == 0 ? theme.ms20 : theme.ms0,
                    i == bannerItem.length ? theme.me20 : theme.me15,
                  ]}
                  key={i}
                  onPress={() => {
                    goToProgram(item.id);
                  }}>
                  <Image
                    source={{uri: item.image_url}}
                    style={[
                      theme.w140,
                      theme.h140,
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
    }
  };
  const Event = () => {
    if (eventsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      );
    } else {
      return (
        <View style={[theme.mt25]}>
          <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h16-600'], theme.cwhite]}>
            Upcoming
            <Text style={[theme['h16-400'], theme.cwhite]}>Event</Text>
          </Text>
          <TouchableOpacity
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}
            onPress={() => {
              navigation.navigate('Event');
            }}>
            <SvgUri source={Icons.chevronRight} />
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
            {eventsItem.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[theme.me15]}
                  key={i}
                  onPress={() => {
                    goToEvents(item.id);
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
    }
  };
  const Ads = () => {
    if (bannerAdsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      );
    } else {
      return bannerAdsItem.data.map((item, i) => {
        return (
          <View style={[theme.mt35, theme.px10, theme.wp100]} key={i}>
            <TouchableOpacity
              onPress={() => {
                goToBanner(item.id);
              }}>
              <Image
                source={{uri: item.image_url}}
                style={[theme.wp100, theme.h150, {objectFit: 'contain'}]}
              />
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  const HotSharing = () => {
    if (programsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      );
    } else {
      return (
        <View style={[theme.mt35]}>
          <View
            style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
            <View style={[theme.fRow, theme.faCenter]}>
              <SvgUri source={Icons.flame} height={25} style={[theme.me10]} />
              <Text style={[theme['h16-600'], theme.cwhite]}>
                Hot{' '}
                <Text style={[theme['h16-400'], theme.cwhite]}>Sharing</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={[
                theme.bgblack_chocolate,
                theme.fjCenter,
                theme.py5,
                theme.px10,
                theme.br40,
              ]}
              onPress={() => {
                navigation.navigate('Program');
              }}>
              <SvgUri source={Icons.chevronRight} />
            </TouchableOpacity>
          </View>
          <View style={[theme.px20, theme.relative]}>
            <View
              style={[
                theme.absolute,
                theme.wp100,
                theme.hp90,
                theme.br15,
                {
                  left: 30,
                  right: 0,
                  bottom: -10,
                  backgroundColor: 'rgba(2,2,2,.45)',
                },
              ]}></View>
            <View
              style={[
                {backgroundColor: '#252D3A'},
                theme.py15,
                theme.px20,
                theme.br15,
                theme.mt20,
                theme.relative,
              ]}>
              <Text style={[theme['h18-600'], {color: '#fff'}]}>
                Cari Jodoh Bareng Ardan FM
              </Text>
              <View
                style={[
                  theme.mt10,
                  theme.fRow,
                  theme.faCenter,
                  theme.fjBetween,
                ]}>
                <View style={[theme.fRow]}>
                  <View
                    style={[
                      theme.faCenter,
                      theme.fjCenter,
                      theme.w35,
                      theme.h35,
                      {backgroundColor: '#fff'},
                      theme.br5,
                      theme.me17,
                    ]}>
                    <SvgUri width={20} height={20} source={Icons.user} />
                  </View>
                  <View>
                    <Text style={[theme['h12-500'], {color: '#fff'}]}>
                      Wildan J Saputra
                    </Text>
                    <Text
                      style={[
                        theme['h12-400'],
                        {color: '#8D8080', marginTop: -5},
                      ]}>
                      6H ago
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    {backgroundColor: '#F8C303'},
                    theme.h35,
                    theme.br5,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.px15,
                  ]}>
                  <Text style={[theme['h12-500'], {color: '#000'}]}>Cinta</Text>
                </View>
              </View>
              <Text style={[theme['h12-500'], {color: '#fff'}, theme.mt15]}>
                Jadi sebenarnya, jodoh itu ditangan Tuhan atau ditangan Orang
                Tua?
              </Text>
              <View
                style={[theme.mt20, theme.fRow, theme.faCenter, theme.fjEnd]}>
                <View style={[theme.fRow, theme.faCenter]}>
                  <SvgUri width={16} height={16} source={Icons.love} />
                  <Text
                    style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                    2.304
                  </Text>
                </View>
                <View style={[theme.fRow, theme.faCenter, theme.ms25]}>
                  <SvgUri width={16} height={16} source={Icons.comment} />
                  <Text
                    style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                    15K
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={[theme.bgblack, {flexGrow: 1}, theme.pt200]}>
      <ScrollView style={[]}>
        <MainBanner />
        <ProgramPopuler />
        <HotSharing />
        <News />
        <Ads />
        <Content />
        <Event />
        <View style={[theme.h180]}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
