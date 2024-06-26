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
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Button
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
import analytics from '@react-native-firebase/analytics';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
const LiveStreaming = ({navigation}) => {
  const scrollViewRef = useRef();
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [playing, setPlaying] = useState(true);
  const height = useWindowDimensions().height;
  const [liveStream, setLivestream] = useState({});
  const [htmlContent, setHtmlContent] = useState('')
  const [livechat, setLivechat] = useState([]);
  const [livechatold, setLivechatold] = useState([]);
  const [msg, setMsg] = useState();
  const [mask, setMask] = useState(true);
  const videoLive = 'https://live.ardangroup.fm/memfs/1b1d14c7-4945-46b6-839d-00eb3d5a5e17.m3u8'
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const togglePlayPause = () => {
    setPaused(!paused);
  };
  const listenChat = () => {
    let theChat = [...livechat];
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://ardanmobileapps.ardangroup.fm:6001',
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
      let url = 'https://ardanmobileapps.ardangroup.fm/api/chat/send';
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
      let url = 'https://ardanmobileapps.ardangroup.fm/api/chat/read';
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
            <View style={[theme.fRow, theme.faCenter]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile', {
                    id: item.id_user,
                  });
                }}>
                <Text style={[theme.cwhite, theme['p14-600']]}>
                  {item.title}
                </Text>
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
        let html = await axios.get(data.url)
        setHtmlContent(html.data);
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
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Live Streaming',
      screen_class: 'LiveStreaming',
    });
  }

  useEffect(() => {
    gAnalytics()
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
          <View style={[theme.mt57, theme.relative, theme.wp100,theme.h220]}>
          <Video
              ref={videoRef}
              source={{ uri: liveStream.url }} // Can be a URL or a local file.
              style={[theme.wp100, theme.h220]}
              controls={true} // Set to false if you want to create custom controls
              paused={paused}
              onBuffer={buffer => console.log('Buffering:', buffer)} // Callback when remote video is buffering
              onError={error => console.error('Error:', error)} // Callback when video cannot be loaded
              audioOnly={false}
              ignoreSilentSwitch="ignore" // Ensure sound plays even if the silent switch is on (iOS only)
            />
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
        showsVerticalScrollIndicator={false}
        style={[
          theme.px30,
          theme.my15,
          theme.absolute,
          theme.top265,
          theme.bottom80,
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
          theme.bottom20,
          theme.wp100,
          theme.faCenter,
          theme.fjCenter,
          {flexWrap: 'nowrap'},
        ]}>
        <View
          style={[
            theme.bgwhite,
            theme.px15,
            theme.br16,
            theme.wp80,
            theme.me10,
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
