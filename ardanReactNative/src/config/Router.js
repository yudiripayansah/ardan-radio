import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useState} from 'react';
import ArdanContent from '../screen/ArdanContent';
import BannerDetails from '../screen/BannerDetails';
import CreateFeed from '../screen/CreateFeed';
import Event from '../screen/Event';
import EventsDetails from '../screen/EventsDetails';
import Feed from '../screen/Feed';
import Forgot from '../screen/Forgot';
import CheckOtp from '../screen/CheckOtp';
import UpdatePassword from '../screen/UpdatePassword';
import Home from '../screen/Home';
import Intro from '../screen/Intro';
import LiveStreaming from '../screen/LiveStreaming';
import Login from '../screen/Login';
import ListUser from '../screen/ListUser';
import Music from '../screen/Music';
import Message from '../screen/Message';
import MessageDetail from '../screen/MessageDetail';
import News from '../screen/News';
import NewsDetails from '../screen/NewsDetails';
import Notifications from '../screen/Notifications';
import NotificationsDetails from '../screen/NotificationsDetails';
import Profile from '../screen/Profile';
import ProfileUpdate from '../screen/ProfileUpdate';
import Penyiar from '../screen/Penyiar';
import PenyiarDetails from '../screen/PenyiarDetails';
import Program from '../screen/Program';
import ProgramDetails from '../screen/ProgramDetails';
import Radio from '../screen/Radio';
import RadioDetails from '../screen/RadioDetails';
import Register from '../screen/Register';
import Search from '../screen/Search';
import Social from '../screen/Social';
import SocialSharingDetails from '../screen/SocialSharingDetails';
import SocialPostDetails from '../screen/SocialPostDetails';
import Nav from '../components/Navigation';
import Header from '../components/Header';
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const options = {
  ...TransitionPresets.SlideFromRightIOS,
};
export const RouteMain = ({navigation}) => {
  let [activeHeader, setActiveHeader] = useState('Home');
  return (
    <>
      {activeHeader != 'MessageDetail' ? (
        <Header navigation={navigation} currentScreen={activeHeader} />
      ) : null}
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        screenListeners={({navigation}) => ({
          state: e => {
            let index = e.data.state.index;
            let routes = e.data.state.routes;
            let routeName = routes[index].name;
            if (routeName == 'Radio' || routeName == 'RadioDetails') {
              routeName = 'Ardan Radio';
            }
            if (routeName == 'ProfileUpdate') {
              routeName = 'Profile Update';
            }
            if (routeName == 'Penyiar') {
              routeName = 'Ardan Announcher';
            }
            if (routeName == 'PenyiarDetails') {
              routeName = 'Ardan Announcher';
            }
            if (routeName == 'ProgramDetails') {
              routeName = 'Program';
            }
            if (routeName == 'ArdanContent') {
              routeName = 'Ardan Content';
            }
            if (routeName == 'Social') {
              routeName = 'Ardan Social';
            }
            if (routeName == 'SocialSharingDetails') {
              routeName = 'Forum';
            }
            if (routeName == 'SocialPostDetails') {
              routeName = 'Post';
            }
            if (routeName == 'BannerDetails') {
              routeName = 'Ads';
            }
            if (routeName == 'NewsDetails') {
              routeName = 'News';
            }
            if (routeName == 'EventsDetails') {
              routeName = 'Event';
            }
            if (routeName == 'NotificationsDetails') {
              routeName = 'Notification';
            }
            if (routeName == 'CreateFeed') {
              routeName = 'Create New';
            }
            if (routeName == 'MyProfile') {
              routeName = 'My Profile';
            }
            setActiveHeader(routeName);
          },
        })}
        initialRouteName='Home'>
        <MainStack.Screen name='Home' component={Home} options={options} />
        <MainStack.Screen
          name={'ArdanContent'}
          component={ArdanContent}
          options={options}
        />
        <MainStack.Screen
          name={'BannerDetails'}
          component={BannerDetails}
          options={options}
        />
        <MainStack.Screen
          name={'CreateFeed'}
          component={CreateFeed}
          options={options}
        />
        <MainStack.Screen name={'Event'} component={Event} options={options} />
        <MainStack.Screen
          name='EventsDetails'
          component={EventsDetails}
          options={options}
        />
        <MainStack.Screen name={'Feed'} component={Feed} options={options} />
        <MainStack.Screen
          name={'LiveStreaming'}
          component={LiveStreaming}
          options={options}
        />
        <MainStack.Screen
          name={'Followers'}
          component={ListUser}
          options={options}
        />
        <MainStack.Screen
          name={'Following'}
          component={ListUser}
          options={options}
        />
        <MainStack.Screen name={'Music'} component={Music} options={options} />
        <MainStack.Screen
          name={'Message'}
          component={Message}
          options={options}
        />
        <MainStack.Screen
          name={'MessageDetail'}
          component={MessageDetail}
          options={options}
        />
        <MainStack.Screen name={'News'} component={News} options={options} />
        <MainStack.Screen
          name={'NewsDetails'}
          component={NewsDetails}
          options={options}
        />
        <MainStack.Screen
          name={'Notifications'}
          component={Notifications}
          options={options}
        />
        <MainStack.Screen
          name={'NotificationsDetails'}
          component={NotificationsDetails}
          options={options}
        />
        <MainStack.Screen
          name={'Profile'}
          component={Profile}
          options={options}
        />
        <MainStack.Screen
          name={'MyProfile'}
          component={Profile}
          options={options}
        />
        <MainStack.Screen
          name={'ProfileUpdate'}
          component={ProfileUpdate}
          options={options}
        />
        <MainStack.Screen
          name={'Penyiar'}
          component={Penyiar}
          options={options}
        />
        <MainStack.Screen
          name={'PenyiarDetails'}
          component={PenyiarDetails}
          options={options}
        />
        <MainStack.Screen
          name={'Program'}
          component={Program}
          options={options}
        />
        <MainStack.Screen
          name={'ProgramDetails'}
          component={ProgramDetails}
          options={options}
        />
        <MainStack.Screen name={'Radio'} component={Radio} options={options} />
        <MainStack.Screen
          name={'RadioDetails'}
          component={RadioDetails}
          options={options}
        />
        <MainStack.Screen
          name={'Search'}
          component={Search}
          options={options}
        />
        <MainStack.Screen
          name={'Social'}
          component={Social}
          options={options}
        />
        <MainStack.Screen
          name={'SocialSharingDetails'}
          component={SocialSharingDetails}
          options={options}
        />
        <MainStack.Screen
          name={'SocialPostDetails'}
          component={SocialPostDetails}
          options={options}
        />
      </MainStack.Navigator>
      {activeHeader != 'LiveStreaming' && activeHeader != 'MessageDetail' ? (
        <Nav navigation={navigation} currentScreen={activeHeader} />
      ) : null}
    </>
  );
};
export const RouteAuth = ({navigation}) => {
  return (
    <>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name={'Intro'} component={Intro} options={options} />
        <AuthStack.Screen name={'Login'} component={Login} options={options} />
        <AuthStack.Screen
          name={'Register'}
          component={Register}
          options={options}
        />
        <AuthStack.Screen
          name={'Forgot'}
          component={Forgot}
          options={options}
        />
        <AuthStack.Screen
          name={'CheckOtp'}
          component={CheckOtp}
          options={options}
        />
        <AuthStack.Screen
          name={'UpdatePassword'}
          component={UpdatePassword}
          options={options}
        />
      </AuthStack.Navigator>
    </>
  );
};
