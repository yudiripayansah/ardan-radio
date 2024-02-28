import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Icons from '../components/Icons';
import Api from '../config/Api';
import Helper from '../config/Helper';
import {RadioContext} from '../context/RadioContext';
const Search = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const [keyword, setKeyword] = useState(route.params.keyword);
  const [newsItem, setNewsItem] = useState({
    data: [],
    loading: false,
  });
  const [eventsItem, setEventsItem] = useState({
    data: [],
    loading: false,
  });
  const [programsItem, setProgramsItem] = useState({
    data: [],
    loading: false,
  });
  const [penyiarItem, setPenyiarItem] = useState({
    data: [],
    loading: false,
  });
  const [postItem, setPostItem] = useState({
    data: [],
    loading: false,
  });
  const [sharingItem, setSharingItem] = useState({
    data: [],
    loading: false,
  });
  const doSearch = keyword => {
    setKeyword(keyword);
    getNews();
    getEvents();
    getPrograms();
    getPenyiar();
    getPost();
    getSharing();
  };
  const getNews = async () => {
    setNewsItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 10,
        sortDir: 'DESC',
        sortBy: 'id',
      };
      if (keyword) {
        payload.search = keyword;
      }
      let req = await Api.newsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setNewsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setNewsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getEvents = async () => {
    setEventsItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
      };
      if (keyword) {
        payload.search = keyword;
      }
      let req = await Api.eventsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setEventsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setEventsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getPrograms = async () => {
    setProgramsItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
      };

      if (keyword) {
        payload.search = keyword;
      }
      let req = await Api.programsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setProgramsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setProgramsItem({
        data: [],
        loading: false,
      });
    }
  };
  const getPenyiar = async () => {
    setPenyiarItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
      };

      if (keyword) {
        payload.search = keyword;
      }
      let req = await Api.penyiarRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setPenyiarItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setPenyiarItem({
        data: [],
        loading: false,
      });
    }
  };
  const getSharing = async () => {
    setSharingItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
        type: 'SHARING',
        status: 'PUBLISHED'
      };

      if (keyword) {
        payload.search = keyword;
      }
      let req = await Api.feedsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setSharingItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setSharingItem({
        data: [],
        loading: false,
      });
    }
  };
  const getPost = async () => {
    setPostItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 5,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
        type: 'POST',
        status: 'PUBLISHED'
      };

      if (keyword) {
        payload.search = keyword;
      }
      let req = await Api.feedsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setPostItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setPostItem({
        data: [],
        loading: false,
      });
    }
  };
  const Result = type => {
    let prop = {
      details: 'NewsDetails',
      title: 'News',
      all: 'News',
      listData: newsItem,
    };
    switch (type) {
      case 'event':
        prop = {
          details: 'EventsDetails',
          title: 'Events',
          all: 'Event',
          listData: eventsItem,
        };
        break;
      case 'program':
        prop = {
          details: 'ProgramDetails',
          title: 'Program',
          all: 'Program',
          listData: programsItem,
        };
        break;
      case 'penyiar':
        prop = {
          details: 'PenyiarDetails',
          title: 'Penyiar',
          all: 'Penyiar',
          listData: penyiarItem,
        };
        break;
      case 'post':
        prop = {
          details: 'SocialPostDetails',
          title: 'Post',
          all: 'Social',
          listData: postItem,
        };
        break;
      case 'sharing':
        prop = {
          details: 'SocialSharingDetails',
          title: 'Sharing',
          all: 'Social',
          listData: sharingItem,
        };
        break;
    }
    return (
      <View style={[theme.mt35]}>
        <View style={[theme.fRow, theme.fjBetween, theme.faCenter, theme.px20]}>
          <Text style={[theme['h16-600'], theme.cwhite]}>{prop.title}</Text>
          <TouchableOpacity
            style={[
              theme.bgblack_chocolate,
              theme.fjCenter,
              theme.px10,
              theme.br40,
            ]}
            onPress={() => {
              (type == 'post' || type == 'sharing') ?
              navigation.navigate(prop.all,{activeTab:prop.title}) : navigation.navigate(prop.all) 
            }}>
            <Image source={Icons.chevronRight} style={[{height:20,width:20,objectFit:'contain'}]}/>
          </TouchableOpacity>
        </View>
        {prop.listData.loading ? (
          <View style={[theme.py50]}>
            <ActivityIndicator size="large" color="#F8C303" />
          </View>
        ) : prop.listData.data.length > 0 ? (
          <ScrollView
            horizontal
            style={[
              theme.wp100,
              {flexGrow: 1},
              theme.fRow,
              theme.px20,
              theme.mt20,
            ]}
            showsHorizontalScrollIndicator={false}>
            {prop.listData.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    theme.me15,
                    theme.w230,
                    theme.br24,
                    {backgroundColor: '#F8C303'},
                  ]}
                  key={i}
                  onPress={() => {
                    navigation.navigate(prop.details, {
                      id: item.id,
                    });
                  }}>
                  <Image
                    source={(item.image_url) ? {uri: item.image_url} : require('../assets/images/logo-ardan.png')}
                    style={[
                      theme.wp100,
                      theme.h170,
                      theme.brtl24,
                      theme.brtr24,
                      {objectFit: 'contain'},
                    ]}
                  />
                  <View style={[theme.p10]}>
                    {(type != 'program' && type != 'penyiar') ? (
                      <Text style={[theme['h10-400'], {color: '#000'}]}>
                        {Helper.dateIndo(item.created_at)}
                      </Text>
                    ) : null}
                    <Text style={[theme['h16-500'], {color: '#000'}]}>
                      {(type != 'penyiar') ? item.title: item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={[theme.pt30, theme.px20]}>
            <Text style={[theme['p16-700'], theme.cyellow]}>No result</Text>
          </View>
        )}
      </View>
    );
  };
  useEffect(() => {
    doSearch(route.params.keyword);
  }, []);
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt150 : theme.pt80, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.px20]}>
          <View
            style={[
              theme.fRow,
              theme.faCenter,
              {backgroundColor: '#12120B'},
              theme.br12,
              theme.px15,
              theme.wp100,
            ]}>
            <TextInput
              placeholder="Search..."
              style={[theme.cwhite, theme['p14-400'], theme.wp75, theme.h40]}
              placeholderTextColor="#fff"
              onSubmitEditing={e => {
                doSearch(e.nativeEvent.text);
              }}
              onChangeText={setKeyword}
              value={keyword}
              clearButtonMode="while-editing"
            />
          </View>
        </View>
        {Result('news')}
        {Result('event')}
        {Result('post')}
        {Result('sharing')}
        {Result('program')}
        {Result('penyiar')}
        <View style={[theme.h100]} />
      </ScrollView>
      <Navigation navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default Search;
