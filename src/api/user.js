import axios from 'axios'
//import context from '../pages/index/index.js'//引入全局vue对象，本项目用不到
import Qs from "qs";
var SecrectAPI = "http://127.0.0.1:3000";

// const service = axios.create({
//   baseURL: context.HOST,
//   timeout: 200000,
// });


//登录请求
export function Login(formdata) {
  var that = this;
  var data = formdata;
  const url = '/Login'
  return axios({
    method: 'post',
    url:  url,
    data: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//登出请求
export function Logout(formdata) {
  var that = this;
  var data = formdata;
  const url = '/Logout'
  return axios({
    method: 'post',
    url:  url,
    data: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//修改用户信息请求

export function UpdateUserInfor(formdata) {
  var that = this;
  var data = formdata;
  const url = '/UpdateUserInfor'
  return axios({
    method: 'post',
    url: url,
    data: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//获取登录状态信息
export function getSessions(prefix) {
  const url = '/getSessions'
  return axios({
    method: 'get',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//普通用户注册相关
//用户提交注册
export function Register(formdata) {
  var that = this;
  const url = '/Register'
  //let params = Qs.stringify({
  //  formdata: formdata
  //});
  return axios({
    method: 'post',
    url: url,
    data: formdata,
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//获取用户信息 GetUserInfor
export function GetUserInfor(data) {
  const url = '/GetUserInfor'
  return axios.get(url,{
    params:{
        account:data.account,
        password:data.password
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//获取用户发表的文章列表 GetUserArticleList
export function GetUserArticleList(data) {
  const url = '/user/GetArticleList'
  return axios.get(url,{
    params:{
        account:data.account,
        password:data.password
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//获取指定类别的文章列表 GetArticleList
export function GetArticleList(data) {
  const url = '/GetArticleList'
  return axios.get(url,{
    params:{
      category:data
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}



//发表文章帖子
export function PostArticle(data) {
  const url = "/PostArticle"
  return axios({
    method: 'post',
    url: url,
    data: data,
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err.data))
}

//修改文章请求
export function ReviseArticle(data) {
  const url = "/ReviseArticle"
  return axios({
    method: 'post',
    url: url,
    data: data,
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err.data))
}

//获取文章详情 GetArticleContent
export function GetArticleContent(data) {
  const url = '/GetArticleContent'
  return axios.get(url,{
    params:{
      articleid:data
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//获取推荐文章列表 GetHotspotList
export function GetHotspotList(data) {
  const url = '/user/GetArticleContent'
  return axios.get(url,{
    params:{
      userid:data
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//获取用户文章对应的评分 GetRate
export function GetRate(data) {
  const url = '/user/GetRate'
  return axios.get(url,{
    params:{
      userid:data.userid,
      articleid:data.articleid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//发表用户文章评分
export function PostRate(data) {
  const url = "/user/PostRate"
  return axios({
    method: 'post',
    url: url,
    data: data,
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err.data))
}