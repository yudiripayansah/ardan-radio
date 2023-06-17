import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Navigation from '../components/Navigation';
const Home = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const doLogout = () => {
    removeUser();
  };
  useEffect(() => {
    let mounted = true;
    navigation.addListener('focus', () => {
      if (mounted) {
        
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <SafeAreaView style={[theme.bgPrimary, theme.container]}>
      <ScrollView>
        {/* User Info */}
        <View style={[theme.alignCenter, theme.py3]}>
          <Text style={[theme.textWhite]}>Hello</Text>
          <Text style={[theme.textH2, theme.textWhite]}>{user.name}</Text>
          <TouchableOpacity
            style={[theme.mt2]}
            onPress={() => {
              doLogout();
            }}>
            <Text style={[theme.textH3, theme.textWhite]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Navigation navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
