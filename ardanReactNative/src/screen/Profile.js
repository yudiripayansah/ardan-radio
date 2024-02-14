import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioContext} from '../context/RadioContext';
import {AuthContext} from '../context/AuthContext';
const Profile = ({route, navigation}) => {
  const {removeUser} = useContext(AuthContext);
  const radioState = useContext(RadioContext).state;
  const imageWidth = Dimensions.get('window').width - 20;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [dUser, setDUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedsItem, setFeedsItem] = useState({
    data: [],
    loading: false,
  });
  const [follow, setFollow] = useState(false);
  const getFeeds = async () => {
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
        type: 'POST',
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
  const getUser = async () => {
    let id = user.id;
    if (route.params) {
      id = route.params.id;
      console.log('profile user id:', route.params.id);
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
  const doLogout = () => {
    removeUser();
  };
  useEffect(() => {
    getFeeds();
    getUser();
  }, []);

  return (
    <SafeAreaView
      style={[
        theme.bgblack,
        {flexGrow: 1},
        radioState && radioState.status == 'playing' ? theme.pt130 : theme.pt60,
      ]}>
      <ScrollView style={[]}>
        <View style={[theme.px10, theme.pt10, theme.mb100]}>
          <View style={[theme.fRow]}>
            <Image
              source={
                dUser.image
                  ? {uri: dUser.image_url}
                  : {
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                    }
              }
              style={[theme.w80, theme.h80, theme.br10, {objectFit: 'cover'}]}
            />
            <View style={[theme.ms10]}>
              <Text style={[theme.cwhite, theme['h16-700']]}>{dUser.name}</Text>
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
                  });
                } else {
                  navigation.push('Message');
                }
              }}>
              <Text style={[theme.cwhite, theme['h16-600']]}>Message</Text>
            </TouchableOpacity>
          </View>
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
                      <Text style={[theme['p16-700'], theme.cwhite]}>
                        {item.user.name}
                      </Text>
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
                  <View style={[theme.h15]} />
                  <RenderHtml
                    contentWidth={imageWidth}
                    source={{
                      html: `<div style="color:#fff;">${item.text}</div>`,
                    }}
                    style={[theme.mt10, theme.mb10]}
                  />
                  <View style={[theme.h10]} />
                  {/* <Text style={[theme['p14-400'],theme.cwhite,theme.mb20]}>{item.text}</Text> */}
                  {item.image_url && (
                    <Image
                      style={[{width:imageWidth,height:imageWidth,objectFit: 'contain',backgroundColor:'#fafafa'}]}
                      source={{uri: item.image_url}}
                    />
                  )}
                  <View style={[theme.fRow, theme.faCenter, theme.mt10]}>
                    <TouchableOpacity
                      style={[theme.fRow, theme.faCenter, theme.me15]}>
                      <Icon name="heart" size={20} color="#F8C303" />
                      <Text style={[theme['p12-400'], theme.cwhite, theme.ms5]}>
                        100
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[theme.fRow, theme.faCenter]}>
                      <Icon name="comment" size={20} color="#F8C303" />
                      <Text style={[theme['p12-400'], theme.cwhite, theme.ms5]}>
                        100
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
