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
      <vue-editor v-model="article.content"> </vue-editor>
    </el-container>
  </div>
</template>
<script>
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
      article:{ //文章内容保存
        content:""
      }
    };
  },
  methods: {
    init() {
      var that = this;
      that.userName = that.$route.params.account;
    },
    showAddDialog() {},
    editForm() {},
    selsChange() {},
    addForm() {},
  },
};
</script>

<style scoped lang="scss">
.el_b_form input {
  width: 50% !important;
}
.editor1 #quill-container {
  max-height: 1000px;
  overflow: auto;
}
.ql-snow .ql-picker {
  height: auto !important;
  margin-top: -6px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 108px;
  height: 108px;
  display: block;
}
.avatar2 {
  @extend .avatar;
}
.ql-snow .ql-tooltip {
  left: 23.602px !important;
  top: 31px !important;
  color: green;
}
.ql-snow .ql-editor img {
  cursor: pointer;
}
</style>
