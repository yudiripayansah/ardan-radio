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
    let day = date.getDay() + 1;
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
    let day = date.getDay() + 1;
    let hour = date.getHours();
    let minutes = date.getMinutes().toString();
    minutes = minutes.padStart(2, '0');
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
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sentLike = async (target, type, i) => {
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
            getLike();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getLike = async () => {
    let payload = {
      id_target: 1,
      type: 'Radio',
      id_user: user.id,
    };
    try {
      let req = await Api.likeGet(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status && data) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
        console.log(favorite);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCurrentProgram();
    getLike();
    getNextProgram();
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
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
                <Image source={require('../assets/images/icons/heart.png')} />
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
          <View
            style={[
              theme.fRow,
              theme.faCenter,
              theme.mt35,
              theme.w320,
              theme.p10,
              theme.br12,
              theme.relative,
              {backgroundColor: 'rgba(255, 255, 255, 0.16)'},
            ]}>
            <Image
              source={{uri: currentProgram.image}}
              style={[theme.h55, theme.w55, theme.br7, theme.me10]}
            />
            <View style={[theme.faStart]}>
              <Text style={[theme['h16-700'], theme.cwhite]}>
                {currentProgram.title}
              </Text>
              <Text style={[theme['h8-600'], theme.cwhite, {opacity: 0.6}]}>
                {currentProgram.penyiar_name}
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
              {currentProgram.startTime} - {currentProgram.endTime} WIB
            </Text>
          </View>
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
                    <Image
                      source={{uri: item.image}}
                      style={[theme.h55, theme.w55, theme.br7, theme.me10]}
                    />
                    <View style={[theme.faStart]}>
                      <Text style={[theme['h16-700'], theme.cwhite]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[theme['h8-600'], theme.cwhite, {opacity: 0.6}]}>
                        {item.penyiar_name}
                      </Text>
                      <Text style={[theme.cwhite, theme['h10-500']]}>
                        {item.time} WIB
                      </Text>
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
