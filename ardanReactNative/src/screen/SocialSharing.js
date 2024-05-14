import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import Icons from '../components/Icons';
import ActionSheet from 'react-native-actions-sheet';
const SocialSharing = ({navigation}) => {
  const acOpt = useRef(null);
  const acReport = useRef(null);
  const imageWidth = useWindowDimensions().width - 40;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
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
  const [selectedFeed, setSelectedFeed] = useState({
    user: {
      id: null,
    },
  });
  const reportReason = [
    'Tidak menyukai ini',
    'Postingan ini spam',
    'Konten pornografi',
    'Ujaran kebencian',
    'Miss informasi',
    'Perundungan dan kekerasan',
    'Scam dan Fraud',
    'Organisasi berbahaya',
    'Jual beli barang ilegal',
    'Membunuh dan melukai diri sendiri',
    'Obat obatan terlarang',
    'Lainnya',
  ];
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
        cta: 'SOCIALPOST',
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
  const getFeeds = async (cat = null, page = 1) => {
    try {
      let theData = feedsItem.data;
      let payload = {
        page: page,
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
          if (data.length > 0) {
            setPage(page);
          }
          if (page == 1) {
            theData = data;
          } else {
            theData = [...theData, ...data];
          }
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
          <View style={[theme.wp100]} key={i}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BannerDetails', {
                  id: item.id,
                });
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
              <Image
                source={Icons.flame}
                style={[
                  {height: 25, width: 25, objectFit: 'contain'},
                  theme.me10,
                ]}
              />
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
              <Image
                source={Icons.chevronRight}
                style={[{height: 20, width: 20, objectFit: 'contain'}]}
              />
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
                <View style={[theme.fRow, theme.wp60]}>
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
                    theme.wp40,
                  ]}>
                  <Text style={[theme['h12-500'], {color: '#000'}]}>
                    {hotSharing.data.category}
                  </Text>
                </View>
              </View>
              <RenderHtml
                contentWidth={imageWidth}
                source={{
                  html: `<div style="color:#fff;">${Helper.limitWords(
                    hotSharing.data.text,
                    200,
                  )}</div>`,
                }}
              />
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
                    <Image
                      source={Icons.share}
                      style={[{height: 16, width: 16, objectFit: 'contain'}]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[theme.fRow, theme.faCenter, theme.fjBetween]}>
                  <View style={[theme.fRow, theme.faCenter]}>
                    <Image
                      source={Icons.love}
                      style={[{height: 16, width: 16, objectFit: 'contain'}]}
                    />
                    <Text
                      style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                      {hotSharing.data.like_count}
                    </Text>
                  </View>
                  <View style={[theme.fRow, theme.faCenter, theme.ms25]}>
                    <Image
                      source={Icons.comment}
                      style={[{height: 16, width: 16, objectFit: 'contain'}]}
                    />
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
      url: 'https://ardanmobileapps.ardangroup.fm/sharing/' + id,
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
  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    if (isCloseToBottom) {
      let nextPage = page + 1;
      getFeeds(activeCat, nextPage);
    } else {
    }
  };
  const deletePost = async (id = -1, idx) => {
    try {
      let payload = {
        id: id,
      };
      let req = await Api.feedsDelete(payload, user.access_token);
      if (req.status == 200) {
        let {status} = req.data;
        if (status) {
          hideAcs();
          getFeeds();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const reportPost = async reason => {
    let id = selectedFeed.id;
    try {
      let payload = {
        id_feed: id,
        id_user: user.id,
        text: reason,
      };
      let req = await Api.feedsReport(payload, user.access_token);
      if (req.status == 200) {
        let {status} = req.data;
        if (status) {
          getFeeds();
        }
        hideAcr();
      }
    } catch (error) {
      hideAcr();
      console.error(error);
    }
  };
  const hideAcs = () => {
    acOpt.current?.hide();
  };
  const showAcs = item => {
    setSelectedFeed(item);
    acOpt.current?.show();
  };
  const hideAcr = () => {
    acReport.current?.hide();
  };
  const showAcr = item => {
    hideAcs();
    acReport.current?.show();
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
  const SlideBanner = theAds => {
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
  const AcsOpt = () => {
    return (
      <ActionSheet ref={acOpt}>
        <View style={[theme.px20, theme.py15, theme.bgblack]}>
          <TouchableOpacity
            onPress={() => {
              showAcr();
            }}>
            <View style={[theme.fRow, theme.faCenter, theme.py10]}>
              <Icon name="warning" size={11} color="#ff9999" />
              <Text style={[theme['p14-600'], {color: '#ff9999'}, theme.ms5]}>
                Report
              </Text>
            </View>
          </TouchableOpacity>
          {selectedFeed.user.id == user.id ? (
            <TouchableOpacity
              onPress={() => {
                deletePost(selectedFeed.id);
              }}>
              <View style={[theme.fRow, theme.faCenter, theme.py10]}>
                <Icon name="trash" size={14} color="#ff9999" />
                <Text style={[theme['p14-600'], {color: '#ff9999'}, theme.ms5]}>
                  Delete
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </ActionSheet>
    );
  };
  const AcsReport = () => {
    return (
      <ActionSheet ref={acReport}>
        <View style={[theme.px20, theme.py15, theme.bgblack]}>
          <Text style={[theme.tCenter, {color: '#fff'}, theme['p16-600']]}>
            Report Reason
          </Text>
          {reportReason.map((reason, idx) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  reportPost(reason);
                }}
                key={idx}>
                <View style={[theme.fRow, theme.faCenter, theme.py10]}>
                  <Text style={[theme['p14-400'], {color: '#fff'}, theme.ms5]}>
                    {reason}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ActionSheet>
    );
  };
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, theme.relative, theme.pb120]}>
      {bannerAdsItem.length > 0 ? SlideBanner(bannerAdsItem) : null}
      <AcsOpt />
      <AcsReport />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[theme.px20, theme.h100, theme.pt20]}>
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
      <ScrollView
        style={[theme.mb50, theme.px20]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}>
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
                  <View style={[theme.fRow, theme.fjBetween]}>
                    <Text style={[theme['h16-500'], {color: '#fff'}]}>
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        showAcs(item);
                      }}>
                      <Icon name="ellipsis-h" size={20} color="#bbb" />
                    </TouchableOpacity>
                  </View>
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
                    <Image
                      style={[
                        {
                          width: imageWidth,
                          height: imageWidth,
                          objectFit: 'cover',
                          backgroundColor: '#fafafa',
                        },
                      ]}
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
                      <Image
                        source={Icons.share}
                        style={[{height: 16, width: 16, objectFit: 'contain'}]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        doBookmark(item.id, 'Bookmark');
                      }}
                      style={[theme.fRow, theme.faCenter, theme.ms25]}>
                      <Image
                        source={Icons.bookmark}
                        style={[{height: 16, width: 16, objectFit: 'contain'}]}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[theme.fRow, theme.faCenter, theme.fjBetween]}>
                    <View style={[theme.fRow, theme.faCenter]}>
                      <Image
                        source={Icons.love}
                        style={[{height: 16, width: 16, objectFit: 'contain'}]}
                      />
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
                      <Image
                        source={Icons.comment}
                        style={[{height: 16, width: 16, objectFit: 'contain'}]}
                      />
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
