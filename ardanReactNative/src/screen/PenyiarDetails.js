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
import {RadioContext} from '../context/RadioContext';
const PenyiarDetails = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = Dimensions.get('window').width - 40;
  const theme = useContext(ThemeContext);
  const [penyiarItem, setPenyiarItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null,
    },
    loading: false,
  });
  const {id} = route.params;
  const getPenyiar = async () => {
    setPenyiarItem({
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
      let req = await Api.penyiarGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setPenyiarItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setPenyiarItem({
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
    await Linking.openURL(url);
  };
  useEffect(() => {
    getPenyiar();
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt140 : theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.px20]}>
          <AutoHeightImage
            width={imageWidth}
            source={{uri: penyiarItem.data.image}}
          />
          <View style={[theme.mt10]}>
            <Text style={[theme['h24-700'], theme.cwhite]}>
              {penyiarItem.data.name}
            </Text>
            <View style={[theme.fRow, theme.mb10]}>
              <TouchableOpacity
                style={[theme.me10]}
                onPress={() => {
                  goToUrl(penyiarItem.instagram);
                }}>
                <Image
                  source={require('../assets/images/icons/ig.png')}
                  style={[theme.h20, theme.w20]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  goToUrl(penyiarItem.twitter);
                }}>
                <Image
                  source={require('../assets/images/icons/twitter.png')}
                  style={[theme.h20, theme.w20]}
                />
              </TouchableOpacity>
            </View>
            <Text style={[theme['p14-00'], theme.cwhite]}>
              {penyiarItem.data.text}
            </Text>
          </View>
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PenyiarDetails;
