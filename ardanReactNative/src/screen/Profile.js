import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioContext} from '../context/RadioContext';
import {AuthContext} from '../context/AuthContext';
import Icons from '../components/Icons';
import Share from 'react-native-share';
import ActionSheet from 'react-native-actions-sheet';
import AutoHeightImage from 'react-native-auto-height-image';
import analytics from '@react-native-firebase/analytics';
const Profile = ({route, navigation}) => {
  const acOpt = useRef(null);
  const acReport = useRef(null);
  const acProfile = useRef(null);
  const {removeUser} = useContext(AuthContext);
  const radioState = useContext(RadioContext).state;
  const imageWidth = useWindowDimensions().width - 20;
  const profileImageWidth = useWindowDimensions().width - 40;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [active, setActive] = useState('POST');
  const [dUser, setDUser] = useState({});
  const [showC, setShowC] = useState(true);
  const [ziChat, setZiChat] = useState(1);
  const [comment, setComment] = useState();
  const [target, setTarget] = useState();
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(-1);
  const [feedsItem, setFeedsItem] = useState({
    data: [],
    loading: false,
  });
  const [comments, setComments] = useState({
    data: [],
    loading: false,
  });
  const [follow, setFollow] = useState(false);
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
  const getFeeds = async (type = 'POST') => {
    setFeedsItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let id = user.id;
      if (route.params) {
        id = route.params.id;
      }
      let payload = {
        page: 1,
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
        id_user: id,
        type: type,
      };
      let req = await Api.feedsRead(payload, user.token);
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
  const getUser = async () => {
    let id = user.id;
    if (route.params) {
      id = route.params.id;
    }
    try {
      let theData = {};
      let payload = {
        id: id,
      };
      let req = await Api.userGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setDUser(theData);
      getLike(theData.id, 'FOLLOW');
    } catch (error) {
      console.error(error);
      setDUser({});
    }
  };
  const doFollow = async (t, tt, i) => {
    let payload = {
      id_user: user.id,
      id_target: t,
      type: tt,
    };
    setLoading(true);
    try {
      let req = await Api.likeCreate(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          getUser();
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const getLike = async (id, type, idx = null) => {
    let payload = {
      id_target: id,
      type: type,
      id_user: user.id,
    };
    try {
      let req = await Api.likeGet(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status && data) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sentLike = async (t, tt, i) => {
    if (user.role != 'guest') {
      let payload = {
        id_user: user.id,
        id_target: t,
        type: tt,
      };
      setLoading(true);
      try {
        let req = await Api.likeCreate(payload, user.access_token);
        if (req.status == 200) {
          let {data, status, msg} = req.data;
          if (status) {
            updateLike(t, tt, i);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };
  const doShare = async id => {
    let opt = {
      title: 'Check my Post on Ardan Radio',
      message: 'Check my Post on Ardan Radio',
      url: 'https://ardanmobileapps.ardangroup.fm/post/' + id,
    };
    let share = Share.open(opt);
  };
  const updateLike = async (t, tt, i) => {
    let payload = {
      id_target: t,
      type: tt,
    };
    setLoading(true);
    try {
      let req = await Api.likeGet(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        let fi = {...feedsItem};
        if (status) {
          fi.data[i].like_count = data.like_count;
        } else {
          fi.data[i].like_count = 0;
        }
        setFeedsItem(fi);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const showChat = (t = 0) => {
    setTarget(t);
    let anim = {
      fade: 0,
      slide: '-110',
    };
    if (showC) {
      anim.fade = 1;
      anim.slide = 0;
      setZiChat(2);
      getComments(t);
    } else {
      setZiChat(1);
    }
    setShowC(!showC);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: anim.fade,
        duration: 500, // adjust the duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: anim.slide,
        duration: 500, // adjust the duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  };
  const getComments = async (t = 0) => {
    setComments({
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
        id_target: t,
        target_type: 'POST',
        status: 'PUBLISHED',
      };
      let req = await Api.commentRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setComments({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setComments({
        data: [],
        loading: false,
      });
    }
  };
  const sentComment = async () => {
    let payload = {
      id_user: user.id,
      id_target: target,
      target_type: 'POST',
      name: user.name,
      comment: comment,
      status: 'PUBLISHED',
    };
    setLoading(true);
    try {
      let req = await Api.commentCreate(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          getComments(target);
          setComment('');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    Keyboard.dismiss();
    setComment('');
  };
  const doLogout = () => {
    removeUser();
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
  const hideAcp = () => {
    acProfile.current?.hide();
  };
  const showAcp = item => {
    acProfile.current?.show();
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
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Profile',
      screen_class: 'Profile',
    });
  }
  useEffect(() => {
    gAnalytics()
    getFeeds();
    getUser();
  }, []);
  const SocialPost = () => {
    return feedsItem.loading ? (
      <View style={[theme.py100]}>
        <ActivityIndicator size="large" color="#F8C303" />
      </View>
    ) : (
      feedsItem.data.map((item, i) => {
        return (
          <View style={[theme.my20]} key={i}>
            <View style={[theme.fRow, theme.relative, theme.fjBetween]}>
              <View style={[theme.fRow]}>
                <Image
                  source={
                    item.user.image_url
                      ? {uri: item.user.image_url}
                      : {
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                        }
                  }
                  style={[theme.h40, theme.w40, theme.br12, theme.me15]}
                />
                <View>
                  <Text style={[theme['p16-700'], theme.cwhite]}>
                    {item.user.name}
                  </Text>
                  <View style={[theme.fRow, theme.faCenter]}>
                    <Image
                      source={require('../assets/images/icons/discovery.png')}
                      style={[theme.h15, theme.w15, theme.me5]}
                    />
                    <Text style={[theme['p12-400'], {color: 'grey'}]}>
                      {Helper.dateIndo(item.created_at)}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  showAcs(item);
                }}>
                <Icon name="ellipsis-h" size={20} color="#bbb" />
              </TouchableOpacity>
            </View>
            <View style={[theme.mt10, theme.mb10]}>
              <RenderHtml
                contentWidth={imageWidth}
                source={{
                  html: `<div style="color:#fff;">${item.text}</div>`,
                }}
              />
            </View>
            {item.image_url && (
              <Image
                style={[
                  {
                    width: '100%',
                    height: imageWidth,
                    objectFit: 'cover',
                    backgroundColor: '#fafafa',
                  },
                ]}
                source={{uri: item.image_url}}
              />
            )}
            <View
              style={[theme.fRow, theme.faCenter, theme.fjBetween, theme.mt10]}>
              <View style={[theme.fRow, theme.faCenter]}>
                <TouchableOpacity
                  onPress={() => {
                    sentLike(item.id, 'POST', i);
                  }}
                  style={[theme.fRow, theme.faCenter, theme.me15]}>
                  <Icon name="heart" size={20} color="#F8C303" />
                  <Text style={[theme['p12-400'], theme.cwhite, theme.ms5]}>
                    {item.like_count}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[theme.fRow, theme.faCenter]}
                  onPress={() => {
                    showChat(item.id);
                  }}>
                  <Icon name="comment" size={20} color="#F8C303" />
                  <Text style={[theme['p12-400'], theme.cwhite, theme.ms5]}>
                    {item.comment_count}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[theme.fRow, theme.faCenter]}
                onPress={() => {
                  doShare(item.id);
                }}>
                <Image
                  source={Icons.share}
                  style={[{width: 20, height: 20, objectFit: 'contain'}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })
    );
  };
  const SocialSharing = () => {
    return feedsItem.loading ? (
      <View style={[theme.py100]}>
        <ActivityIndicator size="large" color="#F8C303" />
      </View>
    ) : (
      feedsItem.data.map((item, i) => {
        return (
          <View
            key={i}
            style={[
              theme.mt20,
              theme.pb20,
              theme.bbw2,
              theme.bsolid,
              {borderBottomColor: '#1D1E21'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SocialSharingDetails', {id: item.id});
              }}>
              <View
                style={[
                  theme.fRow,
                  theme.fjBetween,
                  theme.relative,
                  {flexWrap: 'nowrap'},
                ]}>
                <Text style={[theme['h16-500'], {color: '#fff'}, theme.wp80]}>
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
                  theme.mt20,
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
                      width: '100%',
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
              style={[theme.mt20, theme.fRow, theme.faCenter, theme.fjBetween]}>
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
                    style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                    {item.like_count}
                  </Text>
                </View>
                <View style={[theme.fRow, theme.faCenter, theme.ms25]}>
                  <Image
                    source={Icons.comment}
                    style={[{height: 16, width: 16, objectFit: 'contain'}]}
                  />
                  <Text
                    style={[theme.ms5, theme['h12-500'], {color: '#AEB5C0'}]}>
                    {item.comment_count}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })
    );
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
  const AcsProfile = () => {
    return (
      <ActionSheet ref={acProfile} isModal={true}>
        <View style={[theme.px20, theme.py15, theme.bgblack]}>
          <AutoHeightImage
            contentWidth={profileImageWidth}
            width={profileImageWidth}
            source={
              dUser.image
                ? {uri: dUser.image_url}
                : {
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                  }
            }
          />
        </View>
      </ActionSheet>
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        style={[
          theme.bgblack,
          theme.relative,
          {flexGrow: 1, zIndex: 2},
          radioState && radioState.status == 'playing'
            ? theme.pt130
            : theme.pt60,
        ]}>
        <ScrollView style={[]}>
          <AcsOpt />
          <AcsReport />
          <AcsProfile />
          <View style={[theme.px20, theme.pt10, theme.mb100]}>
            <View style={[theme.fRow]}>
              <TouchableOpacity
                onPress={() => {
                  showAcp();
                }}>
                <Image
                  source={
                    dUser.image
                      ? {uri: dUser.image_url}
                      : {
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                        }
                  }
                  style={[
                    theme.w80,
                    theme.h80,
                    theme.br10,
                    {objectFit: 'cover'},
                  ]}
                />
              </TouchableOpacity>
              <View style={[theme.ms10]}>
                <Text style={[theme.cwhite, theme['h16-700']]}>
                  {dUser.name}
                </Text>
                {dUser.address ? (
                  <Text style={[theme.cpale_white, theme['h12-400']]}>
                    {dUser.address}
                  </Text>
                ) : null}
                <Text style={[theme.cpale_white, theme['h12-400']]}>
                  {dUser.email}
                </Text>
                {dUser.id == user.id && (
                  <TouchableOpacity
                    onPress={() => {
                      doLogout();
                    }}>
                    <Text style={[theme.cyellow, theme['p12-600']]}>
                      Sign Out
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={[theme.fRow, theme.py30]}>
              <View style={[theme.wp33, theme.faCenter, theme.fjCenter]}>
                <Text style={[theme.cwhite, theme['h18-600']]}>
                  {dUser.post_count}
                </Text>
                <Text style={[theme.cpale_white, theme['h14-500']]}>Post</Text>
              </View>
              <View style={[theme.wp33, theme.faCenter, theme.fjCenter]}>
                <TouchableOpacity
                  style={[theme.faCenter, theme.fjCenter]}
                  onPress={() => {
                    navigation.push('Followers', {
                      id: dUser.id,
                      type: 'followers',
                    });
                  }}>
                  <Text style={[theme.cwhite, theme['h18-600']]}>
                    {dUser.followers_count}
                  </Text>
                  <Text style={[theme.cpale_white, theme['h14-500']]}>
                    Followers
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[theme.wp33, theme.faCenter, theme.fjCenter]}>
                <TouchableOpacity
                  style={[theme.faCenter, theme.fjCenter]}
                  onPress={() => {
                    navigation.push('Following', {
                      id: dUser.id,
                      type: 'following',
                    });
                  }}>
                  <Text style={[theme.cwhite, theme['h18-600']]}>
                    {dUser.following_count}
                  </Text>
                  <Text style={[theme.cpale_white, theme['h14-500']]}>
                    Following
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[theme.faCenter, theme.wp100, theme.fRow, theme.fjCenter]}>
              {user.id != dUser.id ? (
                <TouchableOpacity
                  style={[
                    theme.bw2,
                    theme.bsolid,
                    theme.byellow,
                    theme.w100,
                    theme.h40,
                    theme.mx20,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.br100,
                  ]}
                  onPress={() => {
                    doFollow(dUser.id, 'FOLLOW');
                  }}>
                  <Text style={[theme.cwhite, theme['h16-600']]}>
                    {follow ? 'Unfollow' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    theme.bw2,
                    theme.bsolid,
                    theme.byellow,
                    theme.w100,
                    theme.h40,
                    theme.mx20,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.br100,
                  ]}
                  onPress={() => {
                    navigation.push('ProfileUpdate');
                  }}>
                  <Text style={[theme.cwhite, theme['h16-600']]}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  theme.bw2,
                  theme.bsolid,
                  theme.byellow,
                  theme.w100,
                  theme.h40,
                  theme.mx20,
                  theme.faCenter,
                  theme.fjCenter,
                  theme.br100,
                ]}
                onPress={() => {
                  if (user.id != dUser.id) {
                    navigation.push('MessageDetail', {
                      id: dUser.id,
                      data: {
                        with: dUser,
                      },
                    });
                  } else {
                    navigation.push('Message');
                  }
                }}>
                <Text style={[theme.cwhite, theme['h16-600']]}>Message</Text>
              </TouchableOpacity>
            </View>
            <View style={[theme.fRow, theme.faCenter, theme.wp100, theme.mt20]}>
              <View style={[theme.wp50]}>
                <TouchableOpacity
                  style={[
                    theme.py15,
                    theme.faCenter,
                    {width: '100%'},
                    theme.bbw2,
                    theme.bsolid,
                    active == 'POST' ? theme.byellow : theme.bwhite,
                  ]}
                  onPress={() => {
                    setActive('POST');
                    getFeeds('POST');
                  }}>
                  <Text
                    style={[
                      theme.cwhite,
                      active == 'POST' ? theme['p16-600'] : theme['p16-400'],
                      theme.wp100,
                      {textAlign: 'center'},
                    ]}>
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[theme.wp50]}>
                <TouchableOpacity
                  style={[
                    theme.py15,
                    theme.faCenter,
                    {width: '100%'},
                    theme.bbw2,
                    theme.bsolid,
                    active == 'SHARING' ? theme.byellow : theme.bwhite,
                  ]}
                  onPress={() => {
                    setActive('SHARING');
                    getFeeds('SHARING');
                  }}>
                  <Text
                    style={[
                      theme.cwhite,
                      active == 'SHARING' ? theme['p16-600'] : theme['p16-400'],
                      theme.wp100,
                      {textAlign: 'center'},
                    ]}>
                    Sharing
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {active == 'POST' ? <SocialPost /> : <SocialSharing />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Animated.View
        style={[
          theme.absolute,
          theme.top0,
          theme.bottom0,
          theme.right0,
          theme.left0,
          {
            backgroundColor: 'rgba(0,0,0,.5)',
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
            zIndex: ziChat,
          },
        ]}>
        <View
          style={[theme.absolute, theme.bottom110, theme.right0, theme.left0]}>
          <View
            style={[
              theme.fRow,
              theme.faCenter,
              theme.fjBetween,
              theme.px15,
              theme.mb5,
            ]}>
            <View style={[theme.fRow, theme.faCenter]}>
              <Text style={[theme.cwhite, theme['h18-700'], theme.me5]}>
                Comments
              </Text>
              <Icon name="comment" size={20} color="#F8C303" />
            </View>
            <TouchableOpacity
              onPress={() => {
                showChat();
              }}>
              <Icon name="close" size={25} color="#F8C303" />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {backgroundColor: '#30302B'},
              theme.py22,
              theme.px20,
              theme.br10,
            ]}>
            <ScrollView
              style={[theme.h300]}
              showsVerticalScrollIndicator={false}>
              {comments.loading ? (
                <View style={[theme.py100]}>
                  <ActivityIndicator size="large" color="#F8C303" />
                </View>
              ) : (
                comments.data.map(item => {
                  return (
                    <View
                      style={[
                        theme.fRow,
                        theme.faStart,
                        theme.py10,
                        theme.bbw1,
                        theme.bsolid,
                        {borderColor: '#3a3a2b'},
                      ]}>
                      <View>
                        <Text style={[theme['h14-700'], theme.cwhite]}>
                          {item.name}
                        </Text>
                        <Text style={[theme['p10-400'], {color: '#bababa'}]}>
                          {item.created_on}
                        </Text>
                        <Text
                          style={[theme['p12-400'], theme.cwhite, theme.mt10]}>
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </ScrollView>
            {user.role != 'guest' ? (
              <View
                style={[
                  theme.br10,
                  theme.fRow,
                  theme.faCenter,
                  theme.fjBetween,
                ]}>
                <TextInput
                  style={[
                    {backgroundColor: 'rgba(45, 171, 210, 0.12)'},
                    theme.wp83,
                    theme.br10,
                    theme.cwhite,
                    theme['h12-400'],
                  ]}
                  placeholderTextColor={'#fff'}
                  onChangeText={setComment}
                  value={comment}
                  onSubmitEditing={() => {
                    sentComment();
                  }}
                  clearButtonMode="while-editing"
                />
                <TouchableOpacity
                  style={[
                    theme.br30,
                    theme.w50,
                    theme.h50,
                    theme.bgyellow,
                    theme.fjCenter,
                    theme.faCenter,
                  ]}
                  onPress={() => {
                    sentComment();
                  }}>
                  <Icon name="send" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default Profile;
