import axios from 'axios';
const defAxios = axios.create({
  // baseURL: "http://localhost:8000/api/"
  // baseURL: "https://ardan.kopikoding.com/api/"
  baseURL: 'https://ardanmobileapps.ardangroup.fm/api/',
});
const Api = {
  registerToken(payload, token) {
    let url = '/user/registerToken';
    return defAxios.post(url, payload);
  },
  login(payload) {
    let url = '/auth/login';
    return defAxios.post(url, payload);
  },
  loginOrRegister(payload) {
    let url = '/auth/loginOrRegister';
    return defAxios.post(url, payload);
  },
  sendotp(payload) {
    let url = '/auth/sendotp';
    return defAxios.post(url, payload);
  },
  checkotp(payload) {
    let url = '/auth/checkotp';
    return defAxios.post(url, payload);
  },
  updatePassword(payload) {
    let url = '/auth/updatePassword';
    return defAxios.post(url, payload);
  },
  logout(payload) {
    let url = '/auth/logout';
    return defAxios.post(url, payload);
  },
  // user
  userRead(payload) {
    let url = '/user/read';
    return defAxios.post(url, payload);
  },
  userGet(payload) {
    let url = '/user/get';
    return defAxios.post(url, payload);
  },
  userCreate(payload, token) {
    let url = '/user/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  userUpdate(payload, token) {
    let url = '/user/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  userDelete(payload, token) {
    let url = '/user/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  userFollow(payload, token) {
    let url = '/user/userFollow';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // banner
  bannerRead(payload) {
    let url = '/banner/read';
    return defAxios.post(url, payload);
  },
  bannerGet(payload) {
    let url = '/banner/get';
    return defAxios.post(url, payload);
  },
  bannerCreate(payload, token) {
    let url = '/banner/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  bannerUpdate(payload, token) {
    let url = '/banner/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  bannerDelete(payload, token) {
    let url = '/banner/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // category
  categoryRead(payload) {
    let url = '/category/read';
    return defAxios.post(url, payload);
  },
  categoryGet(payload) {
    let url = '/category/get';
    return defAxios.post(url, payload);
  },
  categoryCreate(payload, token) {
    let url = '/category/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  categoryUpdate(payload, token) {
    let url = '/category/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  categoryDelete(payload, token) {
    let url = '/category/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // news
  newsRead(payload) {
    let url = '/news/read';
    return defAxios.post(url, payload);
  },
  newsGet(payload) {
    let url = '/news/get';
    return defAxios.post(url, payload);
  },
  newsCreate(payload, token) {
    let url = '/news/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  newsUpdate(payload, token) {
    let url = '/news/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  newsDelete(payload, token) {
    let url = '/news/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // content
  contentRead(payload) {
    let url = '/content/read';
    return defAxios.post(url, payload);
  },
  contentGet(payload) {
    let url = '/content/get';
    return defAxios.post(url, payload);
  },
  contentCreate(payload, token) {
    let url = '/content/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  contentUpdate(payload, token) {
    let url = '/content/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  contentDelete(payload, token) {
    let url = '/content/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // events
  eventsRead(payload) {
    let url = '/events/read';
    return defAxios.post(url, payload);
  },
  eventsGet(payload) {
    let url = '/events/get';
    return defAxios.post(url, payload);
  },
  eventsCreate(payload, token) {
    let url = '/events/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  eventsUpdate(payload, token) {
    let url = '/events/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  eventsDelete(payload, token) {
    let url = '/events/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // programs
  programsRead(payload) {
    let url = '/programs/read';
    return defAxios.post(url, payload);
  },
  programsGet(payload) {
    let url = '/programs/get';
    return defAxios.post(url, payload);
  },
  programsCreate(payload, token) {
    let url = '/programs/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  programsUpdate(payload, token) {
    let url = '/programs/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  programsDelete(payload, token) {
    let url = '/programs/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // penyiar
  penyiarRead(payload) {
    let url = '/penyiar/read';
    return defAxios.post(url, payload);
  },
  penyiarGet(payload) {
    let url = '/penyiar/get';
    return defAxios.post(url, payload);
  },
  penyiarCreate(payload, token) {
    let url = '/penyiar/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  penyiarUpdate(payload, token) {
    let url = '/penyiar/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  penyiarDelete(payload, token) {
    let url = '/penyiar/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // feeds
  feedsRead(payload) {
    let url = '/feeds/read';
    return defAxios.post(url, payload);
  },
  feedsGet(payload) {
    let url = '/feeds/get';
    return defAxios.post(url, payload);
  },
  feedsCreate(payload, token) {
    let url = '/feeds/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  feedsUpdate(payload, token) {
    let url = '/feeds/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  feedsDelete(payload, token) {
    let url = '/feeds/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  feedsReport(payload, token) {
    let url = '/feeds/report';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // livestreamings
  livestreamingsRead(payload) {
    let url = '/livestreamings/read';
    return defAxios.post(url, payload);
  },
  livestreamingsGet(payload) {
    let url = '/livestreamings/get';
    return defAxios.post(url, payload);
  },
  livestreamingsCreate(payload, token) {
    let url = '/livestreamings/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  livestreamingsUpdate(payload, token) {
    let url = '/livestreamings/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  livestreamingsDelete(payload, token) {
    let url = '/livestreamings/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // comment
  commentRead(payload) {
    let url = '/comment/read';
    return defAxios.post(url, payload);
  },
  commentGet(payload) {
    let url = '/comment/get';
    return defAxios.post(url, payload);
  },
  commentCreate(payload, token) {
    let url = '/comment/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  commentUpdate(payload, token) {
    let url = '/comment/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  commentDelete(payload, token) {
    let url = '/comment/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // like
  likeRead(payload) {
    let url = '/like/read';
    return defAxios.post(url, payload);
  },
  likeGet(payload) {
    let url = '/like/get';
    return defAxios.post(url, payload);
  },
  likeCreate(payload, token) {
    let url = '/like/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  likeUpdate(payload, token) {
    let url = '/like/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  likeDelete(payload, token) {
    let url = '/like/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // notifications
  notificationsRead(payload) {
    let url = '/notifications/read';
    return defAxios.post(url, payload);
  },
  notificationsGet(payload) {
    let url = '/notifications/get';
    return defAxios.post(url, payload);
  },
  notificationsCreate(payload, token) {
    let url = '/notifications/create';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  notificationsUpdate(payload, token) {
    let url = '/notifications/update';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  notificationsDelete(payload, token) {
    let url = '/notifications/delete';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // private chat
  PrivateChatRead(payload, token) {
    let url = '/privatechat/';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  PrivateChatSend(payload, token) {
    let url = '/privatechat/send';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  PrivateChatGet(payload, token) {
    let url = '/privatechat/get';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
};
export default Api;
