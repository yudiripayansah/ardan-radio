import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteAuth, RouteMain} from './config/Router';
import {ThemeContext} from './context/ThemeContext';
import {UserContext} from './context/UserContext';
import {AuthContext} from './context/AuthContext';
import Style from './config/Style';
import Splash from './screen/Splash';
import {useAuth} from './hook/useAuth';
const App = ({}) => {
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
            {() => (
              <UserContext.Provider value={state.user}>
                <RouteMain />
              </UserContext.Provider>
            )}
          </RootStack.Screen>
        );
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <ThemeContext.Provider value={Style}>
      <StatusBar barStyle={'dark-content'} />
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
    </ThemeContext.Provider>
  );
};

export default App;
