import React, {useContext} from 'react';
import {View, Text} from 'react-native'
import {ThemeContext} from '../context/ThemeContext';
const Loading = ({...props}) => {
    const theme = useContext(ThemeContext);
    const {styleText, styleWrap, msg} = props
    return (
        <View style={[theme.alignCenter, theme.py3,styleText]}>
            <Text style={[theme.textCenter, theme.textWhite, theme.textH5, theme.alignCenter, styleWrap]}>
                {msg}
            </Text>
        </View>
    )
}

export default Loading