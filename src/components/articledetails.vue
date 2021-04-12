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
                <el-card class="box-card" style="width: 700px !important">
                  <div class="text item">标题</div>
                </el-card>
                <el-card class="box-card" style="width: 700px !important">
                  <span class="text item">作者:{{ this.article.author }}</span>
                  <span class="text item"
                    >点赞数:{{ this.article.likenum }}</span
                  >
                  <span class="text item"
                    >创作时间:{{ this.article.creationtime }}</span
                  >
                  <span class="text item"
                    >标签:{{ this.article.dynamicTags }}</span
                  >
                  <span class="text item">评分:{{ this.article.rate }}</span>
                </el-card>
              </el-header>
              <el-main
                ><el-card class="box-card" style="width: 700px !important">
                  <div class="text item">文章内容</div>
                </el-card></el-main
              >
              <el-footer>Footer</el-footer>
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
      article: {
        content: "",
        author: "",
        comnum: 0,
        likenum: 0,
        category: 1,
        creationtime: "",
        title: "",
        dynamicTags: [],
      },
    };
  },
  mounted() {
    var that = this;
    that.checkLogin();
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
    //获取路由值和文章详情初始化
    init() {
      var that = this;
      that.article.articleid = that.$route.params.articleid;
      apiTools
        .GetArticleContent(that.article.articleid)
        .then((res) => {
          if (res.result == "success") {
            that.isLogin = true;
            that.article = res.message;
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
            message: "登陆数据异常",
            duration: 2000,
          });
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
