<template>
  <el-dialog
    :title="type == 'add' ? '添加分类' : '修改分类'"
    :visible.sync="addDialogVisible"
    width="30%"
    @close="dialogClosed"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      label-width="100px"
    >
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="ruleForm.categoryName"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="categoryRank">
        <el-input v-model="ruleForm.categoryRank"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="getCategory">确 定</el-button>
    </span>
  </el-dialog>
</template>
  
  <script>
export default {
  name: "AddIndexConfig",
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
      // 控制对话框的展示与隐藏
      addDialogVisible: false,
      // 分类等级
      categoryLevel: 1,
      // 父级id
      parentId: 0,
      // 表单显示的数据
      ruleForm: {
        categoryName: "",
        categoryRank: "",
      },
      rules: {
        categoryName: [
          { required: "true", message: "分类名称不能为空", trigger: ["blur"] },
        ],
        categoryRank: [
          { required: "true", message: "排序值不能为空", trigger: ["blur"] },
        ],
      },
      id: "",
    };
  },
  methods: {
    // 获取修改对话框表单的数据
    async getCategoryDialog(id) {
      const res = await this.$http.cate.getCategoryDialog(id)
      this.ruleForm.categoryName = res.data.categoryName;
      this.ruleForm.categoryRank = res.data.categoryRank;
      this.id = res.data.categoryId;
    },
    // 关闭对话框，重置表单
    dialogClosed() {
      this.$refs.ruleFormRef.resetFields();
    },
    // 点击确定按钮，预验证并提交给后台
    getCategory() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
        if (this.type === "add") {
          let data = {
            ...this.ruleForm,
            categoryLevel: this.categoryLevel,
            parentId: this.parentId
          }
          await this.$http.cate.getCategory(data)
          this.reload();
          this.addDialogVisible = false;
          this.$message.success("添加商品成功");
        } else {
          let data = {
            ...this.ruleForm,
            categoryLevel: this.categoryLevel,
            parentId: this.parentId,
            categoryId: this.id
          }
          await this.$http.cate.getCategoryEdit(data)
          this.reload();
          this.addDialogVisible = false;
          this.$message.success("修改数据成功");
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("getCategoryDialog", this.getCategoryDialog);
  },
};
</script>
  
  <style>
</style>