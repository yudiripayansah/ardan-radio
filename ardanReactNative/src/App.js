import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, Linking, AppState} from 'react-native';
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
  const [appState, setAppState] = useState(AppState.currentState);
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
  const linking = {
    prefixes: ['https://ardanmobileapps.ardangroup.fm','ardanmobileapps://']
  }
  const handleDeepLink = ({ url }) => {
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[1];
    if (routeName === 'profile') {
      // Navigate to ProfileScreen
      // Example: navigation.navigate('Profile')
    }
  };
  const getUrlAsync = async () => {
    // Get the deep link used to open the app
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl !== null) {
      handleDeepLink(initialUrl)
      return;
    }
    console.warn(initialUrl)
    if(initialUrl.includes('post')) {

    }
  };
  useEffect(() => {
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
    getUrlAsync();
    Linking.addEventListener('url', handleDeepLink);
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        // Logic for when the application is opened or maximized
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background or minimized!');
        // Logic for when the application is backgrounded or minimized
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      
    };
  }, [appState]);

  return (
    <ThemeContext.Provider value={Style}>
      <StatusBar barStyle={'dark-content'} />
      <RadioContext.Provider value={useRadio()}>
        <AuthContext.Provider value={auth}>
          <NavigationContainer linking={linking}>
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
