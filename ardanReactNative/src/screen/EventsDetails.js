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
  Linking,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
const EventsDetails = ({route, navigation}) => {
  const imageWidth = Dimensions.get('window').width;
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
      console.error(error);
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
  const goToUrl = async url => {
    if(url){
      await Linking.openURL(url);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <AutoHeightImage
          width={imageWidth}
          source={{uri: eventsItem.data.image}}
        />
        <View style={[theme.px30]}>
          <View style={[theme.mt10,theme.faStart]}>
            <Text style={[theme['h24-700'], theme.cwhite]}>
              {eventsItem.data.title}
            </Text>
            <Text style={[theme['p12-400'], theme.cyellow]}>
              {Helper.dateIndo(eventsItem.data.created_at)}
            </Text>
            <Text style={[theme['h12-400'], theme.cwhite, theme.mt20]}>
              {eventsItem.data.text}
            </Text>
            {
              (eventsItem.data.btn_label) ? (
                <TouchableOpacity style={[theme.faCenter,theme.fjCenter,theme.bgyellow,{width:'auto'},theme.h45,theme.px20,theme.mt10,theme.br5]} onPress={()=>{goToUrl(eventsItem.data.btn_url)}}>
                  <Text style={[theme['h14-700'],theme.cblack]}>{eventsItem.data.btn_label}</Text>
                </TouchableOpacity>
              ) : null
            }
          </View>
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventsDetails;
