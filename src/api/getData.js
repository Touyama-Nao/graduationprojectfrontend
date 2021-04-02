import axios from 'axios';
// import qs from 'qs;'

const service = axios.create({
  timeout: 20000
});

//获取首页数据
export function getIndex(context) {
  const url = context + '/common/getIndex'
  return service.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取新闻热点数据
export function getIndexNewsHotSpot(prefix) {
  const url = prefix + '/information/getIndexNewsHotSpot'
  return service.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取热门产品数据
export function getHotProduct(prefix) {
  const url = prefix + '/product/getHotProduct'
  return service.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

//校对未显示的首页数据
export function proofreading() {
  let that = this;
  getIndex(that.HOST)
    .then(res => {
      if (res.result == "error") {
        that.$message.error({
          showClose: true,
          message: "获取首页信息异常",
          duration: 2000
        });
      } else {
        global.ad = res.message.ad;
        global.tabs[0].message = res.message.information1;
        global.tabs[1].message = res.message.hotspot;
        global.tabs[2].message = res.message.policy;
        global.tabs[3].message = res.message.report; //行业报告;
        global.tabs[4].message = res.message.notices;
        global.tabs[5].message = res.message.news;
        global.tabs[6].message = res.message.members;
        global.tabs[7].message = [{ title: "不需要传入数据" }]; //协会之窗;不需要
        global.tabs[8].message = res.message.educationTrain; //教育培训;
        global.tabs[9].message = res.message.companyNews;
        global.tabs[10].message = res.message.companyBrand;
        global.tabs[11].message = res.message.companyDynamics;
        //产品推荐去重
        let arr = res.message.productRecommend;
        let result = [];
        let obj = {};
        for (let i of arr) {
          if (!obj[i.title]) {
            result.push(i);
            obj[i.title] = 1;
          }
        }
        global.tabs[12].message = result;
        global.tabs[13].message = res.message.productNews;
        global.tabs[14].message = res.message.productEvaluation;
        global.tabs[15].message = res.message.productLibrary;
        global.tabs[16].message = res.message.science;
        global.tabs[17].message = res.message.basic;
        global.tabs[18].message = res.message.case//案例库
        global.tabs[19].message = res.message.experts;
        global.tabs[20].message = res.message.expertArts;
        global.tabs[21].message = res.message.school;
        global.tabs[22].message1 = res.message.demand1; //需求
        global.tabs[22].message0 = res.message.demand0; //供应
        global.tabs[25].message = res.message.meeting//活动
        global.tabs[34].message = res.message.meeting; //会议动态
        global.tabs[35].message = res.message.conference;//展会动态

        global.tabs[26].message = res.message.conference
        global.tabs[27].message = res.message.other
        global.tabs[31].message = res.message.hotspot;//本月新闻热点
        global.tabs[32].message = res.message.relatedHot;//相关热点
        global.tabs[33].message = res.message.position.map(item => {
          item.title = item.positionName;
          return item;
        });; //最新招聘
      }
    })
    .catch(function (response) {
      that.$message.error({
        showClose: true,
        message: "主页数据异常",
        duration: 2000
      });
    });
}//使用时需要把作用域绑定到全局另this可获取到vue对象

//获取文章/人才/产品/招聘详细信息
export function getMainContent(url, id) {
  let params = {
    id: id
  }
  return service.get(url, {
    params: params,
    headers:{
      "Accept" : "text/html;charset=UTF-8"
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

//获取会员列表
export function getMemberContent(url, id) {
  let params = {
    memberId: id
  }
  return service.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

//获取文章/人才列表信息
export function getContentList(url, pageNum, content = '非搜索', channel = '0') {
  let params
  if (content == '非搜索') {
    params = {
      pageNum: pageNum
    }
  }
  else {
    params = {
      pageNum: pageNum,
      content: content,
      categoryId: channel
    }
  }
  return service.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

//获取产品库列表信息
export function getProductList(url, pageNum) {
  let data = {
    pageNum: pageNum
  }
  return service({
    url: url,
    method: "post", 
    params:data,
    }).then(res => {
    return Promise.resolve(res.data)
  })
}

//文件下载
export function downLoadMemberFile(url, data) {
  return service.get(url, { params: data }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取会员单位资讯信息
export function getMemberInfo(url, data) {
  return service.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
