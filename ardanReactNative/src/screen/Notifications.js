import React, {useEffect, useContext} from 'react';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Navigation from '../components/Navigation';
const Notifications = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const sample = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={[
        theme.bgblack,
        {flexGrow: 1},
        theme.relative,
        {zIndex: 2},
      ]}>
      <ScrollView style={[theme.mb70,theme.mt60]}>
        <View style={[theme.py10,theme.px25,theme.bbw1,theme.bsolid,theme.byellow,theme.fRow,theme.fjBetween]}>
          <Text style={[theme['h14-400'],theme.cyellow]}>Unread Notification(10)</Text>
          <TouchableOpacity>
            <Text style={[theme['h14-700'],theme.cyellow]}>Mark all as Read</Text>
          </TouchableOpacity>
        </View>
        {
          sample.map(() => {
            return (
              <TouchableOpacity style={[theme.fRow,theme.faStart,theme.fjBetween,theme.bbw1,theme.bsolid,theme.py10,theme.px25,{borderColor:'#101010'}]}>
                <View>
                  <Text style={[theme['h16-700'],theme.cyellow]}>Title</Text>
                  <Text style={[theme['p12-400'],theme.cwhite]}>Lorem ipsum dolor is amet </Text>
                </View>
                <View>
                  <Text>12 Agustus 2023 18:34</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        {
          sample.map(() => {
            return (
              <TouchableOpacity style={[theme.fRow,theme.faStart,theme.fjBetween,theme.bbw1,theme.bsolid,theme.py10,theme.px25,{borderColor:'#101010'}]}>
                <View>
                  <Text style={[theme['h16-700'],theme.cwhite]}>Title</Text>
                  <Text style={[theme['p12-400'],theme.cwhite]}>Lorem ipsum dolor is amet </Text>
                </View>
                <View>
                  <Text>12 Agustus 2023 18:34</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
