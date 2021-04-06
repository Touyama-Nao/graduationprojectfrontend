<template>
  <div id="userpage" class="userpage">
    <el-container>
      <el-header>
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
            <el-menu-item index="5">
              <a href target="_blank" @click="toUserPage()">个人中心</a>
            </el-menu-item>
            <el-menu-item index="6" disabled>
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>{{userName}}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 首页导航栏结束 -->
      </el-header>
      <el-container>
        <!-- 个人信息导航栏开始 -->
        <el-aside width="400px">
          <el-row :gutter="4">
            <div class="grid-content bg-purple-light">
              <div class="grid-content bg-purple">
                <el-card class="box-card" shadow="always">
                  <div slot="header" class="clearfix">
                    <span>个人信息</span>
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      @click="modifyUserInfo()"
                    >修改信息</el-button>
                  </div>
                  <el-form
                    :model="userInfoForm"
                    status-icon
                    :rules="rules"
                    ref="userInfoForm"
                    label-width="100px"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="账号" prop="account">
                      <el-input
                        type="account"
                        v-model="userInfoForm.account"
                        autocomplete="off"
                        disabled
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input
                        type="password"
                        v-model="userInfoForm.password"
                        autocomplete="off"
                        :disabled="!isModify"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpassword" v-show="isModify">
                      <el-input
                        type="checkpassword"
                        v-model="userInfoForm.checkpassword"
                        autocomplete="off"
                        :disabled="!isModify"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                      <el-input v-model="userInfoForm.nickname" :disabled="!isModify"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                      <el-input v-model.number="userInfoForm.age" :disabled="!isModify"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" size="medium" width="200px">
                      <el-select
                        v-model="userInfoForm.sex"
                        placeholder="请选择性别"
                        :disabled="!isModify"
                      >
                        <el-option label="男" value="male"></el-option>
                        <el-option label="女" value="female"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phonenum">
                      <el-input v-model.number="userInfoForm.phonenum" :disabled="!isModify"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                      <el-input v-model.number="userInfoForm.address" :disabled="!isModify"></el-input>
                    </el-form-item>

                    <el-form-item v-show="isModify">
                      <el-button type="primary" @click="UpdateUserInfor('userInfoForm')">提交修改</el-button>
                      <el-button @click="resetForm('userInfoForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </div>
          </el-row>
        </el-aside>
        <!-- 个人信息导航栏结束 -->
        <el-main width="500px">
          <!-- 首页内容开始 -->
          <div id="content">
            <el-row :gutter="16">
              <div class="grid-content bg-purple-dark">
                <div class="block">
                  <el-carousel height="150px">
                    <el-carousel-item v-for="item in 4" :key="item">
                      <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </el-row>
            <el-row :gutter="16">
              <!-- 个人页面文章列表导航栏 -->
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#99a9bf"
                text-color="#fff"
              >
                <el-menu-item index="1">最近</el-menu-item>
                <el-submenu index="2">
                  <template slot="title">文章</template>
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
                <el-menu-item index="3">消息中心</el-menu-item>
                <el-menu-item index="4">
                  <a href="https://www.ele.me" target="_blank">收藏</a>
                </el-menu-item>
              </el-menu>
            </el-row>
            <!-- 个人页面文章列表卡片 -->
            <el-row v-for="(item,index) in userarticle" :key="index">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-card class="box-card" shadow="always" style="padding:10px;">
                    <div slot="header" class="clearfix">
                      <span style="float:left;">[{{item.category}}]</span>
                      <span style="float:left;">{{item.title}}</span>
                    </div>
                    <div class="text item">{{item.briefintroduction}}</div>
                    <div style="float:left;">
                      <time class="time" style="width:60px;">发布时间:{{item.creationtime }}</time>
                      <div class="userspan">
                        <i class="el-icon-chat-dot-square"></i>
                        <span>评论数:{{item.comnum}}</span>
                      </div>
                      <div class="userspan">
                        <i class="el-icon-s-opportunity"></i>
                        <span>点赞数:{{item.likenum}}</span>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-row>
          </div>
          <!-- 首页内容结束 -->
        </el-main>
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
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 12) {
            callback(new Error("必须年满12岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkphonenum = (rule, value, callback) => {
      var num = parseInt(value);
      var l = 0;
      while (num >= 1) {
        num = num / 10;
        l++;
      }
      setTimeout(() => {
        console.log(typeof value);
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (l < 7 || l > 18) {
            callback(new Error("电话号码不少于7位不大于18位"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkNickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userInfoForm.checkPass !== "") {
          //this.$refs.userInfoForm.validateField("checkPass");
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (parseInt(value) !== this.userInfoForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
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
      userarticle: [
        {
          article: "",
          title: ""
        },
        {
          article: "",
          title: ""
        }
      ],
      userInfoForm: {
        account: "",
        password: "",
        checkpassword: "",
        nickname: "",
        phonenum: "",
        address: "",
        sex: "",
        age: ""
      },
      searchUserInfo: {
        account: "",
        password: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        nickname: [{ validator: checkNickname, trigger: "blur" }],
        phonenum: [{ validator: checkphonenum, trigger: "blur" }]
      },
      userName: "",
      isModify: false
    };
  },
  mounted() {
    var that = this;
    that.init();
    that.getuserarticlelist();
  },
  methods: {
    getuserarticlelist() {
      //获取当前用户的文章
      var that = this;
      apiTools
        .GetArticleList(that.searchUserInfo)
        .then(res => {
          if (res.result == "success") {
            console.log(res.result);
            that.userarticle = res.message;
            //that.userarticle.category
            for (var i = 0; i < that.userarticle.length; i++) {
              //修改参数获得中文的类别
              that.userarticle[i].creationtime = that.userarticle[
                i
              ].creationtime.split("T")[0];
              switch (that.userarticle[i].category) {
                case 1:
                  that.userarticle[i].category = "数学";
                  break;
                case 2:
                  that.userarticle[i].category = "英语";
                  break;
                case 3:
                  that.userarticle[i].category = "政治";
                  break;
                case 4:
                  that.userarticle[i].category = "专业课";
                  break;
              }
            }

            that.$message({
              showClose: true,
              type: "success",
              message: "查询用户文章列表成功!"
            });
          } else if (res.result == "failed") {
            that.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(function(response) {
          that.$message.error({
            showClose: true,
            message: "查询用户文章列表数据异常",
            duration: 2000
          });
        });
    },
    modifyUserInfo() {
      var that = this;
      that.isModify = !that.isModify;
    },
    init() {
      var that = this;
      that.userName = that.$route.params.account;
      that.userInfoForm.account = that.$route.params.account;
      that.userInfoForm.password = that.$route.params.password;
      that.searchUserInfo.account = that.$route.params.account;
      that.searchUserInfo.password = that.$route.params.password;
      apiTools
        .GetUserInfor(that.searchUserInfo)
        .then(res => {
          if (res.result == "success") {
            that.$message({
              showClose: true,
              type: "success",
              message: "查询用户信息成功!"
            });
            that.userInfoForm.account = res.message[0].account;
            that.userInfoForm.password = parseInt(res.message[0].password);
            that.userInfoForm.checkpassword = parseInt(res.message[0].password);
            that.userInfoForm.nickname = res.message[0].nickname;
            that.userInfoForm.phonenum = res.message[0].phonenum;
            that.userInfoForm.address = res.message[0].address;
            that.userInfoForm.sex = res.message[0].sex;
            that.userInfoForm.address = res.message[0].address;
            that.userInfoForm.age = res.message[0].age;
          } else if (res.result == "failed") {
            that.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(function(response) {
          that.$message.error({
            showClose: true,
            message: "查询用户信息数据异常",
            duration: 2000
          });
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //修改个人信息表单提交函数
    UpdateUserInfor(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiTools
            .UpdateUserInfor(that.userInfoForm)
            .then(res => {
              if (res.result == "success") {
                that.$message({
                  showClose: true,
                  type: "success",
                  message: "修改用户信息成功!"
                });
              } else if (res.result == "failed") {
                that.$message({
                  type: "error",
                  message: res.message
                });
              }
            })
            .catch(function(response) {
              that.$message.error({
                showClose: true,
                message: "修改用户信息数据异常",
                duration: 2000
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
    }
  }
};
</script>
<style scoped>
.userpage {
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
  text-align: left;
  height: 80px;
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
/* 布局容器css */
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-aside {
}

.el-main {
}
/* 点赞和评论数目span的csss */
.userspan {
  width: 200px;
  display:inline-block;
}
</style>