import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
const CreatePost = ({navigation}) => {
  const imageWidth = Dimensions.get('window').width - 20;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [id_user, setid_user] = useState(user.id);
  const [image, setimage] = useState();
  const [title, settitle] = useState();
  const [text, settext] = useState();
  const [category, setcategory] = useState('all');
  const [type, settype] = useState('POST');
  const [status, setstatus] = useState('PUBLISHED');
  const [loading, setloading] = useState(false);
  const [postButton, setpostButton] = useState('POST');
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        imageUri = 'data:image/jpeg;base64,' + response.assets[0].base64;
        setimage(imageUri);
      }
    });
  };
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        imageUri = 'data:image/jpeg;base64,' + response.assets[0].base64;
        setimage(imageUri);
      }
    });
  };
  const doSave = async () => {
    setloading(true);
    try {
      if (type == 'POST') {
        settitle('Post by ' + user.name);
      }
      let payload = {
        id_user: id_user,
        image: image,
        title: 'Post by ' + user.name,
        text: text,
        category: category,
        type: type,
        status: status,
      };
      let req = await Api.feedsCreate(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          setpostButton('Success!!!');
          setTimeout(() => {
            setpostButton('POST');
            navigation.navigate('Social');
          }, 1000);
        }
      }
      setloading(false);
    } catch (error) {
      console.error('Save Post',error);
      setloading(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, theme.pt10, theme.relative]}>
      <ScrollView style={[]}>
        <View style={[theme.pb100]}>
          {image && (
            <AutoHeightImage width={imageWidth} source={{uri: image}} />
          )}
          <TextInput
            multiline={true}
            numberOfLines={7}
            style={[
              theme.wp100,
              theme.cwhite,
              theme['h14-400'],
              {textAlignVertical: 'top'},
            ]}
            placeholder="Write something here..."
            placeholderTextColor={'#fff'}
            onChangeText={settext}
            value={text}
          />
          <View
            style={[
              theme.fRow,
              theme.fjBetween,
              theme.pt10,
              theme.btw2,
              theme.byellow,
              theme.bsolid,
            ]}>
            <View style={[theme.fRow, theme.faCenter]}>
              <TouchableOpacity
                style={[theme.me5]}
                onPress={() => {
                  handleCameraLaunch();
                }}>
                <Icon name="camera" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[theme.me5]}
                onPress={() => {
                  openImagePicker();
                }}>
                <Icon name="image" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                theme.faCenter,
                theme.fjCenter,
                theme.bgyellow,
                theme.br5,
                theme.h30,
                theme.w85,
              ]}
              onPress={() => {
                doSave();
              }}>
              <Text style={[theme['p12-700'], theme.cblack]}>
                {loading ? 'Processing...' : postButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePost;
