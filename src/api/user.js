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
    url: SecrectAPI + url,
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
    url: SecrectAPI + url,
    data: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

//获取登录信息
export function getLoginData(prefix) {
  const url = '/user/getPermission'
  return axios({
    method: 'get',
    url: SecrectAPI + url
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
    url: SecrectAPI + url,
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
  return axios.get(SecrectAPI + url,{
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

//获取用户发表的文章列表 GetArticleList
export function GetArticleList(data) {
  const url = '/GetArticleList'
  return axios.get(SecrectAPI + url,{
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



//获取订阅内容
export function getSubscribe(prefix) {
  const url = prefix + '/information/getSubscribe'
  return axios({
    method: 'get',
    url: url
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err.data))
}