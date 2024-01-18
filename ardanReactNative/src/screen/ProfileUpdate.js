import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import Api from '../config/Api';
import Helper from '../config/Helper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {RadioContext} from '../context/RadioContext';
const ProfileUpdate = ({route, navigation}) => {
  const radioState = useContext(RadioContext).state;
  const imageWidth = Dimensions.get('window').width - 40;
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [image, setimage] = useState(user.image_url);
  const [name, setname] = useState(user.name);
  const [phone, setphone] = useState(user.phone);
  const [address, setaddress] = useState(user.address);
  const [gender, setgender] = useState(user.gender);
  const [password, setpassword] = useState(null);
  const [dob, setdob] = useState(Helper.dateFormatId(user.dob));
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [saveButton, setsaveButton] = useState('Save');
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
        console.log(response);
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
  const getUser = async () => {
    let id = user.id;
    try {
      let payload = {
        id: id,
      };
      let req = await Api.userGet(payload);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          setimage(data.image_url);
          setname(data.name);
          setphone(data.phone);
          setaddress(data.address);
          setgender(data.gender);
          setpassword(data.password);
          setdob(data.dob);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const doSave = async () => {
    setloading(true);
    try {
      let payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        image: image,
        name: name,
        phone: phone,
        address: address,
        gender: gender,
        password: password,
        dob: dob,
        role: user.role,
      };
      console.log(payload);
      let req = await Api.userUpdate(payload, user.access_token);
      if (req.status == 200) {
        let {data, status, msg} = req.data;
        if (status) {
          setsaveButton('Success!!!');
          setTimeout(() => {
            setsaveButton('Save');
            navigation.navigate('Profile');
          }, 1000);
        } else {
          console.log(msg);
        }
      }
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <KeyboardAvoidingView style={[theme.bgblack, {flexGrow: 1}, (radioState && radioState.status == 'playing') ? theme.pt130 : theme.pt60]}>
      <ScrollView style={[]}>
        <KeyboardAvoidingView style={[theme.px20, theme.pt10, theme.pb150]}>
          <TouchableOpacity
            onPress={() => {
              openImagePicker();
            }}>
            {image ? (
              <AutoHeightImage width={imageWidth} source={{uri: image}} />
            ) : (
              <Image
                source={require('../assets/images/user.jpg')}
                style={[{width: imageWidth, height: imageWidth}]}
              />
            )}
          </TouchableOpacity>
          <TextInput
            multiline={true}
            style={[
              theme.wp100,
              theme.cwhite,
              theme['h14-400'],
              {textAlignVertical: 'top'},
              theme.bbw1,
              theme.bsolid,
              theme.byellow,
              theme.mt10,
            ]}
            placeholder="Name"
            placeholderTextColor={'#fff'}
            onChangeText={setname}
            value={name}
          />
          <TextInput
            multiline={true}
            style={[
              theme.wp100,
              theme.cwhite,
              theme['h14-400'],
              {textAlignVertical: 'top'},
              theme.bbw1,
              theme.bsolid,
              theme.byellow,
              theme.mt10,
            ]}
            placeholder="Phone"
            placeholderTextColor={'#fff'}
            onChangeText={setphone}
            value={phone}
          />
          <TextInput
            multiline={true}
            style={[
              theme.wp100,
              theme.cwhite,
              theme['h14-400'],
              {textAlignVertical: 'top'},
              theme.bbw1,
              theme.bsolid,
              theme.byellow,
              theme.mt10,
            ]}
            placeholder="Address"
            placeholderTextColor={'#fff'}
            onChangeText={setaddress}
            value={address}
          />
          <TouchableOpacity
            style={[
              theme.wp100,
              theme.cwhite,
              theme['h14-400'],
              {textAlignVertical: 'top'},
              theme.bbw1,
              theme.bsolid,
              theme.byellow,
              theme.mt20,
              theme.pb10,
              theme.ps3,
            ]}
            onPress={() => setOpen(true)}>
            <Text style={[theme.cwhite, theme['h14-400']]}>
              {dob ? dob : 'Date of Birth'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={new Date()}
            onConfirm={date => {
              setOpen(false);
              let dob = Helper.dateFormatId(date);
              setdob(dob);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TextInput
            multiline={true}
            style={[
              theme.wp100,
              theme.cwhite,
              theme['h14-400'],
              {textAlignVertical: 'top'},
              theme.bbw1,
              theme.bsolid,
              theme.byellow,
              theme.mt10,
            ]}
            placeholder="Password"
            placeholderTextColor={'#fff'}
            onChangeText={setpassword}
            value={password}
          />
          <Text style={[theme['p12-400'], {color: 'grey'}]}>
            Fill in if you want to update your password
          </Text>
          <View style={[theme.bbw1, theme.bsolid, theme.byellow]}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setgender(itemValue)}
              style={[
                theme.cwhite,
                theme['h14-400'],
                {marginLeft: -13, marginRight: -13},
              ]}
              dropdownIconColor="white">
              <Picker.Item label="Laki-Laki" value="Laki-Laki" />
              <Picker.Item label="Perempuan" value="Perempuan" />
            </Picker>
          </View>
          <TouchableOpacity
            style={[
              theme.faCenter,
              theme.fjCenter,
              theme.bgyellow,
              theme.br5,
              theme.h30,
              theme.wp100,
              theme.mt10,
            ]}
            onPress={() => {
              doSave();
            }}>
            <Text style={[theme['p14-700'], theme.cblack]}>
              {loading ? 'Processing...' : saveButton}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileUpdate;
