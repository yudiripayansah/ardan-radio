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
const Notifications = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = useWindowDimensions().width;
  const theme = useContext(ThemeContext);
  const [notificationsItem, setNotificationsItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null,
    },
    loading: false,
  });
  const {id} = route.params;
  const getNotifications = async () => {
    setNotificationsItem({
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
      let req = await Api.notificationsGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setNotificationsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setNotificationsItem({
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
      title: 'Check this Notifications on Ardan Radio',
      message: 'Check this Notifications on Ardan Radio',
      url: 'ardanmobileapps://NotificationsDetails/' + id,
    };
    let share = Share.open(opt);
  };
  const goToUrl = async url => {
    if (url) {
      await Linking.openURL(url);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt130 : theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <AutoHeightImage
          contentWidth={imageWidth}
          width={imageWidth}
          source={{uri: notificationsItem.data.image}}
        />
        <View style={[theme.px20]}>
          <View style={[theme.mt10, theme.faStart]}>
            <Text style={[theme['h24-700'], theme.cwhite]}>
              {notificationsItem.data.title}
            </Text>
            <Text style={[theme['p12-400'], theme.cyellow]}>
              {Helper.dateIndo(notificationsItem.data.created_at)}
            </Text>
            <TouchableOpacity
              style={[theme.fRow, theme.faCenter, theme.mt10]}
              onPress={() => {
                doShare(notificationsItem.data.id);
              }}>
              <Image source={Icons.share} style={[{height:16,width:16,objectFit:'contain'}]} />
            </TouchableOpacity>
            <Text style={[theme['h12-400'], theme.cwhite, theme.mt20]}>
              {notificationsItem.data.text}
            </Text>
            {notificationsItem.data.btn_label ? (
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
                  goToUrl(notificationsItem.data.btn_url);
                }}>
                <Text style={[theme['h14-700'], theme.cblack]}>
                  {notificationsItem.data.btn_label}
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

export default Notifications;
