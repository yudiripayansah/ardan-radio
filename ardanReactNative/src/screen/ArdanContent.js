import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Linking
} from 'react-native';
import axios from 'axios';
import {ThemeContext} from '../context/ThemeContext';
import {RadioContext} from '../context/RadioContext';
const ArdanContent = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const radioState = useContext(RadioContext).state;
  let apiKey = 'AIzaSyBOr3JxvvNcGariUrqnvsjUktQKxYGGWiI',
  channelId = 'UCogKRAj4-WLY1INM7vESjhw',
  channelName = '@ardanradio1059FM',
  tiktokUsername = '@ardanradiobdg',
  instagramUsername = 'ardanradio'
  const [youtube, setYoutube] = useState([]);
  const instagramItem = [
    {
      image: require('../assets/images/ig/1.png'),
    },
    {
      image: require('../assets/images/ig/2.png'),
    },
    {
      image: require('../assets/images/ig/3.png'),
    },
    {
      image: require('../assets/images/ig/4.png'),
    },
    {
      image: require('../assets/images/ig/1.png'),
    },
    {
      image: require('../assets/images/ig/2.png'),
    },
    {
      image: require('../assets/images/ig/3.png'),
    },
    {
      image: require('../assets/images/ig/4.png'),
    },
  ];
  const tiktokItem = [
    {
      image: require('../assets/images/tiktok/1.png'),
    },
    {
      image: require('../assets/images/tiktok/2.png'),
    },
    {
      image: require('../assets/images/tiktok/3.png'),
    },
    {
      image: require('../assets/images/tiktok/1.png'),
    },
    {
      image: require('../assets/images/tiktok/2.png'),
    },
    {
      image: require('../assets/images/tiktok/3.png'),
    },
  ];
  const getYoutube = async () => {
    url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;
    try {
      let req = await axios.get(url);
      const {status, data} = req
      if(status === 200) {
        setYoutube(data.items)
      }
    } catch (error) {
      console.error('get youtube:',error);
    }
  };
  const goToUrl = async (url) => {
    await Linking.openURL(url);
  }
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getYoutube()
      }
    });
    return () => (mounted = false);
  }, []);
  const Content = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Content</Text>
          <TouchableOpacity
            onPress={() => {goToUrl(`https://www.youtube.com/${channelName}`)}}
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={[
            theme.wp100,
            {flexGrow: 1},
            theme.fRow,
            theme.px20,
            theme.mt10,
          ]}
          showsHorizontalScrollIndicator={false}>
          {youtube.map((item, i) => {
            return (
              <TouchableOpacity style={[theme.me15, theme.w230]} key={i} onPress={() => {goToUrl(`https://www.youtube.com/watch?v=${item.id.videoId}`)}}>
                <Image
                  source={{uri:item.snippet.thumbnails.medium.url}}
                  style={[
                    theme.wp100,
                    theme.h130,
                    theme.brtl24,
                    theme.brtr24,
                    {objectFit: 'cover'},
                  ]}
                />
                <View style={[theme.py10]}>
                  <Text style={[theme['h12-500'], theme.cwhite]}>
                    {item.snippet.title}
                  </Text>
                  <Text style={[theme['h10-400'], theme.cblue_grey]}>
                    {item.snippet.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const Instagram = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Instagram</Text>
          <TouchableOpacity
            onPress={() => {goToUrl(`https://www.instagram.com/${instagramUsername}`)}}
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={[
            theme.wp100,
            {flexGrow: 1},
            theme.fRow,
            theme.px20,
            theme.mt10,
          ]}
          showsHorizontalScrollIndicator={false}>
          {instagramItem.map((item, i) => {
            return (
              <TouchableOpacity style={[theme.me15]} key={i}>
                <Image
                  source={item.image}
                  style={[
                    theme.w90,
                    theme.h95,
                    theme.br5,
                    {objectFit: 'cover'},
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const Tiktok = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px20, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Tiktok</Text>
          <TouchableOpacity
            onPress={() => {goToUrl(`https://www.tiktok.com/${tiktokUsername}`)}}
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.py5,
              theme.px10,
              theme.br40,
            ]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={[
            theme.wp100,
            {flexGrow: 1},
            theme.fRow,
            theme.px20,
            theme.mt10,
          ]}
          showsHorizontalScrollIndicator={false}>
          {tiktokItem.map((item, i) => {
            return (
              <TouchableOpacity style={[theme.me15]} key={i}>
                <Image
                  source={item.image}
                  style={[
                    theme.w202,
                    theme.h264,
                    theme.br5,
                    {objectFit: 'cover'},
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  useEffect(() => {
  }, []);

  return (
    <SafeAreaView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt100 : theme.pt60, theme.relative]}>
      <ScrollView style={[]}>
        <Content />
        <Instagram />
        <Tiktok />
        <View style={[theme.mb180]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArdanContent;
