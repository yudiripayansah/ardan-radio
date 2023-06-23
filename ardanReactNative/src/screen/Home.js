import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
const Home = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const doLogout = () => {
    removeUser();
  };
  const bannerItem = [
    {
      image: require('../assets/images/ardan-banner.jpg')
    },
    {
      image: require('../assets/images/ardan-banner-2.jpg')
    },
    {
      image: require('../assets/images/ardan-banner-2.png')
    }
  ]
  const programItem = [
    {
      image: require('../assets/images/program-1.png')
    },
    {
      image: require('../assets/images/program-2.png')
    },
    {
      image: require('../assets/images/program-3.png')
    },
    {
      image: require('../assets/images/program-1.png')
    },
    {
      image: require('../assets/images/program-2.png')
    },
    {
      image: require('../assets/images/program-3.png')
    },
    {
      image: require('../assets/images/program-1.png')
    },
    {
      image: require('../assets/images/program-2.png')
    },
    {
      image: require('../assets/images/program-3.png')
    }
  ]
  const musicItem = [
    {
      image: require('../assets/images/music-1.png')
    },
    {
      image: require('../assets/images/music-2.png')
    },
    {
      image: require('../assets/images/music-3.png')
    },
    {
      image: require('../assets/images/music-1.png')
    },
    {
      image: require('../assets/images/music-2.png')
    },
    {
      image: require('../assets/images/music-3.png')
    },
    {
      image: require('../assets/images/music-1.png')
    },
    {
      image: require('../assets/images/music-2.png')
    },
    {
      image: require('../assets/images/music-3.png')
    }
  ]
  const menuItem = [
    {
      title: 'Music',
      image: require('../assets/images/icons/icon-music.png')
    },
    {
      title: 'Social',
      image: require('../assets/images/icons/icon-social.png')
    },
    {
      title: 'News',
      image: require('../assets/images/icons/icon-news.png')
    },
    {
      title: 'Event',
      image: require('../assets/images/icons/icon-event.png')
    }
  ]
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        
      }
    });
    return () => (mounted = false);
  }, []);
  const MainBanner = () => {
    return (
      <View style={[ theme.mt20, theme.wp100, {flexGrow: 1}]}>
        <Text style={[theme['h18-600'], theme.cwhite, theme.ps10]}>Hi, Guest</Text>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
          {
            bannerItem.map((item) => {
              return (
              <TouchableOpacity style={[theme.me10]}>
                <Image source={item.image} style={[theme.w300, theme.h140,theme.br30, {objectFit: 'cover'}]}/>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const HomeMenu = () => {
    return (
      <View style={[theme.fRow, theme.fjCenter, theme.mt40]}>
        {
          menuItem.map((item) => {
            return (
            <TouchableOpacity style={[theme.fjCenter, theme.faCenter]}>
              <View style={[theme.w50, theme.h50, theme.faCenter, theme.fjCenter, theme.bgyellow, theme.mx15, theme.br100]}>
                <Image source={item.image}/>
              </View>
              <Text style={[theme['h10-500'], theme.cblack_green, theme.mt5]}>{item.title}</Text>
            </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
  const ProgramPopuler = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Program Terpopuler</Text>
          <TouchableOpacity style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            programItem.map((item) => {
              return (
              <TouchableOpacity style={[theme.me15]}>
                <Image source={item.image} style={[theme.w90, theme.h95,theme.br5, {objectFit: 'cover'}]}/>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const MusicPopuler = () => {
    return (
      <View style={[theme.mt25]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Music Terpopuler</Text>
          <TouchableOpacity style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            musicItem.map((item) => {
              return (
              <TouchableOpacity style={[theme.me15]}>
                <Image source={item.image} style={[theme.w90, theme.h95,theme.br5, {objectFit: 'cover'}]}/>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60]}>
      <Header navigation={navigation}/>
      <ScrollView style={[]}>
        <MainBanner/>
        <HomeMenu/>
        <ProgramPopuler/>
        <MusicPopuler/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
