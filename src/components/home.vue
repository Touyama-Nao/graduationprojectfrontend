<template>
  <div id="home" class="home">
    <!-- 首页导航栏开始 -->
    <div id="navigation-bar">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">高校</template>
          <el-menu-item index="2-1">中山大学</el-menu-item>
          <el-menu-item index="2-2">华南理工大学</el-menu-item>
          <el-menu-item index="2-3">广东工业大学</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">博客</el-menu-item>
        <el-menu-item index="4" :disabled="!isLogin" @click="gotoEdit()"
          >创作中心</el-menu-item
        >
        <el-menu-item index="5" :disabled="!isLogin" @click="toUserPage()"
          >个人中心</el-menu-item
        >
        <el-menu-item index="6" disabled>
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>{{ userName }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 首页导航栏结束 -->
    <!-- 首页内容开始 -->
    <div id="content">
      <el-row :gutter="20">
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple-dark">
            <div class="block">
              <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11" :offset="3">
          <div class="grid-content bg-purple">
            <el-card class="box-card" shadow="always">
              <div slot="header" class="clearfix">
                <span>考研数学</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="gotoArticleList(1)"
                  >更多</el-button
                >
              </div>
              <!-- 走马灯 -->
              <div style="display: inline-block; float: left">
                <div class="block" style="width: 340px">
                  <el-carousel height="200px">
                    <el-carousel-item v-for="item in 4" :key="item">
                      <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
              <!-- 走马灯 -->
              <div style="display: inline-block">
                <div
                  v-for="(item, key) in articlelist.mathematics"
                  :key="key"
                  class="text item"
                  style="width: 220px;"
                  @click="gotoArticleDet(item.articleid)"
                >
                  <span style="float: left;text-decoration: underline">{{ item.title }}</span>
                  <span style="float: right;text-decoration: underline">{{ item.creationtime }}</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content" style="height:300px;!important">
            <!-- 登陆选项卡 -->
            <transition name="el-fade-in-linear">
              <el-card class="box-card" v-show="loginShow">
                <div slot="header" class="clearfix">
                  <span>登陆</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="loginShow = !loginShow"
                    >没有账号？注册</el-button
                  >
                </div>
                <div>
                  <el-form
                    :model="LoginForm"
                    status-icon
                    :rules="rules"
                    ref="LoginForm"
                    label-width="100px"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="账号" prop="account">
                      <el-input
                        type="account"
                        v-model="LoginForm.account"
                        autocomplete="off"
                        :disabled="isLogin"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input
                        type="password"
                        v-model="LoginForm.password"
                        autocomplete="off"
                        :disabled="isLogin"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="onLogin('LoginForm')"
                        v-show="!isLogin"
                        >登陆</el-button
                      >
                      <el-button
                        @click="resetForm('LoginForm')"
                        v-show="!isLogin"
                        >重置</el-button
                      >
                      <el-button
                        type="primary"
                        @click="Logout()"
                        v-show="isLogin"
                        >退出登录</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </transition>
            <!-- 注册选项卡 -->
            <transition name="el-fade-in-linear">
              <el-card class="box-card" v-show="!loginShow">
                <div slot="header" class="clearfix">
                  <span>注册</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="loginShow = !loginShow"
                    >已有账号？登陆</el-button
                  >
                </div>
                <div>
                  <el-form
                    :model="RegisterForm"
                    status-icon
                    :rules="rules"
                    ref="RegisterForm"
                    label-width="100px"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="账号" prop="account">
                      <el-input
                        type="account"
                        v-model="RegisterForm.account"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input
                        type="password"
                        v-model="RegisterForm.password"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="onRegister('RegisterForm')"
                        >注册</el-button
                      >
                      <el-button @click="resetForm('RegisterForm')"
                        >重置</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </transition>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11" :offset="3">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                  <span>考研英语</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="gotoArticleList(2)"
                    >更多</el-button
                  >
                </div>
                <!-- 走马灯 -->
                <div style="display: inline-block; float: left">
                  <div class="block" style="width: 340px">
                    <el-carousel height="200px">
                      <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small">{{ item }}</h3>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
                <!-- 走马灯 -->
                <div style="display: inline-block">
                  <div
                    v-for="(item, key) in articlelist.English"
                    :key="key"
                    class="text item"
                    style="width: 220px;"
                    @click="gotoArticleDet(item.articleid)"
                  >
                    <span style="float: left;text-decoration: underline">{{ item.title }}</span>
                    <span style="float: right;text-decoration: underline">{{ item.creationtime }}</span>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple">
              <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                  <span>推荐热点</span>
                  <el-button style="float: right; padding: 3px 0" type="text"
                    >更多</el-button
                  >
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                  {{ "列表内容 " + o }}
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11" :offset="3">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple-light">
              <div class="grid-content bg-purple">
                <el-card class="box-card" shadow="always">
                  <div slot="header" class="clearfix">
                    <span>考研政治</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="gotoArticleList(3)"
                      >更多</el-button
                    >
                  </div>
                  <!-- 走马灯 -->
                  <div style="display: inline-block; float: left">
                    <div class="block" style="width: 340px">
                      <el-carousel height="200px">
                        <el-carousel-item v-for="item in 4" :key="item">
                          <h3 class="small">{{ item }}</h3>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </div>
                  <!-- 走马灯 -->
                  <div style="display: inline-block">
                    <div
                      v-for="(item, key) in articlelist.Politics"
                      :key="key"
                      class="text item"
                      style="width: 220px"
                      @click="gotoArticleDet(item.articleid)"
                    >
                      <span style="float: left;text-decoration: underline">{{ item.title }}</span>
                      <span style="float: right;text-decoration: underline">{{ item.creationtime }}</span>
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple-light">
              <div class="grid-content bg-purple">
                <el-card class="box-card" shadow="always">
                  <div slot="header" class="clearfix">
                    <span>院校推荐</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                      >更多</el-button
                    >
                  </div>
                  <div v-for="o in 4" :key="o" class="text item">
                    {{ "列表内容 " + o }}
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" :offset="3">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple-light">
              <div class="grid-content bg-purple">
                <el-card class="box-card" shadow="always">
                  <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="gotoArticleList(1)"
                      >更多</el-button
                    >
                  </div>
                  <div v-for="o in 4" :key="o" class="text item">
                    {{ "列表内容 " + o }}
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple-light">
              <div class="grid-content bg-purple">
                <el-card class="box-card" shadow="always">
                  <div slot="header" class="clearfix">
                    <span>专业课</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="gotoArticleList(4)"
                      >更多</el-button
                    >
                  </div>
                  <!-- 走马灯 -->
                  <div style="display: inline-block; float: left">
                    <div class="block" style="width: 340px">
                      <el-carousel height="200px">
                        <el-carousel-item v-for="item in 4" :key="item">
                          <h3 class="small">{{ item }}</h3>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </div>
                  <!-- 走马灯 -->
                  <div style="display: inline-block">
                    <div v-for="o in 4" :key="o" class="text item">
                      {{ "列表内容 " + o }}
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 首页内容结束 -->
  </div>
</template>

<script>
import * as apiTools from "@/api/user";

export default {
  name: "home",
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
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.LoginForm.account !== "") {
          //this.$refs.LoginForm.validateField("account");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (this.LoginForm.account !== "") {
          //this.$refs.LoginForm.validateField("password");
        }
        callback();
      }
      var num = parseInt(value);
      var l = 0;
      while (num >= 1) {
        num = num / 10;
        l++;
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (l < 6 || l > 18) {
            callback(new Error("密码不少于6位不大于18位"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      userName: "未登录",
      loginShow: true,
      isLogin: false,
      LoginForm: {
        account: "",
        password: "",
      },
      RegisterForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
      },
      articlelist: {
        Politics: [],
        mathematics: [],
        English: [],
      }, //文章列表
    };
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    var that = this;
    that.checkLogin();
    that.GetCatArticleList();
  },
  methods: {
    toUserPage() {
      var that = this;
      this.$router.push({
        name: "UserPage",
        params: {
          account: that.LoginForm.account,
          password: that.LoginForm.password,
        },
      });
    },
    //获取登陆状态
    checkLogin() {
      var that = this;
      apiTools
        .getSessions()
        .then((res) => {
          if (res.result == "success") {
            that.isLogin = true;
            that.userName = res.message.account;
            that.LoginForm.account = res.message.account;
            that.LoginForm.password = res.message.password;
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onLogin(formName) {
      var LoginForm = this.LoginForm;
      this.LoginForm.password = parseInt(this.LoginForm.password); //强制转换数字值
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiTools
            .Login(this.LoginForm)
            .then((res) => {
              if (res.result == "success") {
                that.$message({
                  showClose: true,
                  type: "success",
                  message: "登陆成功!",
                });
                that.isLogin = true;
                that.userName = that.LoginForm.account;
              } else if (res.result == "failed") {
                that.$message({
                  type: "error",
                  message: res.message,
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //登出函数
    Logout() {
      var that = this;
      apiTools
        .Logout(this.LoginForm)
        .then((res) => {
          if (res.result == "success") {
            that.$message({
              showClose: true,
              type: "success",
              message: "登出成功!",
            });
            that.isLogin = false;
            that.userName = "未登录";
          } else if (res.result == "failed") {
            that.$message({
              type: "error",
              message: res.message,
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
      // that.$message({
      //   showClose: true,
      //   type: "success",
      //   message: "退出登陆成功!",
      // });
    },
    //注册函数
    onRegister(formName) {
      this.RegisterForm.password = parseInt(this.RegisterForm.password); //将字符串转化成数字
      var RegisterForm = this.RegisterForm;
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiTools
            .Register(this.RegisterForm)
            .then((res) => {
              if (res.result == "success") {
                that.$message({
                  showClose: true,
                  type: "success",
                  message: "恭喜你，注册成功!",
                });
                that.loginShow = !that.loginShow;
              } else if (res.result == "failed") {
                that.$message({
                  type: "error",
                  message: res.message,
                });
              }
            })
            .catch(function (response) {
              that.$message.error({
                showClose: true,
                message: "注册数据异常",
                duration: 2000,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //跳转到创作文章页面
    gotoEdit() {
      this.$router.push({
        name: "EditArticle",
        params: {
          account: this.LoginForm.account,
          password: this.LoginForm.password,
        },
      });
    },
    //获取指定类别的文章列表，用于初始化
    GetCatArticleList() {
      var that = this;
      apiTools
        .GetArticleList(3)
        .then((res) => {
          if (res.result == "success") {
            that.articlelist.Politics = res.message;
            for (let i = 0; i < that.articlelist.Politics.length; i++) {
              that.articlelist.Politics[
                i
              ].creationtime = that.articlelist.Politics[i].creationtime.split(
                " "
              )[0];
            }
          } else if (res.result == "failed") {
            that.$message.error({
              showClose: true,
              message: "政治文章列表数据异常",
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

      apiTools
        .GetArticleList(2)
        .then((res) => {
          if (res.result == "success") {
            that.articlelist.English = res.message;
            for (let i = 0; i < that.articlelist.English.length; i++) {
              that.articlelist.English[
                i
              ].creationtime = that.articlelist.English[i].creationtime.split(
                " "
              )[0];
            }
          } else if (res.result == "failed") {
            that.$message.error({
              showClose: true,
              message: "英语文章列表数据异常",
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

      apiTools
        .GetArticleList(1)
        .then((res) => {
          if (res.result == "success") {
            that.articlelist.mathematics = res.message;
            for (let i = 0; i < that.articlelist.mathematics.length; i++) {
              that.articlelist.mathematics[
                i
              ].creationtime = that.articlelist.mathematics[
                i
              ].creationtime.split(" ")[0];
            }
          } else if (res.result == "failed") {
            that.$message.error({
              showClose: true,
              message: "数学文章列表数据异常",
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
    //从首页文章列表跳转到文章详情页面
    gotoArticleDet(articleid){
      var that = this;
      this.$router.push({
        name: "ArticleDetails",
        params: {
          articleid:articleid
        },
      });
    },
    //跳转到文章列表页面
    gotoArticleList(category){
      var that = this;
      this.$router.push({
        name: "ArticleList",
        params: {
          category:category
        },
      });
    }

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  margin: 0;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/* 卡片的css */
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
  height: 300px;
}

/* 走马灯的css */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
