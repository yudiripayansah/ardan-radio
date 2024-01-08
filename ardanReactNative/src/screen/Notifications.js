import React, {useEffect, useContext, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
const Notifications = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const sample = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const [notificationsUnreadItem, setNotificationsUnreadItem] = useState({
    data: [],
    loading: false,
  });
  const [notificationsReadItem, setNotificationsReadItem] = useState({
    data: [],
    loading: false,
  });
  const getNotificationUnread = async () => {
    setNotificationsUnreadItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: '10',
        sortDir: 'DESC',
        sortBy: 'id',
        id_user: user.id,
        status: 'UNREAD'
      };
      let req = await Api.notificationsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setNotificationsUnreadItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setNotificationsUnreadItem({
        data: [],
        loading: false,
      });
    }
  };
  const getNotificationRead = async () => {
    setNotificationsReadItem({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: '10',
        sortDir: 'DESC',
        sortBy: 'id',
        id_user: user.id,
        status: 'READ'
      };
      let req = await Api.notificationsRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
        console.log(theData);
      }
      setNotificationsReadItem({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setNotificationsReadItem({
        data: [],
        loading: false,
      });
    }
  };
  useEffect(() => {
    getNotificationUnread()
    getNotificationRead()
  }, []);

  return (
    <SafeAreaView
      style={[
        theme.bgblack,
        {flexGrow: 1},
        theme.relative,
        {zIndex: 2},
      ]}>
      <ScrollView style={[theme.mb70,theme.mt60]}>
        {((notificationsUnreadItem.data.length > 0)) && (
          <View style={[theme.py10,theme.px25,theme.bbw1,theme.bsolid,theme.byellow,theme.fRow,theme.fjBetween]}>
            <Text style={[theme['h14-400'],theme.cyellow]}>
              {(notificationsUnreadItem.data.length > 0) && `Unread Notifications (${notificationsUnreadItem.data.length})`}
            </Text>
            <TouchableOpacity>
              <Text style={[theme['h14-700'],theme.cyellow]}>Mark all as Read</Text>
            </TouchableOpacity>
          </View>
        )}
        {
          notificationsUnreadItem.data.map((item) => {
            return (
              <TouchableOpacity style={[theme.fRow,theme.faStart,theme.fjBetween,theme.bbw1,theme.bsolid,theme.py10,theme.px25,{borderColor:'#101010'}]}>
                <View>
                  <Text style={[theme['h16-700'],theme.cyellow]}>{item.title}</Text>
                  <Text style={[theme['p12-400'],theme.cwhite]}>{item.text}</Text>
                </View>
                <View>
                  <Text style={[theme['p10-400'],theme.cwhite]}>{Helper.dateTimeIndo(item.created_at)}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        {
          notificationsReadItem.data.map((item) => {
            return (
              <TouchableOpacity style={[theme.fRow,theme.faStart,theme.fjBetween,theme.bbw1,theme.bsolid,theme.py10,theme.px25,{borderColor:'#101010'}]}>
                <View>
                  <Text style={[theme['h16-700'],theme.cwhite]}>{item.title}</Text>
                  <Text style={[theme['p12-400'],theme.cwhite]}>{item.text}</Text>
                </View>
                <View>
                <Text style={[theme['p10-400'],theme.cwhite]}>{Helper.dateTimeIndo(item.created_at)}</Text>
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
