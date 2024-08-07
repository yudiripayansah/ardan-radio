import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import Api from '../config/Api';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
const Login = ({navigation}) => {
  const webClientId =
    '543317221813-25in70mlr40laf569025fedv79n908n8.apps.googleusercontent.com';
  const theme = useContext(ThemeContext);
  const {setUser} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [sPassword, setSpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Login',
      screen_class: 'Login',
    });
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    });
    gAnalytics();
  }, []);
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const doLogin = async () => {
    setLoading(true);
    try {
      let payload = {
        email: email,
        password: password,
      };
      console.log(payload);
      if (email && password) {
        if (validateEmail(email)) {
          let req = await Api.login(payload);
          if (req.status == 200) {
            let {data, status, msg} = req.data;
            if (status) {
              setUser(data);
            } else {
              setLogin(req.data);
            }
          } else {
            setLogin({
              status: false,
              msg: 'Failed to login',
              data: null,
            });
          }
        } else {
          setLogin({
            status: false,
            msg: 'Please enter valid email',
            data: null,
          });
        }
      } else {
        setLogin({
          status: false,
          msg: 'Please enter email and password',
          data: null,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const guest = () => {
    let data = {
      username: 'guest',
      email: 'guest@ardanradio.com',
      name: 'Guest',
      phone: '-',
      address: '-',
      gender: '-',
      image: '-',
      role: 'guest',
      dob: '-',
    };
    setUser(data);
  };
  const makeid = length => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userData = await GoogleSignin.signIn();
      let payload = {
        id: null,
        username: userData.user.name + makeid(10),
        email: userData.user.email,
        name: userData.user.name,
        password: null,
        phone: null,
        image: null,
        address: null,
        gender: null,
        dob: null,
        role: 'member',
        status: 'active',
      };
      console.log(payload);
      let req = await Api.loginOrRegister(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        console.log(data);
        if (status) {
          setUser(data);
        } else {
          setLogin({
            status: false,
            msg: 'Failed to login - Server Error',
            data: null,
          });
        }
      } else {
        setLogin({
          status: false,
          msg: 'Failed to login - Connection Error',
          data: null,
        });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLogin({
          status: false,
          msg: 'Sign In Canceled',
          data: null,
        });
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setLogin({
          status: false,
          msg: 'Sign In Inprogress',
          data: null,
        });
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setLogin({
          status: false,
          msg: 'Play services not available',
          data: null,
        });
        console.log(error);
      } else {
        setLogin({
          status: false,
          msg: 'Sign In by google failed',
          data: null,
        });
        console.log(error);
      }
    }
  };
  const facebookLogin = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const token = data?.accessToken;
      const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${token}`);
      const resFb = await response.json();

      // Sign-in the user with the credential
      const fbData = await auth().signInWithCredential(facebookCredential);
      console.log(fbData);
      let payload = {
        id: null,
        username: fbData.user.displayName + makeid(10),
        email: fbData.user.email,
        name: fbData.user.displayName,
        password: null,
        phone: null,
        image: null,
        address: null,
        gender: null,
        dob: null,
        fbid: fbData.additionalUserInfo.profile.id,
        role: 'member',
        status: 'active',
      };
      let req = await Api.loginOrRegister(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          setUser(data);
        } else {
          setLogin({
            status: false,
            msg: 'Failed to login - Server Error',
            data: null,
          });
        }
      } else {
        setLogin({
          status: false,
          msg: 'Failed to login - Connection Error',
          data: null,
        });
      }
    } catch (error) {
        setLogin({
          status: false,
          msg: 'Sign In by facebook failed',
          data: null,
        });
        console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={[
        theme.wp100,
        theme.hp100,
        {backgroundColor: '#090903'},
        theme.fjStart,
        theme.px20,
        theme.py20,
        {flexGrow: 1},
      ]}>
      <View style={[theme.faCenter]}>
        <Image
          style={[theme.w135, theme.h78, {objectFit: 'contain'}]}
          source={require('../assets/images/logo-ardan.png')}
        />
      </View>
      <View style={[theme.wp100, theme.mt50]}>
        <Text style={[theme.cwhite, theme['p24-500'], theme.tCenter]}>
          SIGN IN
        </Text>
        <Text style={[theme.cblue_grey, theme['p14-500'], theme.tCenter]}>
          Please enter your account here
        </Text>
        <View
          style={[
            theme.bgwhite,
            theme.px20,
            theme.ps50,
            theme.wp100,
            theme.mt20,
            theme.br12,
          ]}>
          <Image
            style={[
              theme.w20,
              theme.h20,
              theme.absolute,
              theme.left20,
              theme.top15,
              {objectFit: 'contain'},
            ]}
            source={require('../assets/images/icons/envelope.png')}
          />
          <TextInput
            style={[theme.p0, theme['p13-500'], theme.cblack]}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor={'#000'}
          />
        </View>
        <View
          style={[
            theme.bgwhite,
            theme.px50,
            theme.wp100,
            theme.mt15,
            theme.br12,
          ]}>
          <Image
            style={[
              theme.w20,
              theme.h20,
              theme.absolute,
              theme.left20,
              theme.top15,
              {objectFit: 'contain'},
            ]}
            source={require('../assets/images/icons/lock.png')}
          />
          <TextInput
            style={[theme.p0, theme['p13-500'], theme.cblack]}
            placeholder="Password"
            secureTextEntry={sPassword}
            onChangeText={setPassword}
            value={password}
            placeholderTextColor={'#000'}
          />
          <TouchableOpacity
            onPress={() => {
              setSpassword(!sPassword);
            }}
            style={[theme.absolute, theme.right20, theme.top15]}>
            <Icon
              name={sPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        <View style={[theme.fRow, theme.mt5, theme.fjBetween]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={[theme.cindian_red, theme['p14-500']]}>Daftar?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot');
            }}>
            <Text style={[theme.cindian_red, theme['p14-500']]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            theme.bgyellow,
            theme.faCenter,
            theme.py15,
            theme.br52,
            theme.mt20,
          ]}
          onPress={() => {
            doLogin();
          }}
          disabled={loading ? true : false}>
          <Text style={[theme['p14-500'], theme.cblack]}>
            {loading ? 'Processing...' : 'Login'}
          </Text>
        </TouchableOpacity>
        {!login.status ? (
          <Text
            style={[
              theme.cindian_red,
              theme['p10-400'],
              theme.tCenter,
              theme.pt5,
            ]}>
            {login.msg}
          </Text>
        ) : null}
        <View style={[theme.relative, theme.mt15, theme.faCenter]}>
          <View
            style={[
              theme.h1,
              theme.bgwhite,
              theme.absolute,
              theme.left0,
              theme.right0,
              theme.top10,
            ]}></View>
          <Text
            style={[
              {backgroundColor: '#090903'},
              theme.cyellow_bold,
              theme['p14-500'],
              theme.px5,
            ]}>
            Or Login with
          </Text>
        </View>
        <View style={[theme.fRow, theme.fjCenter, theme.mt15]}>
          <TouchableOpacity
            style={[
              theme.w80,
              theme.bwhite,
              theme.bSolid,
              theme.bw1,
              theme.faCenter,
              theme.py5,
              theme.br10,
              theme.mx5,
            ]}
            onPress={googleLogin}>
            <Image source={require('../assets/images/icons/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              theme.w80,
              theme.bwhite,
              theme.bSolid,
              theme.bw1,
              theme.faCenter,
              theme.py5,
              theme.br10,
              theme.mx5,
            ]}>
            <Image source={require('../assets/images/icons/apple.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              theme.w80,
              theme.bwhite,
              theme.bSolid,
              theme.bw1,
              theme.faCenter,
              theme.py5,
              theme.br10,
              theme.mx5,
            ]}
            onPress={facebookLogin}>
            <Image source={require('../assets/images/icons/facebook.png')} />
          </TouchableOpacity>
        </View>
        <View style={[theme.relative, theme.mt30, theme.faCenter]}>
          <TouchableOpacity
            style={[theme.fRow]}
            onPress={() => {
              guest();
            }}>
            <Text style={[theme.cwhite, theme['p15-500'], theme.me5]}>
              Atau masuk sebagai tamu !
            </Text>
            <Text style={[theme.cyellow_bold, theme['p15-500']]}>Lewati</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
