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
import SvgUri from 'react-native-svg-uri';
import Share from 'react-native-share';
// import SvgUri from '../components/Svg';
import Icons from '../components/Icons';
const SocialSharing = ({navigation}) => {
  const imageWidth = Dimensions.get('window').width - 40;
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
  const [bannerAdsItem, setBannerAdsItem] = useState({
    data: [],
    loading: false,
  });
  const [hotSharing, setHotSharing] = useState({
    data: {
      category: null,
      comment_count: null,
      created_at: null,
      deleted_at: null,
      id: null,
      id_user: null,
      image: null,
      image_url: null,
      like_count: null,
      status: null,
      text: null,
      title: null,
      type: null,
      updated_at: null,
      user: {
        address: null,
        created_at: null,
        deleted_at: null,
        dob: null,
        email: null,
        gender: null,
        id: null,
        image: null,
        image_url: null,
        name: null,
        phone: null,
        role: null,
        status: null,
        updated_at: null,
        username: null,
      },
    },
    loading: false,
  });
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
  const getHotSharing = async (cat = null) => {
    setHotSharing({
      data: {
        category: null,
        comment_count: null,
        created_at: null,
        deleted_at: null,
        id: null,
        id_user: null,
        image: null,
        image_url: null,
        like_count: null,
        status: null,
        text: null,
        title: null,
        type: null,
        updated_at: null,
        user: {
          address: null,
          created_at: null,
          deleted_at: null,
          dob: null,
          email: null,
          gender: null,
          id: null,
          image: null,
          image_url: null,
          name: null,
          phone: null,
          role: null,
          status: null,
          updated_at: null,
          username: null,
        },
      },
      loading: true,
    });
    try {
      let theData = {
        category: null,
        comment_count: null,
        created_at: null,
        deleted_at: null,
        id: null,
        id_user: null,
        image: null,
        image_url: null,
        like_count: null,
        status: null,
        text: null,
        title: null,
        type: null,
        updated_at: null,
        user: {
          address: null,
          created_at: null,
          deleted_at: null,
          dob: null,
          email: null,
          gender: null,
          id: null,
          image: null,
          image_url: null,
          name: null,
          phone: null,
          role: null,
          status: null,
          updated_at: null,
          username: null,
        },
      };
      let payload = {
        page: 1,
        perPage: 1,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
        type: 'SHARING',
        status: 'PUBLISHED',
        kind: 'HOT',
      };
      let req = await Api.feedsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data[0];
        }
      }
      setHotSharing({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setHotSharing({
        data: {
          category: null,
          comment_count: null,
          created_at: null,
          deleted_at: null,
          id: null,
          id_user: null,
          image: null,
          image_url: null,
          like_count: null,
          status: null,
          text: null,
          title: null,
          type: null,
          updated_at: null,
          user: {
            address: null,
            created_at: null,
            deleted_at: null,
            dob: null,
            email: null,
            gender: null,
            id: null,
            image: null,
            image_url: null,
            name: null,
            phone: null,
            role: null,
            status: null,
            updated_at: null,
            username: null,
          },
        },
        loading: false,
      });
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
        <View style={[theme.mb35]}>
          <View style={[theme.fRow, theme.fjBetween, theme.faCenter]}>
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
                theme.br40,
              ]}
              onPress={() => {
                navigation.navigate('Social');
              }}>
              <Image source={Icons.chevronRight} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SocialSharingDetails', {
                id: hotSharing.data.id,
              });
            }}
            style={[theme.relative]}>
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
                      theme.me5,
                    ]}>
                    <Image
                      source={Icons.user}
                      style={[{objectFit: 'contain', width: 20}]}
                    />
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
                  <Text style={[theme['h12-500'], {color: '#000'}]}>
                    {hotSharing.data.category}
                  </Text>
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
                style={[
                  theme.mt20,
                  theme.fRow,
                  theme.faCenter,
                  theme.fjBetween,
                ]}>
                <View style={[theme.fRow, theme.faCenter]}>
                  <TouchableOpacity
                    style={[theme.fRow, theme.faCenter]}
                    onPress={() => {
                      doShare(hotSharing.data.id);
                    }}>
                    <Image source={Icons.share} width={16} height={16} />
                  </TouchableOpacity>
                </View>
                <View style={[theme.fRow, theme.faCenter, theme.fjBetween]}>
                  <View style={[theme.fRow, theme.faCenter]}>
                    <Image source={Icons.love} width={16} height={16} />
                    <Text
                      style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                      {hotSharing.data.like_count}
                    </Text>
                  </View>
                  <View style={[theme.fRow, theme.faCenter, theme.ms25]}>
                    <Image source={Icons.comment} width={16} height={16} />
                    <Text
                      style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                      {hotSharing.data.comment_count}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const doShare = async id => {
    let opt = {
      title: 'Check my Sharing on Ardan Radio',
      message: 'Check my sharing on Ardan Radio',
      url: 'https://mobileapps.ardanradio.com/ardansocial/sharing/' + id,
    };
    let share = Share.open(opt);
  };
  const doBookmark = async (target, type) => {
    if (user.role != 'guest') {
      let payload = {
        id_user: user.id,
        id_target: target,
        type: type,
      };
      try {
        let req = await Api.likeCreate(payload, user.access_token);
        if (req.status == 200) {
          let {data, status, msg} = req.data;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getFeeds();
        getCategory();
        getBannerAds();
        getHotSharing();
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, theme.relative, theme.pb120]}>
      <Ads />
      {/* <View
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
      </View> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[theme.h100]}>
        <TouchableOpacity
          style={[theme.mb25]}
          onPress={() => {
            getFeeds();
          }}>
          <Text
            style={[
              theme['p12-500'],
              activeCat == 'All'
                ? {backgroundColor: '#F8C303', color: '#090903'}
                : {backgroundColor: '#12120B', color: '#FFF'},
              theme.mt5,
              theme.px15,
              theme.fRow,
              theme.faCenter,
              theme.fjCenter,
              theme.py7,
              theme.br42,
              theme.me10,
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
                  theme['p12-500'],
                  item.title == activeCat
                    ? {backgroundColor: '#F8C303', color: '#090903'}
                    : {backgroundColor: '#12120B', color: '#FFF'},
                  theme.mt5,
                  theme.px15,
                  theme.fRow,
                  theme.faCenter,
                  theme.fjCenter,
                  theme.py7,
                  theme.br42,
                  theme.me10,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView style={[theme.mb230]} showsVerticalScrollIndicator={false}>
        <HotSharing />
        {feedsItem.loading ? (
          <View style={[theme.py100]}>
            <ActivityIndicator size="large" color="#F8C303" />
          </View>
        ) : (
          feedsItem.data.map((item, i) => {
            return (
              <View
                key={i}
                style={[
                  theme.mb20,
                  theme.pb20,
                  theme.bbw2,
                  theme.bsolid,
                  {borderBottomColor: '#1D1E21'},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SocialSharingDetails', {id: item.id});
                  }}>
                  <Text style={[theme['h16-500'], {color: '#fff'}]}>
                    {item.title}
                  </Text>
                  <View
                    style={[
                      theme.fRow,
                      theme.mb10,
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
                          theme.me5,
                        ]}>
                        <Image
                          source={
                            item.user.image_url
                              ? {uri: item.user.image_url}
                              : {
                                  uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                                }
                          }
                          style={[theme.w35, theme.h35, theme.br5]}
                        />
                      </View>
                      <View>
                        <Text style={[theme['h12-500'], {color: '#fff'}]}>
                          {item.user.name}
                        </Text>
                        <Text
                          style={[
                            theme['h12-400'],
                            {color: '#8D8080', marginTop: -5},
                          ]}>
                          {Helper.dateIndo(item.created_at)}
                        </Text>
                      </View>
                    </View>
                    {item.category ? (
                      <View
                        style={[
                          {backgroundColor: '#F8C303'},
                          theme.h35,
                          theme.br5,
                          theme.faCenter,
                          theme.fjCenter,
                          theme.px15,
                        ]}>
                        <Text style={[theme['h12-500'], {color: '#000'}]}>
                          {item.category}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  {item.image_url ? (
                    <AutoHeightImage
                      width={imageWidth}
                      source={{uri: item.image_url}}
                    />
                  ) : null}
                </TouchableOpacity>
                <View
                  style={[
                    theme.mt20,
                    theme.fRow,
                    theme.faCenter,
                    theme.fjBetween,
                  ]}>
                  <View style={[theme.fRow, theme.faCenter, theme.fjBetween]}>
                    <TouchableOpacity
                      style={[theme.fRow, theme.faCenter]}
                      onPress={() => {
                        doShare(item.id);
                      }}>
                      <Image source={Icons.share} width={16} height={16} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        doBookmark(item.id, 'Bookmark');
                      }}
                      style={[theme.fRow, theme.faCenter, theme.ms25]}>
                      <Image source={Icons.bookmark} width={16} height={16} />
                    </TouchableOpacity>
                  </View>
                  <View style={[theme.fRow, theme.faCenter, theme.fjBetween]}>
                    <View style={[theme.fRow, theme.faCenter]}>
                      <Image source={Icons.love} width={16} height={16} />
                      <Text
                        style={[
                          theme.ms5,
                          theme['h12-500'],
                          {color: '#AEB5C0'},
                        ]}>
                        {item.like_count}
                      </Text>
                    </View>
                    <View style={[theme.fRow, theme.faCenter, theme.ms25]}>
                      <Image source={Icons.comment} width={16} height={16} />
                      <Text
                        style={[
                          theme.ms5,
                          theme['h12-500'],
                          {color: '#AEB5C0'},
                        ]}>
                        {item.comment_count}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SocialSharing;
