import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import YoutubePlayer from 'react-native-youtube-iframe';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Echo from 'laravel-echo';
import io from 'socket.io-client';
import axios from 'axios';
import Api from '../config/Api';
import Icon from 'react-native-vector-icons/FontAwesome';
const LiveStreaming = ({navigation}) => {
  const scrollViewRef = useRef();
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [playing, setPlaying] = useState(true);
  const height = Dimensions.get('window').height;
  const [liveStream, setLivestream] = useState({});
  const [livechat, setLivechat] = useState([]);
  const [livechatold, setLivechatold] = useState([]);
  const [msg, setMsg] = useState();
  const [mask, setMask] = useState(true);
  const listenChat = () => {
    let theChat = [...livechat];
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://mobileapps.ardanradio.com:6001',
      client: io,
    });
    echo
      .channel('laravel_database_publicChat')
      .listen('PublicChatEvents', event => {
        const {target_type} = event;
        if (target_type == 'livestream') {
          theChat.push(event);
          setLivechat(theChat);
        }
      });
  };
  const sendChat = async () => {
    try {
      let url = 'https://mobileapps.ardanradio.com/api/chat/send';
      let payload = {
        id_user: user.id,
        id_target: 0,
        target_type: 'livestream',
        title: user.name,
        chat: msg,
        penyiar: user.penyiar,
        verified: user.verified,
      };
      let req = await axios.post(url, payload);
      setMsg('');
    } catch (error) {
      console.log(error);
    }
  };
  const getChat = async () => {
    try {
      let url = 'https://mobileapps.ardanradio.com/api/chat/read';
      let payload = {
        page: 1,
        perPage: 50,
        sortDir: 'DESC',
        sortBy: 'id',
        target_type: 'livestream',
      };
      let req = await axios.post(url, payload);
      const {status, data, msg} = req.data;
      if (status && data.length > 0) {
        data.sort((a, b) => a.id - b.id);
        setLivechatold(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const chatList = list => {
    return list.map((item, index) => {
      return (
        <View style={[theme.fRow, theme.mb10]} key={index}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {
                id: item.id_user,
              });
            }}>
            <Image
              source={{
                uri:
                  item.user && item.user.image
                    ? item.user.image
                    : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
              }}
              style={[
                theme.br100,
                theme.w25,
                theme.h25,
                {objectFit: 'contain'},
                theme.me5,
              ]}
            />
          </TouchableOpacity>
          <View style={[theme.wp80]}>
            <View style={[theme.fRow, theme.faCenter]}><TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {
                id: item.id_user,
              });
            }}>
              <Text style={[theme.cwhite, theme['p14-600']]}>{item.title}</Text>
              </TouchableOpacity>
              {item.penyiar == 'Yes' ? (
                <View
                  style={[
                    theme.br100,
                    theme.faCenter,
                    theme.fjCenter,
                    theme.bgyellow,
                    theme.h10,
                    theme.w10,
                    theme.ms5,
                  ]}>
                  <Icon name="check" size={6} color="#000" />
                </View>
              ) : null}
            </View>
            <Text style={[theme.cwhite, theme['p12-400']]}>{item.chat}</Text>
          </View>
        </View>
      );
    });
  };
  const getLiveStream = async () => {
    let date = new Date(),
      d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear();
    let payload = {
      date: `${y}-${m}-${d}`,
    };
    try {
      let req = await Api.livestreamingsGet(payload);
      let {status, data, msg} = req.data;
      if (status) {
        setLivestream(data);
      }
    } catch (error) {
      console.log('Live stream error', error);
    }
  };
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  const hideMask = () => {
    // setMask(!mask);
    // setTimeout(() => {
    //   setMask(!mask);
    // }, 3000);
  };

  useEffect(() => {
    getChat();
    listenChat();
    getLiveStream();
    hideMask();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[theme.bgblack, {flexGrow: 1}]}>
      {liveStream.url ? (
        <>
          <View style={[theme.mt57, theme.relative]}>
            <YoutubePlayer
              height={height}
              play={playing}
              videoId={liveStream.url}
              onChangeState={onStateChange}
            />
            {mask ? (
              <View style={[theme.absolute, {right: 50, top: 175, opacity: 1}]}>
                <Image
                  source={require('../assets/images/radio-play-cover.png')}
                  style={[{width: 80, height: 40, objectFit: 'contain'}]}
                />
              </View>
            ) : null}
          </View>
          <View
            style={[
              theme.fRow,
              theme.faCenter,
              theme.mt15,
              theme.px15,
              theme.absolute,
              theme.top0,
            ]}>
            <View
              style={[
                {backgroundColor: '#FB0808'},
                theme.h27,
                theme.px8,
                theme.br6,
                theme.fjCenter,
                theme.faCenter,
                theme.me10,
              ]}>
              <Text style={[theme['p12-600'], theme.cwhite]}>Live</Text>
            </View>
          </View>
          <View
            style={[
              theme.absolute,
              ,
              theme.wp100,
              theme.left0,
              theme.top275,
              theme.py10,
              theme.px20,
              {zIndex: 2, backgroundColor: 'rgba(0,0,0,.8)'},
            ]}>
            <Text style={[theme['h14-700'], theme.cwhite]}>
              {liveStream.title}
            </Text>
          </View>
        </>
      ) : (
        <View style={[theme.mt57, theme.faCenter, theme.fjCenter, theme.py100]}>
          <Text style={[theme['h20-700'], theme.cwhite]}>
            No Livestream Schedule
          </Text>
        </View>
      )}
      <ScrollView
        style={[
          theme.px30,
          theme.my15,
          theme.absolute,
          theme.top265,
          theme.bottom100,
          theme.wp100,
          // {backgroundColor:'red'}
        ]}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {chatList(livechatold)}
        {chatList(livechat)}
      </ScrollView>
      <View
        style={[
          theme.px30,
          theme.py20,
          theme.fRow,
          theme.absolute,
          theme.bottom40,
          theme.faCenter,
          theme.fjBetween,
        ]}>
        <View
          style={[
            theme.bgwhite,
            theme.px15,
            theme.br16,
            theme.me10,
            theme.wp84,
          ]}>
          <TextInput
            placeholder="Send Message"
            style={[theme.cblack, theme['p12-500']]}
            onChangeText={setMsg}
            value={msg}
            onSubmitEditing={() => {
              sendChat();
            }}
            clearButtonMode="while-editing"
          />
        </View>
        <TouchableOpacity
          style={[
            theme.w43,
            theme.h43,
            theme.bgyellow,
            theme.br100,
            theme.fjCenter,
            theme.faCenter,
          ]}
          onPress={() => {
            sendChat();
            Keyboard.dismiss();
          }}>
          <Icon name="send" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LiveStreaming;
