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
// import SvgUri from '../components/Svg';
import Icons from '../components/Icons';
import RenderHtml from 'react-native-render-html';
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
  const [hotSharing, setHotSharing] = useState({
    data: {
      "category": null,
      "comment_count": null,
      "created_at": null,
      "deleted_at": null,
      "id": null,
      "id_user": null,
      "image": null,
      "image_url": null,
      "like_count": null,
      "status": null,
      "text": null,
      "title": null,
      "type": null,
      "updated_at": null,
      "user": {
        "address": null,
        "created_at": null,
        "deleted_at": null,
        "dob": null,
        "email": null,
        "gender": null,
        "id": null,
        "image": null,
        "image_url": null,
        "name": null,
        "phone": null,
        "role": null,
        "status": null,
        "updated_at": null,
        "username": null
      }
    },
    loading: false,
  });
  const [categoryNews, setCategoryNews] = useState({
    data: [],
    loading: false,
  });
  const [activeCatNews, setActiveCatNews] = useState('All');
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
      console.error('Home Banner',error);
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
      console.error('Home Banner Ads',error);
      setBannerAdsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getHotSharing = async (cat = null) => {
    setHotSharing({
      data: {
        "category": null,
        "comment_count": null,
        "created_at": null,
        "deleted_at": null,
        "id": null,
        "id_user": null,
        "image": null,
        "image_url": null,
        "like_count": null,
        "status": null,
        "text": null,
        "title": null,
        "type": null,
        "updated_at": null,
        "user": {
          "address": null,
          "created_at": null,
          "deleted_at": null,
          "dob": null,
          "email": null,
          "gender": null,
          "id": null,
          "image": null,
          "image_url": null,
          "name": null,
          "phone": null,
          "role": null,
          "status": null,
          "updated_at": null,
          "username": null
        }
      },
      loading: true,
    });
    try {
      let theData = {
        "category": null,
        "comment_count": null,
        "created_at": null,
        "deleted_at": null,
        "id": null,
        "id_user": null,
        "image": null,
        "image_url": null,
        "like_count": null,
        "status": null,
        "text": null,
        "title": null,
        "type": null,
        "updated_at": null,
        "user": {
          "address": null,
          "created_at": null,
          "deleted_at": null,
          "dob": null,
          "email": null,
          "gender": null,
          "id": null,
          "image": null,
          "image_url": null,
          "name": null,
          "phone": null,
          "role": null,
          "status": null,
          "updated_at": null,
          "username": null
        }
      }
      let payload = {
        page: 1,
        perPage: 1,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
        type: 'SHARING',
        status: 'PUBLISHED',
        kind: 'HOT'
      };
      let req = await Api.feedsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data[0];
          console.log(theData);
        }
      }
      setHotSharing({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error('Home Hot Sharing',error);
      setHotSharing({
        data: {
          "category": null,
          "comment_count": null,
          "created_at": null,
          "deleted_at": null,
          "id": null,
          "id_user": null,
          "image": null,
          "image_url": null,
          "like_count": null,
          "status": null,
          "text": null,
          "title": null,
          "type": null,
          "updated_at": null,
          "user": {
            "address": null,
            "created_at": null,
            "deleted_at": null,
            "dob": null,
            "email": null,
            "gender": null,
            "id": null,
            "image": null,
            "image_url": null,
            "name": null,
            "phone": null,
            "role": null,
            "status": null,
            "updated_at": null,
            "username": null
          }
        },
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
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
      };
      if (cat) {
        payload.category = cat;
        setActiveCatNews(cat);
      } else {
        setActiveCatNews('All');
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
      console.error('Home News',error);
      setNewsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getCategoryNews = async () => {
    setCategoryNews({
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
      setCategoryNews({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error('Home Category News',error);
      setCategoryNews({
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
      console.error('Home Events',error);
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
      console.error('Home Programs',error);
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
    getBanner();
    getNews();
    getCategoryNews();
    getEvents();
    getPrograms();
    getBannerAds();
    getYoutube();
    getHotSharing()
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
        <View style={[theme.mt70, theme.wp100, {flexGrow: 1}]}>
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
              theme.px10,
              theme.br40,
            ]}
            onPress={() => {
              navigation.navigate('News');
            }}>
            <Image source={Icons.chevronRight} />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[theme.px20]}>
          <TouchableOpacity
            style={[theme.me15, theme.faCenter]}
            onPress={() => {
              getNews();
            }}>
            <Text
              style={[
                theme['p12-500'],
                activeCatNews == 'All' ? {backgroundColor:'#F8C303',color: '#090903'} : {backgroundColor:'#12120B',color: '#FFF'},
                theme.mt5,
                theme.px15,
                theme.fRow,
                theme.faCenter,
                theme.fjCenter,
                theme.py7,
                theme.br42
              ]}>
              All Post
            </Text>
          </TouchableOpacity>
          {categoryNews.data.map((item, i) => {
            return (
              <TouchableOpacity
                style={[theme.me15, theme.faCenter]}
                key={i}
                onPress={() => {
                  getNews(item.title);
                }}>
                <Text
                  style={[
                    theme['p12-500'],
                    activeCatNews == item.title ? {backgroundColor:'#F8C303',color: '#090903'} : {backgroundColor:'#12120B',color: '#FFF'},
                    theme.mt5,
                    theme.px15,
                    theme.fRow,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.py7,
                    theme.br42
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {
          (newsItem.loading) ? (
              <View style={[theme.py50]}>
                <ActivityIndicator size="large" color="#F8C303" />
              </View>
            ) :
            (
                <ScrollView
                  horizontal
                  style={[
                    theme.wp100,
                    {flexGrow: 1},
                    theme.fRow,
                    theme.px20,
                    theme.mt20,
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
            )
        }
      </View>
    )
  };
  const Content = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h16-600'], theme.cwhite]}>
            Content
            <Text style={[theme['h16-400'], theme.cwhite]}> Terbaru</Text>
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
            <Image source={Icons.chevronRight} />
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
              <Text style={[theme['h16-400'], theme.cwhite]}> Popular</Text>
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
              <Image source={Icons.chevronRight} />
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
            <Image source={Icons.chevronRight} />
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
    if (hotSharing.loading) {
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
              <Image source={Icons.flame} height={25} style={[theme.me10]} />
              <Text style={[theme['h16-600'], theme.cwhite]}>
                Hot 
                <Text style={[theme['h16-400'], theme.cwhite]}> Sharing</Text>
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
                navigation.navigate('Social',{activeTab:'Sharing'});
              }}>
              <Image source={Icons.chevronRight} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
                  navigation.navigate('SocialSharingDetails', {id: hotSharing.data.id});
                }} style={[theme.px20, theme.relative]}>
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
                {hotSharing.data.title}
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
                    <Image source={Icons.user} style={[{objectFit:'contain',width:20}]}/>
                  </View>
                  <View>
                    <Text style={[theme['h12-500'], {color: '#fff'}]}>
                    {hotSharing.data.user.name}
                    </Text>
                    <Text
                      style={[
                        theme['h12-400'],
                        {color: '#8D8080', marginTop: -5},
                      ]}>
                      {Helper.dateIndo(hotSharing.data.created_at)}
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
                  <Text style={[theme['h12-500'], {color: '#000'}]}>{hotSharing.data.category}</Text>
                </View>
              </View>
              <RenderHtml
                source={{
                  html: `<div style="color:#fff;">${hotSharing.data.text}</div>`,
                }}
              />
              {/* <Text style={[theme['h12-500'], {color: '#fff'}, theme.mt15]}>
                {hotSharing.data.text}
              </Text> */}
              <View
                style={[theme.mt20, theme.fRow, theme.faCenter, theme.fjEnd]}>
                <View style={[theme.fRow, theme.faCenter]}>
                  <Image source={Icons.love} width={16} height={16}  />
                  <Text
                    style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                    {hotSharing.data.like_count}
                  </Text>
                </View>
                <View style={[theme.fRow, theme.faCenter, theme.ms25]}>
                  <Image source={Icons.comment} width={16} height={16}  />
                  <Text
                    style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                    {hotSharing.data.comment_count}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
