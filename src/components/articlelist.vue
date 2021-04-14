<template>
  <div id="articlelist" class="articlelist">
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
          <el-main
            ><el-card class="box-card" style="width: 700px">
              <div slot="header" class="clearfix">
                <span>{{ articlelist.categoryName }}</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                  >操作按钮</el-button
                >
              </div>
              <div
                v-for="(item, key) in articlelist.list"
                :key="key"
                class="text item"
                @click="gotoArticleDet(item.articleid)"
              >
                <span style="float: left; text-decoration: underline">{{
                  item.title
                }}</span>
                <span style="float: right; text-decoration: underline">{{
                  item.creationtime
                }}</span>
              </div>
            </el-card>
          </el-main>
          <!-- <el-footer>暂定评论区</el-footer> -->
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
  name: "articlelist",
  data() {
    return {
      isLogin: false,
      userName: "未登录",
      password: "",
      //存放文章列表
      articlelist: {
        categoryName: "",
        list: [
          {
            title: "",
            creationtime: "",
          },
        ], //文章列表
      },
      articleid: "", //文章id
    };
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
    //初始化函数
    init() {
      var that = this;
      var categoryId = that.$route.params.category;
      switch (categoryId) {
        case 1:
          that.articlelist.categoryName = "考研数学";
          break;
        case 2:
          that.articlelist.categoryName = "考研英语";
          break;
        case 3:
          that.articlelist.categoryName = "考研政治";
          break;
        case 4:
          that.articlelist.categoryName = "考研专业课";
          break;
      }
      apiTools
        .GetArticleList(categoryId)
        .then((res) => {
          if (res.result == "success") {
            that.articlelist.list = res.message;
            for (let i = 0; i < that.articlelist.list.length; i++) {
              that.articlelist.list[i].creationtime = that.articlelist.list[
                i
              ].creationtime.split(" ")[0];
            }
          } else if (res.result == "failed") {
            that.$message.error({
              showClose: true,
              message: "文章列表数据异常",
              duration: 2000,
            });
          }
        })
        .catch(function (response) {
          that.$message.error({
            showClose: true,
            message: "文章列表数据异常",
            duration: 2000,
          });
        });
    },
    //跳转文章详情页面
    gotoArticleDet(articleid) {
      var that = this;
      this.$router.push({
        name: "ArticleDetails",
        params: {
          articleid: articleid,
        },
      });
    },
    //跳转到编辑文章页面
    gotoEdit() {
      var that = this;
      this.$router.push({
        name: "EditArticle",
        params: {
          account: that.account,
          password: that.password,
        },
      });
    },
    //跳转回去首页
    toHomePage() {
      var that = this;
      this.$router.push({
        name: "home",
        params: {
          account: that.account,
          password: that.account,
        },
      });
    },
    //跳转回去用户首页
    toUserPage() {
      var that = this;
      this.$router.push({
        name: "UserPage",
        params: {
          account: that.account,
          password: that.account,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
/* 主题文章列表卡片Css */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
