import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import Icons from '../components/Icons';
const SocialPost = ({navigation}) => {
  const imageWidth = Dimensions.get('window').width - 40;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [showC, setShowC] = useState(true);
  const [ziChat, setZiChat] = useState(1);
  const [comment, setComment] = useState();
  const [target, setTarget] = useState();
  const [loading, setLoading] = useState(false);
  const [feedsItem, setFeedsItem] = useState({
    data: [],
    loading: false,
  });
  const [comments, setComments] = useState({
    data: [],
    loading: false,
  });
  const getFeeds = async () => {
    setFeedsItem({
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
        type: 'POST',
        status: 'PUBLISHED',
      };
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
            getLike(t, tt, i);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };
  const getLike = async (t, tt, i) => {
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
  const doShare = async id => {
    let opt = {
      title: 'Check my Post on Ardan Radio',
      message: 'Check my Post on Ardan Radio',
      url: 'ardanmobileapps://SocialPostDetails/' + id,
    };
    let share = Share.open(opt);
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getFeeds();
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        style={[theme.bgblack, {flexGrow: 1, zIndex: 2}, theme.relative]}>
        <ScrollView style={[]}>
          {feedsItem.loading ? (
            <View style={[theme.py100]}>
              <ActivityIndicator size="large" color="#F8C303" />
            </View>
          ) : (
            feedsItem.data.map((item, i) => {
              return (
                <View style={[theme.my20]} key={i}>
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
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Profile', {
                            id: item.user.id,
                          });
                        }}>
                        <Text style={[theme['p16-700'], theme.cwhite]}>
                          {item.user.name}
                        </Text>
                      </TouchableOpacity>
                      <View style={[theme.fRow, theme.faCenter]}>
                        {/* <Image source={require('../assets/images/icons/map-pin.png')} style={[theme.h15,theme.w15,theme.me5]}/>
                      <Text style={[theme['p12-400'],{color:'grey'},theme.me10]}>{item.location}</Text> */}
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
                  <RenderHtml
                    contentWidth={imageWidth}
                    source={{
                      html: `<div style="color:#fff;">${item.text}</div>`,
                    }}
                  />
                  {/* <Text style={[theme['p14-400'],theme.cwhite,theme.mb20]}>{item.text}</Text> */}
                  {item.image_url ? (
                    <AutoHeightImage
                      width={imageWidth}
                      source={{uri: item.image_url}}
                    />
                  ) : null}
                  <View style={[theme.fRow,theme.faCenter,theme.fjBetween,theme.mt10]}>
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
                        doShare(feedsItem.data.id);
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
          )}
          <View style={[theme.mb150]} />
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
            <ScrollView style={[theme.h300]}>
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

export default SocialPost;
