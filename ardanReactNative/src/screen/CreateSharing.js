import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import analytics from '@react-native-firebase/analytics';
const h1 = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;
const h2 = ({tintColor}) => <Text style={{color: tintColor}}>H2</Text>;
const h3 = ({tintColor}) => <Text style={{color: tintColor}}>H3</Text>;
const h4 = ({tintColor}) => <Text style={{color: tintColor}}>H4</Text>;
const h5 = ({tintColor}) => <Text style={{color: tintColor}}>H5</Text>;
const h6 = ({tintColor}) => <Text style={{color: tintColor}}>H6</Text>;
const CreateSharing = ({navigation}) => {
  const richText = React.useRef();
  const imageWidth = useWindowDimensions().width - 20;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [id_user, setid_user] = useState(user.id);
  const [image, setimage] = useState();
  const [title, settitle] = useState();
  const [text, settext] = useState();
  const [type, settype] = useState('SHARING');
  const [status, setstatus] = useState('PUBLISHED');
  const [loading, setloading] = useState(false);
  const [postButton, setpostButton] = useState('SHARING');
  const [selectedCat, setSelectedCat] = useState([]);
  const [category, setCategory] = useState({
    data: [],
    loading: false,
  });
  const getCategory = async () => {
    setCategory({
      data: [],
      loading: true,
    });
    try {
      let theData = [];
      let payload = {
        page: 1,
        perPage: 10,
        sortDir: 'DESC',
        sortBy: 'id',
        search: null,
        type: 'Feeds',
      };
      let req = await Api.categoryRead(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          theData = [...data];
        }
      }
      setCategory({
        data: theData,
        loading: false,
      });
    } catch (error) {
      console.error('Get Category Sharing', error);
      setCategory({
        data: [],
        loading: false,
      });
    }
  };
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
      if (!title) {
        settitle('Post by ' + user.name);
      }
      let payload = {
        id_user: id_user,
        image: image,
        title: title,
        text: text,
        category: selectedCat.join(','),
        type: type,
        status: status,
      };
      let req = await Api.feedsCreate(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          setpostButton('Success!!!');
          setimage('')
          settitle('')
          settext('')
          setSelectedCat([])
          setTimeout(() => {
            setpostButton('SHARING');
            navigation.navigate('Social',{activeTab:'Sharing'});
          }, 1000);
        }
      }
      setloading(false);
    } catch (error) {
      console.error('Save Sharing', error);
      setloading(false);
    }
  };
  const setCat = cat => {
    let theCat = [...selectedCat];
    const exists = theCat.includes(cat);
    if (exists) {
      theCat = theCat.filter(item => item !== cat);
    } else {
      theCat.push(cat);
    }
    setSelectedCat(theCat);
  };
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Check Otp',
      screen_class: 'CheckOtp',
    });
  }
  useEffect(() => {
    gAnalytics()
    getCategory();
  }, []);
  return (
    <KeyboardAvoidingView
      style={[theme.bgblack, {flexGrow: 1}, theme.pt10, theme.relative]}>
      <ScrollView style={[]} showsVerticalScrollIndicator={false}>
        <View style={[theme.pb100]}>
          {image && (
            <AutoHeightImage
              contentWidth={imageWidth}
              width={imageWidth}
              source={{uri: image}}
            />
          )}
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={[
              theme.wp100,
              theme.cwhite,
              theme['h14-400'],
              {textAlignVertical: 'top'},
              theme.bbw2,
              theme.byellow,
              theme.bsolid,
            ]}
            placeholder="Title"
            placeholderTextColor={'#fff'}
            onChangeText={settitle}
            value={title}
          />
          {/* <TextInput multiline={true} numberOfLines={7} style={[theme.wp100,theme.cwhite,theme['h14-400'],{textAlignVertical:'top'}]} placeholder="Write something here..." placeholderTextColor={'#fff'} onChangeText={settext} value={text}/> */}
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.heading4,
              actions.heading5,
              actions.heading6,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.removeFormat,
              actions.undo,
              actions.redo,
            ]}
            iconMap={{
              [actions.heading1]: h1,
              [actions.heading2]: h2,
              [actions.heading3]: h3,
              [actions.heading4]: h4,
              [actions.heading5]: h5,
              [actions.heading6]: h6,
            }}
            style={[theme.mt10]}
          />
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              settext(descriptionText);
            }}
            style={[theme.h100]}
          />
          <View style={[theme.btw2, theme.byellow, theme.bsolid, theme.py10]}>
            <Text style={[theme.cwhite, theme['h14-400']]}>Category</Text>
            <View style={[theme.fRow, theme.mt10]}>
              {category.data.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setCat(item.title);
                    }}
                    style={[
                      theme.py5,
                      theme.px10,
                      theme.br100,
                      theme.me5,
                      selectedCat.includes(item.title)
                        ? theme.bgyellow
                        : {backgroundColor: '#eee'},
                    ]}>
                    <Text style={[theme['p12-400'], theme.cblack]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
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

export default CreateSharing;
