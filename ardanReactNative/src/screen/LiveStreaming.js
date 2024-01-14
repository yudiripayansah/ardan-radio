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
  const [msg, setMsg] = useState();
  const listenChat = () => {
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://chat.kopikoding.com:6001',
      client: io,
    });
    echo.channel('publicChat').listen('PublicChatEvent', event => {
      const {target} = event;
      let theChat = livechat;
      if (target == 'livestream') {
        theChat.push(event);
        console.log(event)
        setLivechat(theChat);
      }
    });
  };
  const sendChat = async () => {
    try {
      let url = 'https://chat.kopikoding.com/publicchat/send';
      let payload = {
        message: msg,
        target: 'livestream',
        name: user.name,
        penyiar: user.penyiar,
        verified: user.verified
      };
      console.log(payload);
      let req = await axios.post(url, payload);
      setMsg('');
    } catch (error) {
      console.log(error);
    }
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
      console.log(error);
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

  useEffect(() => {
    listenChat();
    getLiveStream();
    console.log(user)
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[theme.bgblack, {flexGrow: 1}]}>
      <View style={[theme.mt57]}>
        <YoutubePlayer
          height={height}
          play={playing}
          videoId={liveStream.url}
          onChangeState={onStateChange}
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
      <View style={[theme.absolute,,theme.wp100,theme.left0,theme.top275,theme.py10,theme.px20,{zIndex:2,backgroundColor:'rgba(0,0,0,.8)'}]}>
        <Text style={[theme['h14-700'],theme.cwhite]}>{liveStream.title}</Text>
      </View>
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
        {livechat.map((item, index) => {
          return (
            <View style={[theme.fRow, theme.mb10]} key={index}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                }}
                style={[
                  theme.br100,
                  theme.w25,
                  theme.h25,
                  {objectFit: 'contain'},
                  theme.me5,
                ]}
              />
              <View style={[theme.wp80]}>
                <View style={[theme.fRow,theme.faCenter]}>
                  <Text style={[theme.cwhite, theme['p14-600']]}>
                    {item.name}
                  </Text>
                  {(item.penyiar == 'Yes') ? (
                  <View style={[theme.br100,theme.faCenter,theme.fjCenter,theme.bgyellow,theme.h10,theme.w10,theme.ms5]}>
                    <Icon name="check" size={6} color="#000" />
                  </View>
                  ) : null}
                </View>
                <Text style={[theme.cwhite, theme['p12-400']]}>
                  {item.message}
                </Text>
              </View>
            </View>
          );
        })}
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
