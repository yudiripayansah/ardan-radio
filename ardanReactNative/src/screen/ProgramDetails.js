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
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import Icons from '../components/Icons';
import {RadioContext} from '../context/RadioContext';
const ProgramDetails = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = Dimensions.get('window').width;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [favorite, setFavorite] = useState(false);
  const [remind, setRemind] = useState(false);
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
            getLike(type);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getLike = async (type) => {
    let payload = {
      id_target: id,
      type: type,
      id_user: user.id,
    };
    try {
      let req = await Api.likeGet(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        console.log(data);
        if (status && data) {
          setFav(true,type);
        } else {
          setFav(false,type);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const setFav = (status, type, idx = null) => {
    switch (type) {
      case 'Program':
        setFavorite(status);
        break;
      case 'RemindProgram':
        setRemind(status);
        break;
    }
  };
  const doShare = async id => {
    let opt = {
      title: 'Check cooL Program that i listen to on Ardan Radio',
      message: 'Check cool Program that i listen to on Ardan Radio',
      url: 'ardanmobileapps://ProgramDetails/' + id,
    };
    let share = Share.open(opt);
  };
  useEffect(() => {
    getPrograms();
    getLike('Program');
    getLike('RemindProgram');
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt130 : theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <AutoHeightImage
          width={imageWidth}
          source={{uri: programsItem.data.image}}
        />
        <View style={[theme.px20]}>
          <View style={[theme.mt10]}>
            <View style={[]}>
              <Text style={[theme['h24-700'], theme.cwhite,theme.mb5]}>
                {programsItem.data.title}
              </Text>
              <View style={[theme.fRow,theme.faCenter,theme.fjStart,theme.mb30]}>
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
                <TouchableOpacity
                  style={[theme.ms10]}
                  onPress={() => {
                    sentLike(id, 'RemindProgram');
                  }}>
                  <Icon
                    name="bell"
                    size={20}
                    color={remind ? '#F8C303' : '#fff'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[theme.fRow, theme.faCenter,theme.ms10]}
                  onPress={() => {
                    doShare(id);
                  }}>
                  <Image source={Icons.share} style={[{height:16,width:16,objectFit:'contain'}]} />
                </TouchableOpacity>
              </View>
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
