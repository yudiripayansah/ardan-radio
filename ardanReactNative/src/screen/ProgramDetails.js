import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
const ProgramDetails = ({route, navigation}) => {
  const imageWidth = useWindowDimensions().width;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [favorite, setFavorite] = useState(false);
  const [programsItem, setProgramsItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null,
    },
    loading: false,
  });
  const {id} = route.params;
  const getPrograms = async () => {
    setProgramsItem({
      data: {
        image: 'https://placehold.co/600x400',
        title: null,
        text: null,
      },
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        id: id,
      };
      let req = await Api.programsGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setProgramsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setProgramsItem({
        data: {
          image: 'https://placehold.co/600x400',
          title: null,
          text: null,
        },
        loading: false,
      });
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
      id_target: id,
      type: 'Program',
      id_user: user.id,
    };
    try {
      let req = await Api.likeGet(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        console.log(data);
        if (status && data) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPrograms();
    getLike();
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <AutoHeightImage
          width={imageWidth}
          source={{uri: programsItem.data.image}}
        />
        <View style={[theme.px20]}>
          <View style={[theme.mt10]}>
            <View style={[theme.fRow, theme.faCenter, theme.fjBetween]}>
              <Text style={[theme['h24-700'], theme.cwhite]}>
                {programsItem.data.title}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  sentLike(id, 'Program');
                }}>
                <Icon
                  name="heart"
                  size={20}
                  color={favorite ? '#ee0000' : '#fff'}
                />
              </TouchableOpacity>
            </View>
            <View style={[theme.fRow]}>
              <View style={[theme.fRow, theme.me15]}>
                <Image
                  style={[theme.me5, theme.w15, theme.h15]}
                  source={require('../assets/images/icons/calendar.png')}
                />
                <Text style={[theme['h12-400'], theme.cwhite]}>
                  {programsItem.data.days_label}
                </Text>
              </View>
              <View style={[theme.fRow]}>
                <Image
                  style={[theme.me5, theme.w15, theme.h15]}
                  source={require('../assets/images/icons/discovery.png')}
                />
                <Text style={[theme['h12-400'], theme.cwhite]}>
                  {programsItem.data.time}
                </Text>
              </View>
            </View>
            <Text style={[theme['h18-700'], theme.cwhite, theme.mt15]}>
              Description
            </Text>
            <Text style={[theme['h12-400'], theme.cwhite]}>
              {programsItem.data.text}
            </Text>
            <Text style={[theme['h18-700'], theme.cwhite, theme.mt15]}>
              Penyiar
            </Text>
            <Text style={[theme['h12-400'], theme.cwhite]}>
              {programsItem.data.penyiar_name}
            </Text>
          </View>
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgramDetails;
