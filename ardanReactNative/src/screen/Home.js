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
      image: require('../assets/images/ardan-banner.png')
    },
    {
      image: require('../assets/images/ardan-banner-2.png')
    }
  ]
  const newsItem = [
    {
      image: require('../assets/images/news-1.png'),
      time: '4 Minutes ago',
      title: 'Is walking 10,000 steps every day really necessary?'
    },
    {
      image: require('../assets/images/news-2.png'),
      time: '4 Minutes ago',
      title: 'News of marathon matches during this pandemic'
    },
    {
      image: require('../assets/images/news-3.png'),
      time: '4 Minutes ago',
      title: 'Is walking 10,000 steps every day really necessary?'
    },
    {
      image: require('../assets/images/news-1.png'),
      time: '4 Minutes ago',
      title: 'Is walking 10,000 steps every day really necessary?'
    },
    {
      image: require('../assets/images/news-2.png'),
      time: '4 Minutes ago',
      title: 'News of marathon matches during this pandemic'
    },
    {
      image: require('../assets/images/news-3.png'),
      time: '4 Minutes ago',
      title: 'Is walking 10,000 steps every day really necessary?'
    },
  ]
  const contentItem = [
    {
      image: require('../assets/images/content-1.png'),
      info: '323k views . 2 years ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #33 | PENGALAMAN SERAM PRAMUGARI'
    },
    {
      image: require('../assets/images/content-2.png'),
      info: '870k views . 2 years ago',
      title: 'EP. 6 DIBALIK LAYAR JURNAL RISA "NIGHTMARE SIDE" DOCUMYSTERY'
    },
    {
      image: require('../assets/images/content-3.png'),
      info: '897k views . 2 week ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #121 | NGOBROLIN JURNALRISA THE SERIES'
    },
    {
      image: require('../assets/images/content-1.png'),
      info: '323k views . 2 years ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #33 | PENGALAMAN SERAM PRAMUGARI'
    },
    {
      image: require('../assets/images/content-2.png'),
      info: '870k views . 2 years ago',
      title: 'EP. 6 DIBALIK LAYAR JURNAL RISA "NIGHTMARE SIDE" DOCUMYSTERY'
    },
    {
      image: require('../assets/images/content-3.png'),
      info: '897k views . 2 week ago',
      title: 'NIGHTMARESIDE TESTIMYSTERY #121 | NGOBROLIN JURNALRISA THE SERIES'
    },
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
      image: require('../assets/images/program-4.png')
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
      image: require('../assets/images/program-4.png')
    },
  ]
  const eventItem = [
    {
      image: require('../assets/images/event-1.png')
    },
    {
      image: require('../assets/images/event-2.png')
    },
    {
      image: require('../assets/images/event-3.png')
    },
    {
      image: require('../assets/images/event-4.png')
    },
    {
      image: require('../assets/images/event-1.png')
    },
    {
      image: require('../assets/images/event-2.png')
    },
    {
      image: require('../assets/images/event-3.png')
    },
    {
      image: require('../assets/images/event-4.png')
    },
  ]
  const menuItem = [
    {
      title: 'Ardan Content',
      image: require('../assets/images/icons/menu-content.png'),
      target: () => {navigation.navigate('ArdanContent')}
    },
    {
      title: 'Social',
      image: require('../assets/images/icons/menu-social.png'),
      target: () => {navigation.navigate('Social')}
    },
    {
      title: 'News',
      image: require('../assets/images/icons/menu-news.png'),
      target: () => {navigation.navigate('News')}
    },
    {
      title: 'Event',
      image: require('../assets/images/icons/menu-event.png'),
      target: () => {navigation.navigate('Event')}
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
        <Text style={[theme['h18-600'], theme.cwhite, theme.ps10]}>Hi, {user.name}</Text>
        <TouchableOpacity onPress={() => {doLogout()}}>
          <Text style={[theme['h12-600'], theme.cwhite, theme.ps10]}>Logout</Text>
        </TouchableOpacity>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
          {
            bannerItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me10]} key={i}>
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
          menuItem.map((item,i) => {
            return (
            <TouchableOpacity 
              style={[theme.fjCenter, theme.faCenter]}
              onPress={item.target} key={i}>
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
  const News = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>News</Text>
          <TouchableOpacity style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            newsItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15, theme.w230, theme.br24, theme.bgblack_chocolate]} key={i}>
                <Image source={item.image} style={[theme.wp100, theme.h150,theme.brtl24,theme.brtr24, {objectFit: 'cover'}]}/>
                <View style={[theme.p10]}>
                  <Text style={[theme.tRight, theme['h10-400'], theme.cwhite]}>{item.time}</Text>
                  <Text style={[theme['h12-500'], theme.cwhite]}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const Content = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Ardan Content</Text>
          <TouchableOpacity style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            contentItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15, theme.w230]} key={i}>
                <Image source={item.image} style={[theme.wp100, theme.h130,theme.brtl24,theme.brtr24, {objectFit: 'cover'}]}/>
                <View style={[theme.py10]}>
                  <Text style={[theme['h12-500'], theme.cwhite]}>{item.title}</Text>
                  <Text style={[theme['h10-400'], theme.cblue_grey]}>{item.info}</Text>
                </View>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const ProgramPopuler = () => {
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Program Terpopuler</Text>
          <TouchableOpacity 
            style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}
            onPress={()=>{navigation.navigate('Program')}}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            programItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15]} key={i}>
                <Image source={item.image} style={[theme.w90, theme.h95,theme.br5, {objectFit: 'cover'}]}/>
              </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  const Event = () => {
    return (
      <View style={[theme.mt25]}>
        <View style={[theme.fRow, theme.fjBetween, theme.px10, theme.faCenter]}>
          <Text style={[theme['h14-600'], theme.cwhite]}>Upcoming Event</Text>
          <TouchableOpacity style={[theme.bgblack_chocolate, theme.fjCenter, theme.py5, theme.px10, theme.br40]}>
            <Text style={[theme['h14-500'], theme.cwhite]}>See More</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
        {
            eventItem.map((item,i) => {
              return (
              <TouchableOpacity style={[theme.me15]} key={i}>
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
      <ScrollView style={[]}>
        <MainBanner/>
        <HomeMenu/>
        <News/>
        <Content/>
        <View style={[theme.mt35, theme.px10, theme.wp100]}>
          <Image source={require('../assets/images/ads-1.png')} style={[theme.wp100,{objectFit: 'contain'}]}/>
        </View>
        <Event/>
        <ProgramPopuler/>
        <View style={[theme.h180]}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
