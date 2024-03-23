import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../config/Api';
const RadioDetails = ({navigation}) => {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const [favorite, setFavorite] = useState(false);
  const [nextProgram, setNextProgram] = useState([]);
  const [currentProgram, setCurrentProgram] = useState({
    image: null,
    title: null,
    penyiar_name: null,
    text: null,
  });
  const getCurrentProgram = async () => {
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let minutes = date.getMinutes().toString();
    minutes = minutes.padStart(2, '0');
    let payload = {
      day: day,
      time: `${hour}:${minutes}`,
    };
    try {
      let req = await Api.programsGet(payload);
      const {status, data, msg} = req.data;
      if (status) {
        setCurrentProgram(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getNextProgram = async () => {
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let minutes = date.getMinutes().toString();
    minutes = minutes.padStart(2, '0');
    // let hour = '12';
    // let minutes = '30';
    let payload = {
      day: day,
      time: `${hour}:${minutes}`,
      next: true,
    };
    try {
      let req = await Api.programsGet(payload);
      const {status, data, msg} = req.data;
      if (status) {
        setNextProgram(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(nextProgram.length);
      nextProgram.map((item, i) => {
        getLike(item.id, 'Program', i);
        getLike(item.id, 'RemindProgram', i);
      });
    }
  };
  const sentLike = async (target, type, i = null) => {
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
          if (status) {
            getLike(target, type, i);
          }
        }
      } catch (error) {
        console.error(error);
      }
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
          setFav(true, type, idx);
        } else {
          setFav(false, type, idx);
        }
      }
    } catch (error) {
      console.error('Error get like', error);
    }
  };
  const setFav = (status, type, idx = null) => {
    let nProgram = [...nextProgram];
    switch (type) {
      case 'Radio':
        setFavorite(status);
        break;
      case 'Program':
        if (nProgram.length > 0) {
          nProgram[idx].favorited = status;
        }
        break;
      case 'RemindProgram':
        if (nProgram.length > 0) {
          nProgram[idx].remind = status;
        }
        break;
    }
    if (nProgram.length > 0) {
      setNextProgram(nProgram);
    }
  };
  useEffect(() => {
    getCurrentProgram();
    getLike(1, 'Radio');
    getNextProgram();
  }, []);
  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, theme.pt60, theme.relative]}>
      <ScrollView style={[]} showsVerticalScrollIndicator={false}>
        <View style={[theme.fjCenter, theme.faCenter, theme.mt25]}>
          <Image
            source={require('../assets/images/radio-play-cover.png')}
            style={[theme.w320, theme.br28]}
          />
          <Text style={[theme['h24-600'], theme.cwhite, theme.mt10]}>
            Ardan Radio 105.9 FM{' '}
          </Text>
          <Text style={[theme['h14-500'], {color: '#9F9F90'}]}>
            Radio Anak Muda No.1 Di Bandung
          </Text>
          <View
            style={[theme.fRow, theme.fjCenter, theme.faCenter, theme.mt25]}>
            {user.id ? (
              <TouchableOpacity
                style={[
                  theme.fRow,
                  theme.faCenter,
                  theme.px15,
                  theme.py5,
                  theme.byellow,
                  theme.bsolid,
                  theme.bw1,
                  theme.br42,
                  theme.wAuto,
                  theme.mx10,
                  theme.fjCenter,
                ]}
                onPress={() => {
                  sentLike(1, 'Radio');
                }}>
                <Icon
                  name="heart"
                  size={12}
                  color={favorite ? '#aa0000' : '#fff'}
                />
                <Text style={[theme['h14-600'], theme.cwhite, theme.ms5]}>
                  {favorite ? 'Favorited' : 'Favorite'}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={[
                theme.fRow,
                theme.faCenter,
                theme.px15,
                theme.py5,
                theme.byellow,
                theme.bsolid,
                theme.bw1,
                theme.br42,
                theme.wAuto,
                theme.mx10,
                theme.fjCenter,
              ]}
              onPress={() => {
                navigation.navigate('Penyiar');
              }}>
              <Text style={[theme['h14-600'], theme.cwhite, theme.ms5]}>
                Profile Penyiar
              </Text>
            </TouchableOpacity>
          </View>
          {currentProgram && (
            <TouchableOpacity
              style={[
                theme.fRow,
                theme.faCenter,
                theme.mt35,
                theme.w320,
                theme.p10,
                theme.br12,
                theme.relative,
                {backgroundColor: 'rgba(255, 255, 255, 0.16)'},
              ]}
              onPress={() => {
                navigation.navigate('ProgramDetails', {
                  id: currentProgram.id,
                });
              }}>
              <Image
                source={
                  currentProgram
                    ? {uri: currentProgram.image}
                    : require('../assets/images/radio-play-cover.png')
                }
                style={[theme.h55, theme.w55, theme.br7, theme.me10]}
              />
              <View style={[theme.faStart]}>
                <Text style={[theme['h16-700'], theme.cwhite]}>
                  {currentProgram ? currentProgram.title : '-'}
                </Text>
                <Text style={[theme['h8-600'], theme.cwhite, {opacity: 0.6}]}>
                  {currentProgram ? currentProgram.penyiar_name : '-'}
                </Text>
                <View
                  style={[
                    theme.bw1,
                    theme.bsolid,
                    theme.br5,
                    theme.byellow,
                    theme.fRow,
                    theme.faCenter,
                    theme.p2,
                    theme.wauto,
                  ]}>
                  <Image
                    source={require('../assets/images/icons/network.png')}
                    style={[theme.h6, theme.w8, theme.me3]}
                  />
                  <Text style={[theme['h5-400'], theme.cyellow]}>Live</Text>
                </View>
              </View>
              <Text
                style={[
                  theme.absolute,
                  theme.bottom5,
                  theme.right10,
                  theme.cwhite,
                  theme['h10-500'],
                ]}>
                {currentProgram && currentProgram.startTime} -{' '}
                {currentProgram && currentProgram.endTime} WIB
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[theme.fjCenter, theme.faCenter, theme.mt35, theme.mb100]}>
          <View style={[theme.w320, theme.faStart]}>
            <Text
              style={[
                theme['h12-500'],
                theme.cyellow,
                theme.pb0,
                theme.bbw1,
                theme.bsolid,
                theme.byellow,
                theme.mb20,
              ]}>
              Program Selanjutnya
            </Text>
            {nextProgram.map((item, i) => {
              if (i > 0) {
                return (
                  <View
                    style={[
                      theme.fRow,
                      theme.faCenter,
                      theme.mb15,
                      theme.w320,
                      theme.p10,
                      theme.br12,
                      theme.relative,
                      {backgroundColor: 'rgba(255, 255, 255, 0.16)'},
                    ]}
                    key={i}>
                    <TouchableOpacity 
                    onPress={() => {
                      navigation.navigate('ProgramDetails', {
                        id: item.id,
                      });
                    }} style={[theme.fRow,theme.wp80]}>
                      <Image
                        source={{uri: item.image}}
                        style={[theme.h55, theme.w55, theme.br7, theme.me10]}
                      />
                      <View style={[theme.faStart]}>
                        <Text style={[theme['h16-700'], theme.cwhite]}>
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            theme['h8-600'],
                            theme.cwhite,
                            {opacity: 0.6},
                          ]}>
                          {item.penyiar_name}
                        </Text>
                        <Text style={[theme.cwhite, theme['h10-500']]}>
                          {item.time} WIB
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={[
                        theme.fRow,
                        theme.faCenter,
                        theme.absolute,
                        theme.right10,
                        theme.bottom10,
                      ]}>
                      <TouchableOpacity
                        style={[theme.me10]}
                        onPress={() => {
                          sentLike(item.id, 'Program', i);
                        }}>
                        <Icon
                          name="heart"
                          size={15}
                          color={item.favorited ? '#aa0000' : '#fff'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          sentLike(item.id, 'RemindProgram', i);
                        }}>
                        <Icon
                          name="bell"
                          size={15}
                          color={item.remind ? '#F8C303' : '#fff'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RadioDetails;
