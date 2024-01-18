import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import {RadioContext} from '../context/RadioContext';
const Penyiar = ({navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState(null);
  const penyiarList = [];
  const [penyiarsItem, setPenyiarsItem] = useState({
    data: [],
    loading: false,
  });
  const getPenyiar = async (cat = null) => {
    setPenyiarsItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: '~',
        sortDir: 'DESC',
        sortBy: 'id',
      };
      if (search) {
        payload.search = search;
      }
      let req = await Api.penyiarRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
        console.log(theData);
      }
      setPenyiarsItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setPenyiarsItem({
        data: [],
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
      style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt140 : theme.pt80, theme.relative]}>
      <View style={[theme.px20, theme.mb5]}>
        <View
          style={[
            theme.br14,
            {backgroundColor: '#2B2B16'},
            theme.px10,
            theme.pt5,
          ]}>
          <TextInput
            placeholder="Search Announchers"
            style={[theme.cwhite, theme['h12-500']]}
            placeholderTextColor="#fff"
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={() => {
              getPenyiar();
            }}
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      <ScrollView style={[theme.px20,theme.pt20]}>
        {penyiarsItem.data.map((item, i) => {
          return (
            <TouchableOpacity
              style={[
                {backgroundColor:'#252d3a'},
                theme.br14,
                theme.p12,
                theme.fRow,
                theme.mb15,
              ]}
              onPress={() => {
                navigation.navigate('PenyiarDetails', {
                  id: item.id,
                });
              }}
              key={i}
              >
              <Image
                source={{uri: item.image_url}}
                style={[theme.wp50, theme.h160, theme.br12]}
              />
              <View style={[theme.wp50,theme.px10]}>
                <Text style={[theme['h14-600'],theme.cwhite]}>{item.name}</Text>
                <Text style={[theme['h8-500']]}>{item.likes}</Text>
                <View style={[]}>
                  <TouchableOpacity
                    style={[theme.mb10,theme.fRow]}
                    onPress={() => {
                      goToUrl('https://instagram.com/'+item.instagram);
                    }}>
                    <Image
                      source={require('../assets/images/icons/ig.png')}
                      style={[theme.h20, theme.w20]}
                    />
                    <Text style={[theme['p14-400'],theme.cwhite,theme.ms10]}>{item.instagram}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[theme.mb10,theme.fRow]}
                    onPress={() => {
                      goToUrl('https://instagram.com/'+item.twitter);
                    }}>
                    <Image
                      source={require('../assets/images/icons/twitter.png')}
                      style={[theme.h20, theme.w20]}
                    />
                    <Text style={[theme['p14-400'],theme.cwhite,theme.ms10]}>{item.twitter}</Text>
                  </TouchableOpacity>
                </View>
                <View style={[theme.fjCenter,theme.faCenter,theme.wp100,theme.mtAuto]}>
                  <TouchableOpacity style={[theme.px10,theme.py5,theme.bgyellow,theme.br5]}>
                    <Text style={[theme['p12-700'],theme.cblack]}>Follow</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={[theme.mb150]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Penyiar;
