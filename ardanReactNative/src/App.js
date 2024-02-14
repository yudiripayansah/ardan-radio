import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteAuth, RouteMain} from './config/Router';
import {ThemeContext} from './context/ThemeContext';
import {UserContext} from './context/UserContext';
import {AuthContext} from './context/AuthContext';
import {RadioContext} from './context/RadioContext';
import Style from './config/Style';
import Splash from './screen/Splash';
import {useAuth} from './hook/useAuth';
import {useRadio} from './hook/useRadio';
import usePushNotification from './hook/usePushNotification';
import Api from './config/Api';
import DeepLinking from 'react-native-deep-linking';
const App = ({}) => {
  const {requestUserPermission} = usePushNotification();
  const {auth, state} = useAuth();
  const RootStack = createStackNavigator();
  const [loading, setLoading] = useState(true);
  const renderRoute = () => {
    if (loading) {
      return <RootStack.Screen name={'SplashScreen'} component={Splash} />;
    } else {
      if (!state.user) {
        return <RootStack.Screen name={'RouteAuth'} component={RouteAuth} />;
      } else {
        return (
          <RootStack.Screen name={'RouteMain'}>
            {({navigation}) => (
              <UserContext.Provider value={state.user}>
                <RouteMain navigation={navigation} />
              </UserContext.Provider>
            )}
          </RootStack.Screen>
        );
      }
    }
  };
  const initDeepLinking = () => {
    DeepLinking.addScheme('mobileappsardanradio://');
    DeepLinking.addRoute('/app', (response) => {
      // console.log('Deep link response:', response);
    });
    Linking.addEventListener('url', handleUrl);
  }
  const handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }
  useEffect(() => {
    initDeepLinking()
    const listenToNotifications = () => {
      try {
        requestUserPermission();
      } catch (error) {
        console.error(error);
      }
    };

    listenToNotifications();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <ThemeContext.Provider value={Style}>
      <StatusBar barStyle={'dark-content'} />
      <RadioContext.Provider value={useRadio()}>
        <AuthContext.Provider value={auth}>
          <NavigationContainer>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: true,
              }}>
              {renderRoute()}
            </RootStack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </RadioContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
