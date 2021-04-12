<template>
  <div id="articledetails" class="articledetails">
    <el-container>
      <el-header>
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
  },
};
</script>
<style scoped lang="scss">
.articledetails {
  margin: 0;
}
</style>
