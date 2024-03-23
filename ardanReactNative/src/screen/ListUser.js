import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioContext} from '../context/RadioContext';
const ListUser = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [follow, setFollow] = useState(false);
  const [userList, setUserList] = useState({
    data: [],
    loading: false,
  });
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
  const getUser = async () => {
    setUserList({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 100,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
      };
      if (route.params) {
        if (route.params.type == 'followers') {
          payload.id_target = route.params.id;
        } else {
          payload.id_user = route.params.id;
        }
      }
      let req = await Api.userFollow(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setUserList({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setUserList({
        data: [],
        loading: false,
      });
    }
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getUser();
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <SafeAreaView
      style={[
        theme.bgblack,
        {flexGrow: 1},
        radioState && radioState.status == 'playing' ? theme.pt130 : theme.pt60,
      ]}>
      <ScrollView style={[]} showsVerticalScrollIndicator={false}>
        {userList.data.map(item => {
          return (
            <TouchableOpacity
              style={[
                theme.px20,
                theme.py10,
                theme.fRow,
                theme.faCenter,
                theme.bSolid,
                theme.bbw1,
                {borderColor: '#333'},
              ]}
              onPress={() => {
                navigation.push('Profile', {
                  id: (route.params.type == 'following') ? item.user_target.id : (item.user) ? item.user.id : 0
                })
              }}>
              <Image
                source={
                  (route.params.type == 'following' && item.user_target.image)
                    ? {uri: item.user_target.image_url}
                    : (route.params.type == 'followers' && item.user && item.user.image)
                    ? {uri: item.user.image_url}
                    : {
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                      }
                }
                style={[theme.h40, theme.w40, theme.br12, theme.me15]}
              />
              <Text style={[theme.cwhite, theme['p14-600']]}>
                {route.params.type == 'following'
                  ? item.user_target.name
                  : item.user
                  ? item.user.name
                  : 'Unknown User'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListUser;
