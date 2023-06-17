import axios from 'axios'
const ApiAxios = axios.create({
  baseURL: 'http://arabiangamingguild.com/endpoint/api/'
});
const Api = {
  login(payload) {
    let url = 'member/login'
    return ApiAxios.post(url, payload)
  },
  gameMember(payload, token){
    let url = 'member/listGame'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  gameMemberAdd(payload, token){
    let url = 'member/addGame'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  listMember(payload, token){
    let url = 'member/list'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  createMember(payload, token){
    let url = 'member/create'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  updateMember(payload, token){
    let url = 'member/update'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  detailMember(payload, token){
    let url = 'member/detail'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  deleteMember(payload, token){
    let url = 'member/delete'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  listNews(payload, token){
    let url = 'news/list'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  createNews(payload, token){
    let url = 'news/create'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  updateNews(payload, token){
    let url = 'news/update'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  detailNews(payload, token){
    let url = 'news/detail'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  deleteNews(payload, token){
    let url = 'news/delete'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  listGames(payload, token){
    let url = 'games/list'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  createGames(payload, token){
    let url = 'games/create'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  updateGames(payload, token){
    let url = 'games/update'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  detailGames(payload, token){
    let url = 'games/detail'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  deleteGames(payload, token){
    let url = 'games/delete'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  listWithdraw(payload, token){
    let url = 'withdraw/list'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  createWithdraw(payload, token){
    let url = 'withdraw/create'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  updateWithdraw(payload, token){
    let url = 'withdraw/update'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  detailWithdraw(payload, token){
    let url = 'withdraw/detail'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
  deleteWithdraw(payload, token){
    let url = 'withdraw/delete'
    let config = {
      headers: {
        'token': token
      }
    }
    return ApiAxios.post(url, payload, config)
  },
}
export default Api