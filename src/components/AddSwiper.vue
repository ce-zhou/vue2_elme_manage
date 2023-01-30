<template>
  <div>
    <!-- 添加数据对话框 -->
    <el-dialog
      :title="this.type == 'add' ? '添加轮播图' : '修改轮播图'"
      :visible.sync="addDialogVisible"
      @close="dialogClose"
      width="30%"
    >
      <el-form
        :model="swiperForm"
        :rules="swiperFormRules"
        ref="swiperFormRef"
        label-width="100px"
      >
        <el-form-item label="图片" prop="url">
          <el-upload
            :headers="{
              token: token,
            }"
            action="http://backend-api-02.newbee.ltd/manage-api/v1/upload/file"
            accept="jpg,jpeg,png"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="swiperForm.url" :src="swiperForm.url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转链接" prop="link">
          <el-input v-model="swiperForm.link"></el-input>
        </el-form-item>
        <el-form-item label="排序值" prop="sort">
          <el-input v-model="swiperForm.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddSwiper",
  props: {
    type: {
      type: String,
      required: true,
    },
    reload: {
      required: true,
    },
  },
  data() {
    return {
      // 控制添加对话框的显示与隐藏
      addDialogVisible: false,
      id: '',
      swiperForm: {
        url: "",
        link: "",
        sort: "",
      },
      swiperFormRules: {
        url: [{ required: "true", message: "图片不能为空", trigger: ["blur"] }],
        link: [
          { required: "true", message: "跳转链接不能为空", trigger: ["blur"] },
        ],
        sort: [
          { required: "true", message: "排序不能为空", trigger: ["blur"] },
        ],
      },
      token: window.sessionStorage.getItem("token"),
    };
  },
  methods: {
    // 获取修改表单的数据
    async getEditData(id) {
      const { data: res } = await this.$http.get(`/carousels/${id}`);
      // console.log(res);
      if (res.resultCode !== 200)
        return this.$message.error("获取此行数据失败");
      this.swiperForm.url = res.data.carouselUrl;
      this.swiperForm.link = res.data.redirectUrl;
      this.swiperForm.sort = res.data.carouselRank;
      this.id = res.data.carouselId
    },
    // 处理上传前的文件
    beforeAvatarUpload(file) {
      // console.log(file);
      const sufix = file.name.split(".")[1] || "";
      if (!["jpg", "jpeg", "png"].includes(sufix)) {
        this.$message.info("请上传 jpg、jpeg、png 格式的图片");
        return false;
      }
    },
    // 处理上传成功后的文件
    handleAvatarSuccess(response) {
      // console.log(response);
      this.swiperForm.url = response.data || "";
    },
    // 关闭对话框重置表单
    dialogClose() {
      this.$refs.swiperFormRef.resetFields();
    },
    // 添加表单的预验证和提交到后台
    submitForm() {
      this.$refs.swiperFormRef.validate(async (valid) => {
        if (!valid) return;
        if (this.type === "add") {
          const { data: res } = await this.$http.post("/carousels", {
            carouselUrl: this.swiperForm.url,
            redirectUrl: this.swiperForm.link,
            carouselRank: this.swiperForm.sort,
          });
          // console.log(res);
          if (res.resultCode !== 200)
            return this.$message.error("添加表单失败");
          this.reload();
          this.addDialogVisible = false;
          this.$message.success("添加表单成功");
        } else {
          const {data: res} = await this.$http.put("/carousels", {
            carouselId: this.id,
            carouselUrl: this.swiperForm.url,
            redirectUrl: this.swiperForm.link,
            carouselRank: this.swiperForm.sort,
          });
          // console.log(res);
          if (res.resultCode !== 200) return this.$message.error('修改数据失败')
          this.reload();
          this.addDialogVisible = false;
          this.$message.success('修改数据成功')
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("getEditData", this.getEditData);
  },
};
</script>

<style lang="less" scoped>
.el-upload {
  text-align: center;
  i {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 28px;
    line-height: 100px;
    border: 1px solid #e9e9e9;
  }
}
.avatar {
  width: 100px;
  height: 100px;
}
</style>