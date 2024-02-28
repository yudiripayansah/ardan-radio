import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import {RadioContext} from '../context/RadioContext';
const News = ({navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState(null);
  const [eventsItem, setEventsItem] = useState({
    data: [],
    loading: false,
  });
  const [category, setCategory] = useState({
    data: [],
    loading: false,
  });
  const [activeCat, setActiveCat] = useState('All');
  const getCategory = async () => {
    setCategory({
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
        search: null,
        type: 'Events',
      };
      let req = await Api.categoryRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setCategory({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error('Get Category Events',error);
      setCategory({
        data: [],
        loading: false,
      });
    }
  };
  const getEvents = async (cat = null) => {
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
      if (search) {
        payload.search = search;
      }
      if (cat) {
        payload.category = cat;
        setActiveCat(cat);
      } else {
        setActiveCat('All');
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
      console.error('Get Events',error);
      setEventsItem({
        data: [],
        loading: false,
      });
    }
  };
  useEffect(() => {
    getEvents();
    getCategory();
  }, []);
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt120 : theme.pt60, theme.relative]}>
      <View style={[theme.px20]}>
        <View
          style={[
            theme.fRow,
            theme.faCenter,
            {backgroundColor: '#12120B'},
            theme.my25,
            theme.br12,
            theme.px15,
            {flexWrap:'nowrap'}
          ]}>
          <TouchableOpacity onPress={()=>{getEvents()}}>
            <Image
              source={require('../assets/images/icons/search.png')}
              style={[theme.me5, theme.w25, theme.h25]}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search..."
            style={[theme.cwhite, theme['p14-400'], theme.wp75]}
            placeholderTextColor="#fff"
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={() => {
              getEvents();
            }}
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[theme.px20]}>
        <TouchableOpacity
          style={[
            theme.me15,
            theme.faCenter,
            theme.px20,
            theme.h30,
            theme.mb10,
            activeCat == 'All'
              ? {backgroundColor: '#252525'}
              : {backgroundColor: '#ED2929'},
            theme.br8,
            theme.pt2,
          ]}
          onPress={() => {
            getEvents();
          }}>
          <Text style={[theme['p10-500'], theme.cwhite, theme.mt5]}>All</Text>
        </TouchableOpacity>
        {category.data.map((item, i) => {
          return (
            <TouchableOpacity
              style={[
                theme.me15,
                theme.faCenter,
                theme.px20,
                theme.h30,
                theme.mb10,
                item.title == activeCat
                  ? {backgroundColor: '#252525'}
                  : {backgroundColor: '#ED2929'},
                theme.br8,
                theme.pt2,
              ]}
              key={i}
              onPress={() => {
                getEvents(item.title);
              }}>
              <Text style={[theme['p10-500'], theme.cwhite, theme.mt5]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView style={[theme.mb150, theme.mt20]}>
        <View style={[theme.fRow, theme.px20, theme.fjBetween]}>
          {eventsItem.data.map((item, i) => {
            return (
              <TouchableOpacity
                style={[
                  theme.wp48,
                  theme.br24,
                  theme.mb20,
                  {backgroundColor: '#252525'},
                ]}
                key={i}
                onPress={() => {
                  navigation.navigate('EventsDetails', {
                    id: item.id,
                  });
                }}>
                <Image
                  source={{uri: item.image_url}}
                  style={[
                    theme.wp100,
                    theme.h120,
                    theme.brtl24,
                    theme.brtr24,
                    {objectFit: 'cover'},
                  ]}
                />
                <View style={[theme.p10]}>
                  <Text style={[theme['h14-700'], theme.cwhite]}>
                    {item.title}
                  </Text>
                  <Text style={[theme['h10-400'], theme.cwhite]}>
                    {Helper.dateIndo(item.created_at)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={[theme.mb150]} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default News;
