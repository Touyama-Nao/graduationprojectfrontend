<template>
  <div id="articledetails" class="articledetails">
    <el-container>
      <el-header style="padding: 0 !important">
        <!-- 首页导航栏开始 -->
        <div id="navigation-bar">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" @click="toHomePage()">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">高校</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3">博客</el-menu-item>
            <el-menu-item index="4">创作中心</el-menu-item>
            <el-menu-item index="5" @click="toUserPage()"
              >个人中心
            </el-menu-item>
            <el-menu-item index="6" disabled>
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>{{ userName }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 首页导航栏结束 -->
      </el-header>
      <el-container>
        <el-aside width="520px" style="padding: 20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div class="text item">文章列表</div>
          </el-card></el-aside
        >
        <el-container>
          <el-main>
            <el-container>
              <el-header style="height: 150px">
                <el-card class="box-card" style="width: 750px !important">
                  <div class="text item">{{ this.article.title }}</div>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    v-show="this.userName == this.article.author"
                    @click="gotoReviseArticle()"
                    >修改编辑</el-button
                  >
                </el-card>
                <el-card class="box-card" style="width: 750px !important">
                  <span class="text item" style="margin: 10px"
                    >作者:{{ this.article.author }}</span
                  >
                  <span class="text item" style="margin: 10px"
                    >点赞数:{{ this.article.likenum }}</span
                  >
                  <span class="text item" style="margin: 10px"
                    >创作时间:{{
                      this.article.creationtime.split(" ")[0]
                    }}</span
                  >
                  <span class="text item" style="margin: 10px">标签:</span>
                  <el-tag
                    v-for="tag in this.article.dynamicTags"
                    :key="tag"
                    type=""
                    style="margin: 3px"
                  >
                    {{ tag }}
                  </el-tag>
                  <span class="text item" style="margin: 10px"
                    >评分:{{ this.article.rate }}</span
                  >
                </el-card>
              </el-header>
              <el-main
                ><el-card
                  class="box-card"
                  style="width: 750px !important; height: 800px"
                >
                  <div
                    class="text item"
                    v-html="this.article.content"
                  ></div> </el-card
              ></el-main>
              <el-footer v-show="this.userid != this.article.userid"
                ><span class="demonstration" style="display:inline-block;" v-show="!isRate">请给文章评分:</span>
                <el-rate v-model="ratevalue_1" style="display:inline-block;" show-text v-show="!isRate">
                </el-rate>
                <span class="demonstration" style="display:inline-block;" v-show="isRate">文章评分:</span>
                <el-rate
                  v-model="ratevalue_2"
                  :disabled="isRate"
                  v-show="isRate"
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                  style="display:inline-block;"
                >
                </el-rate>
                <el-button
                  type="primary"
                  @click="postrate()"
                  style="width: 200px; display: inline-block"
                  v-show="!isRate"
                  >确定</el-button
                ></el-footer
              >
            </el-container>
          </el-main>
          <el-footer>暂定评论区</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import * as apiTools from "@/api/user";

export default {
  beforeRouteEnter(to, from, next) {
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
    document.querySelector("body").setAttribute("style", "margin:0;padding:0");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector("body").setAttribute("style", "");
    next();
  },
  name: "articledetails",
  data() {
    return {
      isLogin: false,
      userName: "未登录",
      password: "",
      userid: "", //保存用户的id
      ratevalue_1: 0, //文章评分
      ratevalue_2: 1, //文章评分
      isRate: false, //文章是否已经评分
      checkRateForm: {
        //检查用户是否发布了评分的表格
        userid: "",
        articleid: "",
      },
      rateForm: {
        //用户评分表post
        userid: "",
        articleid: "",
        rate: "",
      },
      article: {
        content: "",
        author: "",
        comnum: 0,
        userid: "",
        likenum: 0,
        category: 1,
        creationtime: "",
        title: "",
        dynamicTags: [],
      },
      articleid: "", //文章id
    };
  },
  watch: {
    userid: {
      handler(newVal, oldVal) {
        this.checkIsRate();
      },
      deep: true,
    },
    isRate: {
      handler(newVal, oldVal) {
        this.checkIsRate();
      },
      deep: true,
    },
  },
  mounted() {
    var that = this;
    that.checkLogin();
    that.init();
  },
  methods: {
    //获取登陆状态
    checkLogin() {
      var that = this;
      apiTools
        .getSessions()
        .then((res) => {
          if (res.result == "success") {
            that.isLogin = true;
            that.userName = res.message.account;
            that.password = res.message.password;
            that.userid = res.message.userid;
          } else if (res.result == "failed") {
            that.isLogin = false;
            that.userName = "未登录";
          }
        })
        .catch(function (response) {
          that.$message.error({
            showClose: true,
            message: "登陆数据异常",
            duration: 2000,
          });
        });
    },
    //获取路由值和文章详情初始化
    init() {
      var that = this;
      that.article.articleid = that.$route.params.articleid;
      that.articleid = that.$route.params.articleid;
      apiTools
        .GetArticleContent(that.article.articleid)
        .then((res) => {
          if (res.result == "success") {
            that.article = res.message;
            //将标签字符串转化为数组
            that.article.dynamicTags = that.article.dynamicTags
              .split("[")[1]
              .split("]")[0]
              .split(",");
            for (let i = 0; i < that.article.dynamicTags.length; i++) {
              that.article.dynamicTags[i] = that.article.dynamicTags[i]
                .replace(/[ ]/g, "")
                .replace(/^\"|\"$/g, "");
            }
            //html解码
            var temp = "";
            temp = that.article.content.replace(/&amp;/g, "&");
            temp = temp.replace(/&lt;/g, "<");
            temp = temp.replace(/&gt;/g, ">");
            temp = temp.replace(/&nbsp;/g, " ");
            temp = temp.replace(/&#39;/g, "'");
            temp = temp.replace(/&quot;/g, '"');
            that.article.content = temp;
          } else if (res.result == "failed") {
            that.$message.error({
              showClose: true,
              message: "获取文章详情失败！",
              duration: 2000,
            });
          }
        })
        .catch(function (response) {
          that.$message.error({
            showClose: true,
            message: "获取文章详情数据异常",
            duration: 2000,
          });
        });
    },
    //查询用户是否评分
    checkIsRate() {
      var that = this;
      that.checkRateForm.userid = that.userid;
      that.checkRateForm.articleid = that.article.articleid;
      apiTools
        .GetRate(that.checkRateForm)
        .then((res) => {
          if (res.result == "success") {
            that.isRate = true;
            that.ratevalue_2 = parseInt(res.message.rate);
          } else if (res.result == "failed") {
            that.isRate = false;
            // that.$message.error({
            //   showClose: true,
            //   message: "发用户未评分",
            //   duration: 2000,
            // });
          }
        })
        .catch(function (response) {
          that.$message.error({
            showClose: true,
            message: "获取评分数据异常",
            duration: 2000,
          });
        });
    },
    //用户发表评分
    postrate() {
      var that = this;
      that.rateForm.rate = that.ratevalue_1;
      that.rateForm.userid = that.userid;
      that.rateForm.articleid = that.article.articleid;
      apiTools
        .PostRate(that.rateForm)
        .then((res) => {
          if (res.result == "success") {
            that.$message.success({
              showClose: true,
              message: "发布评分成功!",
              duration: 2000,
            });
            that.isRate = true;
          } else if (res.result == "failed") {
            that.isRate = false;
            that.$message.error({
              showClose: true,
              message: "发布评分失败",
              duration: 2000,
            });
          }
        })
        .catch(function (response) {
          that.$message.error({
            showClose: true,
            message: "发布评分数据异常",
            duration: 2000,
          });
        });
    },
    //跳转回去首页
    toHomePage() {
      var that = this;
      this.$router.push({
        name: "home",
        params: {
          account: that.userName,
          password: that.password,
        },
      });
    },
    //去用户主页
    toUserPage() {
      var that = this;
      this.$router.push({
        name: "UserPage",
        params: {
          account: that.userName,
          password: that.password,
        },
      });
    },
    //去文章编辑页面
    gotoReviseArticle() {
      var that = this;
      this.$router.push({
        name: "ReviseArticle",
        params: {
          account: that.userName,
          password: that.password,
          articleid: that.articleid,
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.articledetails {
  margin: 0;
}
/* 文章信息表头 */
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.el-header {
}
</style>
