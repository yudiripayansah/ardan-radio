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
  Linking,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Share from 'react-native-share';
import Icons from '../components/Icons';
import {RadioContext} from '../context/RadioContext';
const EventsDetails = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = useWindowDimensions().width;
  const theme = useContext(ThemeContext);
  const [eventsItem, setEventsItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null,
    },
    loading: false,
  });
  const {id} = route.params;
  const getEvents = async () => {
    setEventsItem({
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
      let req = await Api.eventsGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setEventsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error('get events details', error);
      setEventsItem({
        data: {
          image: 'https://placehold.co/600x400',
          title: null,
          text: null,
        },
        loading: false,
      });
    }
  };
  const doShare = async id => {
    let opt = {
      title: 'Check this Events on Ardan Radio',
      message: 'Check this Events on Ardan Radio',
      url: 'ardanmobileapps://EventsDetails/' + id,
    };
    let share = Share.open(opt);
  };
  const goToUrl = async url => {
    if (url) {
      await Linking.openURL(url);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <SafeAreaView
      style={[
        theme.bgblack,
        {flexGrow: 1},
        radioState && radioState.status == 'playing' ? theme.pt130 : theme.pt60,
        theme.relative,
      ]}>
      <ScrollView style={[]}>
        <AutoHeightImage
          contentWidth={imageWidth}
          width={imageWidth}
          source={{uri: eventsItem.data.image}}
        />
        <View style={[theme.px20]}>
          <View style={[theme.mt10, theme.faStart]}>
            <Text style={[theme['h24-700'], theme.cwhite]}>
              {eventsItem.data.title}
            </Text>
            <Text style={[theme['p12-400'], theme.cyellow]}>
              {Helper.dateIndo(eventsItem.data.created_at)}
            </Text>
            <TouchableOpacity
              style={[theme.fRow, theme.faCenter, theme.mt10]}
              onPress={() => {
                doShare(eventsItem.id);
              }}>
              <Image
                source={Icons.share}
                style={[{height: 16, width: 16, objectFit: 'contain'}]}
              />
            </TouchableOpacity>
            <Text style={[theme['h12-400'], theme.cwhite, theme.mt20]}>
              {eventsItem.data.text}
            </Text>
            {eventsItem.data.btn_label ? (
              <TouchableOpacity
                style={[
                  theme.faCenter,
                  theme.fjCenter,
                  theme.bgyellow,
                  {width: 'auto'},
                  theme.h45,
                  theme.px20,
                  theme.mt10,
                  theme.br5,
                ]}
                onPress={() => {
                  goToUrl(eventsItem.data.btn_url);
                }}>
                <Text style={[theme['h14-700'], theme.cblack]}>
                  {eventsItem.data.btn_label}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventsDetails;
