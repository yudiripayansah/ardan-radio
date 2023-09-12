import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api'
import Helper from '../config/Helper'
const Home = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const [bannerItem,setBannerItem] = useState({
    data: [],
    loading: false
  })
  const [bannerAdsItem,setBannerAdsItem] = useState({
    data: [],
    loading: false
  })
  const [newsItem,setNewsItem] = useState({
    data: [],
    loading: false
  })
  const [eventsItem,setEventsItem] = useState({
    data: [],
    loading: false
  })
  const [programsItem,setProgramsItem] = useState({
    data: [],
    loading: false
  })
  const getBanner = async () => {
    setBannerItem({
      data: [],
      loading: true
    })
    try {
      let theData = []
      let payload = {
        page : 1,
        perPage : 5,
        sortDir : 'DESC',
        sortBy : 'id',
        search : null,
        cta: 'MAIN BANNER'
      }
      let req = await Api.bannerRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setBannerItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setBannerItem({
        data: [],
        loading: false
      })
    }
  }
  const getBannerAds = async () => {
    setBannerAdsItem({
      data: [],
      loading: true
    })
    try {
      let theData = []
      let payload = {
        page : 1,
        perPage : 5,
        sortDir : 'DESC',
        sortBy : 'id',
        search : null,
        cta: 'HOMEPAGE'
      }
      let req = await Api.bannerRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setBannerAdsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setBannerAdsItem({
        data: [],
        loading: false
      })
    }
  }
  const getNews = async () => {
    setNewsItem({
      data: [],
      loading: true
    })
    try {
      let theData = []
      let payload = {
        page : 1,
        perPage : 5,
        sortDir : 'DESC',
        sortBy : 'id',
        search : null,
      }
      let req = await Api.newsRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setNewsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setNewsItem({
        data: [],
        loading: false
      })
    }
  }
  const getEvents = async () => {
    setEventsItem({
      data: [],
      loading: true
    })
    try {
      let theData = []
      let payload = {
        page : 1,
        perPage : 5,
        sortDir : 'DESC',
        sortBy : 'id',
        search : null,
      }
      let req = await Api.eventsRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setEventsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setEventsItem({
        data: [],
        loading: false
      })
    }
  }
  const getPrograms = async () => {
    setProgramsItem({
      data: [],
      loading: true
    })
    try {
      let theData = []
      let payload = {
        page : 1,
        perPage : 5,
        sortDir : 'DESC',
        sortBy : 'id',
        search : null,
      }
      let req = await Api.programsRead(payload)
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          theData = [...data]
        }
      }
      setProgramsItem({
        data: theData,
        loading: false
      })
    } catch (error) {
      console.error(error)
      setProgramsItem({
        data: [],
        loading: false
      })
    }
  }
  const doLogout = () => {
    removeUser();
  };
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
  const goToBanner = (id) => {
    navigation.navigate('BannerDetails', {
      id: id
    });
  }
  const goToNews = (id) => {
    navigation.navigate('NewsDetails', {
      id: id
    });
  }
  const goToEvents = (id) => {
    navigation.navigate('EventsDetails', {
      id: id
    });
  }
  const goToProgram = (id) => {
    navigation.navigate('ProgramDetails', {
      id: id
    });
  }
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        getBanner()
        getNews()
        getEvents()
        getPrograms()
        getBannerAds()
      }
    });
    return () => (mounted = false);
  }, []);
  const MainBanner = () => {
    if(bannerItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      )
    } else {
      return (
        <View style={[ theme.mt20, theme.wp100, {flexGrow: 1}]}>
          <Text style={[theme['h18-600'], theme.cwhite, theme.ps10]}>Hi, {user.name}</Text>
          <TouchableOpacity onPress={() => {doLogout()}}>
            <Text style={[theme['h12-600'], theme.cwhite, theme.ps10]}>Logout</Text>
          </TouchableOpacity>
          <ScrollView horizontal style={[theme.wp100, {flexGrow: 1}, theme.fRow, theme.px10, theme.mt10]} showsHorizontalScrollIndicator={false}>
            {
              bannerItem.data.map((item,i) => {
                return (
                <TouchableOpacity style={[theme.me10]} key={i} onPress={() => {goToBanner(item.id)}}>
                  <Image source={{uri:item.image_url}} style={[theme.w300, theme.h140,theme.br30, {objectFit: 'cover'}]}/>
                </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      )
    }
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
    if(newsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      )
    } else {
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
              newsItem.data.map((item,i) => {
                return (
                <TouchableOpacity style={[theme.me15, theme.w230, theme.br24, theme.bgblack_chocolate]} key={i} onPress={() => {goToNews(item.id)}}>
                  <Image source={{uri:item.image_url}} style={[theme.wp100, theme.h150,theme.brtl24,theme.brtr24, {objectFit: 'cover'}]}/>
                  <View style={[theme.p10]}>
                    <Text style={[theme.tRight, theme['h10-400'], theme.cwhite]}>{Helper.dateIndo(item.created_at)}</Text>
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
    if(programsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      )
    } else {
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
              programsItem.data.map((item,i) => {
                return (
                <TouchableOpacity style={[theme.me15]} key={i} onPress={() => {goToProgram(item.id)}}>
                  <Image source={{uri:item.image_url}} style={[theme.w90, theme.h95,theme.br5, {objectFit: 'cover'}]}/>
                </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      )
    }
  }
  const Event = () => {
    if(eventsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      )
    } else {
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
              eventsItem.data.map((item,i) => {
                return (
                <TouchableOpacity style={[theme.me15]} key={i} onPress={() => {goToEvents(item.id)}}>
                  <Image source={{uri:item.image_url}} style={[theme.w90, theme.h95,theme.br5, {objectFit: 'cover'}]}/>
                </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      )
    }
  }
  const Ads = () => {
    if(bannerAdsItem.loading) {
      return (
        <View style={[theme.py50]}>
          <ActivityIndicator size="large" color="#F8C303" />
        </View>
      )
    } else {
      return bannerAdsItem.data.map((item,i) => {
        return (
          <View style={[theme.mt35, theme.px10, theme.wp100]} key={i}>
            <TouchableOpacity onPress={() => {goToBanner(item.id)}}>
              <Image source={{uri:item.image_url}} style={[theme.wp100,theme.h150,{objectFit: 'contain'}]}/>
            </TouchableOpacity>
          </View>
        )
      })
    }
  }
  return (
    <SafeAreaView style={[theme.bgblack,{flexGrow: 1},theme.pt60]}>
      <ScrollView style={[]}>
        <MainBanner/>
        <HomeMenu/>
        <News/>
        <Content/>
        <Ads/>
        <Event/>
        <ProgramPopuler/>
        <View style={[theme.h180]}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
