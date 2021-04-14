<template>
  <div id="editarticle">
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
    <!-- 首页编辑文章模块开始 -->
    <el-container>
      <el-form
        :model="editForm"
        label-width="100px"
        :rules="editFormRules"
        ref="editForm"
      >
        <el-form-item label="文章名" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-tag
            :key="tag"
            v-for="tag in editForm.dynamicTags"
            closable
            effect="dark"
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </el-form-item>
        <el-form-item label="文章类别">
          <el-select v-model="editForm.category" placeholder="请选择文章类别">
            <el-option label="考研数学" value=1></el-option>
            <el-option label="考研英语" value=2></el-option>
            <el-option label="考研政治" value=3></el-option>
            <el-option label="考研专业课" value=4></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="creationtime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.creationtime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <vue-editor v-model="editForm.content"> </vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="editSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import * as apiTools from "@/api/user";
import { VueEditor } from "vue2-editor";
import Qs from "qs";

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
  name: "editarticle",
  components: { VueEditor },
  data() {
    return {
      userName: "", //用户姓名
      password: "", //保存用户密码
      userid: "", //保存用户id
      editForm: {
        //文章内容保存
        content: "",
        title: "",
        creationtime: "",
        //标签数据
        dynamicTags: ["标签一", "标签二", "标签三"],
        account: "",
        //文章分类 1是数学 2是英语 3是政治 4是专业课
        category:""
      },
      inputVisible: false,
      inputValue: "",
      // 表单验证规则
      editFormRules: {
        title: [{ required: true, message: "请输入文章名", trigger: "blur" }],
        source: [{ required: false, message: "请输入来源", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        postDate: [{ required: false, message: "请填写日期", trigger: "blur" }],
      },
    };
  },
  mounted() {
    var that = this;
    that.init();
    that.checkLogin();
  },
  methods: {
    init() {
      var that = this;
      that.userName = that.$route.params.account;
      that.password = that.$route.params.password;
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
    editSubmit() {
      var that = this;
      that.editForm.account = that.userName;
      that.editForm.userid = that.userid;
      that.editForm.content = that.editForm.content
        .replace(/<\/div>/g, "</p>")
        .replace(/<div/g, "<p"); //此处vue2-editor的v-model无法显示div
      apiTools
        .PostArticle(that.editForm)
        .then((res) => {
          if (res.result == "success") {
            console.log(res.result);
            that.$message({
              showClose: true,
              type: "success",
              message: "发表用户文章成功!",
            });
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
            message: "发表用户文章数据异常",
            duration: 2000,
          });
        });
    },
    handleClose(tag) {
      this.editForm.dynamicTags.splice(
        this.editForm.dynamicTags.indexOf(tag),
        1
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.editForm.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
  },
};
</script>

<style scoped lang="scss">
/* 标签css */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
