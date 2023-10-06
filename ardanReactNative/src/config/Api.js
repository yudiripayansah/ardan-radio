import axios from 'axios'
const defAxios = axios.create({
  // baseURL: "http://localhost:8000/api/"
  baseURL: "https://mobileapps.ardanradio.com/api/"
})
const Api = {
  login(payload) {
    let url = '/auth/login'
    return defAxios.post(url, payload);
  },
  logout(payload) {
    let url = '/auth/logout'
    return defAxios.post(url, payload);
  },
  // user
  userRead(payload) {
    let url = '/user/read'
    return defAxios.post(url, payload);
  },
  userGet(payload) {
    let url = '/user/get'
    return defAxios.post(url, payload);
  },
  userCreate(payload, token) {
    let url = '/user/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  userUpdate(payload, token) {
    let url = '/user/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  userDelete(payload, token) {
    let url = '/user/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // banner
  bannerRead(payload) {
    let url = '/banner/read'
    return defAxios.post(url, payload);
  },
  bannerGet(payload) {
    let url = '/banner/get'
    return defAxios.post(url, payload);
  },
  bannerCreate(payload, token) {
    let url = '/banner/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  bannerUpdate(payload, token) {
    let url = '/banner/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  bannerDelete(payload, token) {
    let url = '/banner/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // category
  categoryRead(payload) {
    let url = '/category/read'
    return defAxios.post(url, payload);
  },
  categoryGet(payload) {
    let url = '/category/get'
    return defAxios.post(url, payload);
  },
  categoryCreate(payload, token) {
    let url = '/category/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  categoryUpdate(payload, token) {
    let url = '/category/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  categoryDelete(payload, token) {
    let url = '/category/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // news
  newsRead(payload) {
    let url = '/news/read'
    return defAxios.post(url, payload);
  },
  newsGet(payload) {
    let url = '/news/get'
    return defAxios.post(url, payload);
  },
  newsCreate(payload, token) {
    let url = '/news/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  newsUpdate(payload, token) {
    let url = '/news/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  newsDelete(payload, token) {
    let url = '/news/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // events
  eventsRead(payload) {
    let url = '/events/read'
    return defAxios.post(url, payload);
  },
  eventsGet(payload) {
    let url = '/events/get'
    return defAxios.post(url, payload);
  },
  eventsCreate(payload, token) {
    let url = '/events/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  eventsUpdate(payload, token) {
    let url = '/events/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  eventsDelete(payload, token) {
    let url = '/events/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // programs
  programsRead(payload) {
    let url = '/programs/read'
    return defAxios.post(url, payload);
  },
  programsGet(payload) {
    let url = '/programs/get'
    return defAxios.post(url, payload);
  },
  programsCreate(payload, token) {
    let url = '/programs/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  programsUpdate(payload, token) {
    let url = '/programs/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  programsDelete(payload, token) {
    let url = '/programs/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // penyiar
  penyiarRead(payload) {
    let url = '/penyiar/read'
    return defAxios.post(url, payload);
  },
  penyiarGet(payload) {
    let url = '/penyiar/get'
    return defAxios.post(url, payload);
  },
  penyiarCreate(payload, token) {
    let url = '/penyiar/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  penyiarUpdate(payload, token) {
    let url = '/penyiar/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  penyiarDelete(payload, token) {
    let url = '/penyiar/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // feeds
  feedsRead(payload) {
    let url = '/feeds/read'
    return defAxios.post(url, payload);
  },
  feedsGet(payload) {
    let url = '/feeds/get'
    return defAxios.post(url, payload);
  },
  feedsCreate(payload, token) {
    let url = '/feeds/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  feedsUpdate(payload, token) {
    let url = '/feeds/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  feedsDelete(payload, token) {
    let url = '/feeds/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  // livestreamings
  livestreamingsRead(payload) {
    let url = '/livestreamings/read'
    return defAxios.post(url, payload);
  },
  livestreamingsGet(payload) {
    let url = '/livestreamings/get'
    return defAxios.post(url, payload);
  },
  livestreamingsCreate(payload, token) {
    let url = '/livestreamings/create'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  livestreamingsUpdate(payload, token) {
    let url = '/livestreamings/update'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  livestreamingsDelete(payload, token) {
    let url = '/livestreamings/delete'
    let config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    return defAxios.post(url, payload, config);
  },
}
export default Api