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
        <el-form-item label="日期" prop="creationtime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.postDate"
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
      editForm: {
        //文章内容保存
        content: "",
        //标签数据
        dynamicTags: ["标签一", "标签二", "标签三"],
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
  methods: {
    init() {
      var that = this;
      that.userName = that.$route.params.account;
    },
    editSubmit() {},
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
