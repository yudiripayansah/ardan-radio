import React, {useState, useEffect, useContext} from 'react';
import {StatusBar} from 'react-native';
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
import Api from './config/Api'
const App = ({}) => {
  const {
    requestUserPermission,
  } = usePushNotification();
  const {auth, state} = useAuth()
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
                <RouteMain navigation={navigation}/>
              </UserContext.Provider>
            )}
          </RootStack.Screen>
        );
      }
    }
  };
  const linking = {
    prefixes: ['ardanmobileapps://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'Home'
        },
        BannerDetails: {
          path: 'BannerDetails/:id'
        },
        EventsDetails: {
          path: 'EventsDetails/:id'
        },
        MessageDetail: {
          path: 'MessageDetail/:id'
        },
        NewsDetails: {
          path: 'NewsDetails/:id'
        },
        NotificationsDetails: {
          path: 'NotificationsDetails/:id'
        },
        PenyiarDetails: {
          path: 'PenyiarDetails/:id'
        },
        ProgramDetails: {
          path: 'ProgramDetails/:id'
        },
        SocialSharingDetails: {
          path: 'SocialSharingDetails/:id'
        },
        SocialPostDetails: {
          path: 'SocialPostDetails/:id'
        }
      }
    }
  };
  useEffect(() => {
    const listenToNotifications = () => {
      try {
        requestUserPermission();
      } catch (error) {
        console.log(error);
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
