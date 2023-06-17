
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Collections from '../screen/Collections';
import Event from '../screen/Event';
import Feed from '../screen/Feed';
import Forgot from '../screen/Forgot';
import Home from '../screen/Home';
import Intro from '../screen/Intro';
import LiveStreaming from '../screen/LiveStreaming';
import Login from '../screen/Login';
import Music from '../screen/Music';
import News from '../screen/News';
import NewsDetails from '../screen/NewsDetails';
import Notifications from '../screen/Notifications';
import Radio from '../screen/Radio';
import Register from '../screen/Register';
import Search from '../screen/Search';
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const options = {
    ...TransitionPresets.SlideFromRightIOS,
}
export function RouteMain(){
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <MainStack.Screen name={'Home'} component={Home} />
            <MainStack.Screen name={'Collections'} component={Collections} />
            <MainStack.Screen name={'Event'} component={Event} />
            <MainStack.Screen name={'Feed'} component={Feed} />
            <MainStack.Screen name={'LiveStreaming'} component={LiveStreaming} />
            <MainStack.Screen name={'Music'} component={Music} />
            <MainStack.Screen name={'News'} component={News} />
            <MainStack.Screen name={'NewsDetails'} component={NewsDetails} />
            <MainStack.Screen name={'Notifications'} component={Notifications} />
            <MainStack.Screen name={'Radio'} component={Radio} />
            <MainStack.Screen name={'Search'} component={Search} />
        </MainStack.Navigator>
    );
}
export const RouteAuth = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen name={'Home'} component={Home} options={options}/>
            <AuthStack.Screen name={'Intro'} component={Intro} options={options}/>
            <AuthStack.Screen name={'Login'} component={Login} options={options}/>
            <AuthStack.Screen name={'Register'} component={Register} options={options}/>
            <AuthStack.Screen name={'Forgot'} component={Forgot} options={options}/>
        </AuthStack.Navigator>
    );
}