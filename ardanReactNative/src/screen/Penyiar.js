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
const Penyiar = ({navigation}) => {
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
      style={[theme.bgblack, {flexGrow: 1}, theme.pt80, theme.relative]}>
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
                theme.bgwhite,
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
                style={[theme.w160, theme.h160, theme.br12, theme.me10]}
              />
              <View>
                <Text style={[theme['h14-600']]}>{item.name}</Text>
                <Text style={[theme['h8-500']]}>{item.likes}</Text>
                <View style={[theme.fRow]}>
                  <TouchableOpacity
                    style={[theme.me10]}
                    onPress={() => {
                      goToUrl(item.instagram);
                    }}>
                    <Image
                      source={require('../assets/images/icons/ig.png')}
                      style={[theme.h20, theme.w20]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      goToUrl(item.twitter);
                    }}>
                    <Image
                      source={require('../assets/images/icons/twitter.png')}
                      style={[theme.h20, theme.w20]}
                    />
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
