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
import {RadioContext} from '../context/RadioContext';
import Api from '../config/Api';
import RenderHtml from 'react-native-render-html';
const BannerDetails = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = useWindowDimensions().width - 40;
  const theme = useContext(ThemeContext);
  const [bannerItem, setBannerItem] = useState({
    data: {
      image: 'https://placehold.co/600x400',
      title: null,
      text: null,
    },
    loading: false,
  });
  const {id} = route.params;
  const getBanner = async () => {
    setBannerItem({
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
      let req = await Api.bannerGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = data;
        }
      }
      setBannerItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error('get Banner', error);
      setBannerItem({
        data: {
          image: 'https://placehold.co/600x400',
          title: null,
          text: null,
        },
        loading: false,
      });
    }
  };
  useEffect(() => {
    getBanner();
  }, []);

  return (
    <SafeAreaView
      style={[
        theme.bgblack,
        {flexGrow: 1},
        radioState && radioState.status == 'playing' ? theme.pt150 : theme.pt60,
        theme.relative,
      ]}>
      <ScrollView style={[]}>
        <View style={[theme.px20]}>
          <AutoHeightImage
            contentWidth={imageWidth}
            width={imageWidth}
            source={{uri: bannerItem.data.image}}
          />
          <View style={[theme.mt10]}>
            <Text style={[theme['h24-700'], theme.cwhite]}>
              {bannerItem.data.title}
            </Text>
            <RenderHtml
              contentWidth={imageWidth}
              source={{
                html: `<div style="color:#fff;">${bannerItem.data.text}</div>`,
              }}
            />
          </View>
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BannerDetails;
