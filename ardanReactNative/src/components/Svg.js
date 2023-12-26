import React from 'react';
import { Platform } from 'react-native'
import SvgUri from 'react-native-svg-uri';
//import { SvgUri } from 'react-native-svg';
export default ({ width, height, source, fill }) => Platform.select({
    ios: () => <SvgUri width={width} height={height} source={source} fill={fill} />,
    android: () => { const SVG = source; return <SVG width={width} height={height} fill={fill} /> },
})();