import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioContext} from '../context/RadioContext';
const Program = ({navigation}) => {
  const radioState = useContext(RadioContext).state;
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState(null);
  const [programsItem, setProgramsItem] = useState({
    data: [],
    loading: false,
  });
  const getProgram = async (cat = null) => {
    setProgramsItem({
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
  useEffect(() => {
    getProgram();
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
          <TouchableOpacity
            onPress={() => {
              getProgram();
            }}>
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
              getProgram();
            }}
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      <ScrollView style={[theme.px20]} showsVerticalScrollIndicator={false}>
        <View style={[theme.fRow, theme.fjBetween, theme.wp100,{flexWrap:'wrap'}]}>
          {programsItem.loading ? (
            <View style={[theme.py50, theme.wp100, theme.faCenter]}>
              <ActivityIndicator size="large" color="#F8C303" />
            </View>
          ) : (
            programsItem.data.map((item, i) => {
              return (
                <TouchableOpacity
                  style={[
                    {backgroundColor: '#252525'},
                    theme.br14,
                    theme.mb15,
                    theme.wp48,
                  ]}
                  onPress={() => {
                    navigation.navigate('ProgramDetails', {
                      id: item.id,
                    });
                  }}
                  key={i}>
                  <Image
                    source={{uri: item.image_url}}
                    style={[
                      theme.wp100,
                      theme.h180,
                      theme.brtl12,
                      theme.brtr12,
                      theme.me10,
                    ]}
                  />
                  <View style={[theme.py8, theme.px12, theme.fjStart]}>
                    <View style={[theme.fRow, theme.fjBetween, theme.wp100]}>
                      <Text style={[theme['h8-400'], theme.cwhite, theme.wp50]}>
                        {Helper.hari(item.days)}
                      </Text>
                      <Text
                        style={[
                          theme['h8-400'],
                          theme.cyellow,
                          theme.tRight,
                          theme.wp50,
                        ]}>
                        {item.time}
                      </Text>
                    </View>
                    <Text style={[theme['h14-700'], theme.cwhite]}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
        <View style={[theme.mb200]} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Program;
