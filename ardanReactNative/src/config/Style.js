import { StyleSheet } from 'react-native';
let color = {
    black: '#181a20',
    black_chocolate: '#191A03',
    black_green: '#4F4F3F',
    yellow: '#F8C303',
    yellow_bold: '#FFB500',
    blue_grey: '#8189B0',
    white: '#fff',
    indian_red: '#FF6A6A',
    pale_white: '#EAEAEA',
    none: 'transparent'
}
let colors = []
for (const [key, value] of Object.entries(color)) {
    colors[`c${key}`] = { color: value }
    colors[`bg${key}`] = { backgroundColor: value }
    colors[`b${key}`] = { borderColor: value }
}
let marginPadding = []
marginPadding[`mxAuto`] = { marginLeft: 'auto', marginRight: 'auto' }
marginPadding[`myAuto`] = { marginVertical: 'auto' }
marginPadding[`mtAuto`] = { marginTop: 'auto' }
marginPadding[`mbAuto`] = { marginBottom: 'auto' }
marginPadding[`msAuto`] = { marginLeft: 'auto' }
marginPadding[`meAuto`] = { marginRight: 'auto' }
for (let i = 1; i < 1000; i++) {
    marginPadding[`m${i}`] = { margin: i }
    marginPadding[`mx${i}`] = { marginHorizontal: i }
    marginPadding[`my${i}`] = { marginVertical: i }
    marginPadding[`mt${i}`] = { marginTop: i }
    marginPadding[`mb${i}`] = { marginBottom: i }
    marginPadding[`ms${i}`] = { marginLeft: i }
    marginPadding[`me${i}`] = { marginRight: i }
    marginPadding[`mm${i}`] = { margin: -i }
    marginPadding[`mmx${i}`] = { marginHorizontal: -i }
    marginPadding[`mmy${i}`] = { marginVertical: -i }
    marginPadding[`mmt${i}`] = { marginTop: -i }
    marginPadding[`mmb${i}`] = { marginBottom: -i }
    marginPadding[`mms${i}`] = { marginLeft: -i }
    marginPadding[`mme${i}`] = { marginRight: -i }
    marginPadding[`p${i}`] = { padding: i }
    marginPadding[`px${i}`] = { paddingHorizontal: i }
    marginPadding[`py${i}`] = { paddingVertical: i }
    marginPadding[`pt${i}`] = { paddingTop: i }
    marginPadding[`pb${i}`] = { paddingBottom: i }
    marginPadding[`ps${i}`] = { paddingLeft: i }
    marginPadding[`pe${i}`] = { paddingRight: i }
}
let width = []
let height = []
let flexbasis = []
width[`wauto`] = { width: 'auto'}
height[`hauto`] = { height: 'auto'}
for(let w=0;w<1001;w++){
    width[`w${w}`] = { width: w}
    height[`h${w}`] = { height: w}
    width[`wp${w}`] = { width: `${w}%`}
    height[`hp${w}`] = { height: `${w}%`}
    flexbasis[`fbp${w}`] = { flexBasis: `${w}%`}
}
let positions = []
for(let i=0;i<=1000;i++){
    positions[`top${i}`] = { top: i}
    positions[`bottom${i}`] = { bottom: i}
    positions[`left${i}`] = { left: i}
    positions[`right${i}`] = { right: i}
    positions[`mtop${i}`] = { top: -i}
    positions[`mbottom${i}`] = { bottom: -i}
    positions[`mleft${i}`] = { left: -i}
    positions[`mright${i}`] = { right: -i}
}
let typo = []
for(let i=1;i<=100;i++){
    let weight = ['Thin','ExtraLight','Light','Regular','Medium','SemiBold','Bold','ExtraBold','Black']
    for(let p=0;p<weight.length;p++){
        typo[`h${i}-${p+1}00`] = { fontFamily: `Poppins-${weight[p]}`,fontSize: i }
        typo[`p${i}-${p+1}00`] = { fontFamily: `Inter-${weight[p]}`,fontSize: i}
    }
}
let border = []
for(let i=0;i<10;i++){
    border[`bw${i}`] = { borderWidth: i }
    border[`bbw${i}`] = { borderBottomWidth: i }
    border[`btw${i}`] = { borderTopWidth: i }
    border[`brw${i}`] = { borderRightWidth: i }
    border[`blw${i}`] = { borderLeftWidth: i }
}
for(let i=0;i<1000;i++){
    border[`br${i}`] = { borderRadius: i }
    border[`brtl${i}`] = { borderTopLeftRadius: i }
    border[`brtr${i}`] = { borderTopRightRadius: i }
    border[`brbl${i}`] = { borderBottomLeftRadius: i }
    border[`brbr${i}`] = { borderBottomRightRadius: i }
}
let borderStyle = ['solid', 'dashed', 'dotted']
for(let i=0;i<borderStyle.length;i++){
    border[`b${borderStyle[i]}`] = { borderStyle: borderStyle[i] }
}
const base = {
    ...width,
    ...height,
    ...flexbasis,
    ...marginPadding,
    ...colors,
    ...positions,
    ...typo,
    ...border,
    fRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    fColumn: {
        flexDirection: 'column'
    },
    faCenter: {
        alignItems: 'center'
    },
    faStart: {
        alignItems: 'flex-start'
    },
    faEnd: {
        alignItems: 'flex-end'
    },
    fjCenter: {
        justifyContent: 'center'
    },
    fjStart: {
        justifyContent: 'flex-start'
    },
    fjEnd: {
        justifyContent: 'flex-end'
    },
    fjBetween: {
        justifyContent: 'space-between'
    },
    tItalic: {
        fontStyle: 'italic'
    },
    tUnder: {
        textDecoration: 'underline'
    },
    tUper: {
        textTransform: 'uppercase'
    },
    tLower: {
        textTransform: 'lowercase'
    },
    tCenter: {
        textAlign: 'center'
    },
    tLeft: {
        textAlign: 'left'
    },
    tRight: {
        textAlign: 'right'
    },
    dNone : {
        display: 'none'
    },
    absolute: {
        position: 'absolute'
    },
    relative: {
        position: 'relative'
    },
    fixed: {
        position: 'fixed'
    },
    static: {
        position: 'static'
    }
}
const Style = StyleSheet.create({ ...base });

export default Style