<template>
  <el-dialog
    :title="type == 'add' ? '添加商品' : '修改商品'"
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
      <el-form-item label="商品名称" prop="configName">
        <el-input v-model="ruleForm.configName"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="redirectUrl">
        <el-input v-model="ruleForm.redirectUrl"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" prop="goodsId">
        <el-input v-model="ruleForm.goodsId"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="configRank">
        <el-input v-model="ruleForm.configRank"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="getIndex">确 定</el-button>
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
    configType: {
      required: true,
    },
    reload: {
      required: true,
    }
  },
  data() {
    return {
      // 控制对话框的展示与隐藏
      addDialogVisible: false,
      ruleForm: {
        configName: "",
        redirectUrl: "",
        goodsId: "",
        configRank: "",
      },
      rules: {
        configName: [
          { required: "true", message: "商品名称不能为空", trigger: ["blur"] },
        ],
        redirectUrl: [
          { required: "true", message: "跳转地址不能为空", trigger: ["blur"] },
        ],
        goodsId: [
          { required: "true", message: "商品编号不能为空", trigger: ["blur"] },
        ],
        configRank: [
          { required: "true", message: "排序值不能为空", trigger: ["blur"] },
        ],
      },
      id: ''
    };
  },
  methods: {
    // 获取修改对话框表单的数据
    async getEditDialog(id) {
      const res = await this.$http.index.getEditDialog(id)
      // console.log(res);
      this.ruleForm.configName = res.data.configName
      this.ruleForm.configRank = res.data.configRank
      this.ruleForm.goodsId = res.data.goodsId
      this.ruleForm.redirectUrl = res.data.redirectUrl
      this.id = res.data.configId
    },
    // 关闭对话框，重置表单
    dialogClosed() {
      this.$refs.ruleFormRef.resetFields();
    },
    // 点击确定按钮，预验证并提交给后台
    getIndex() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
        if (this.ruleForm.configRank < 0 || this.ruleForm.configRank > 200) {
          this.$message.error("排序值不能小于 0 或大于 200");
          return;
        }
        if (this.type === "add") {
          let data = {
            ...this.ruleForm,
            configType: this.configType
          }
          await this.$http.index.getIndex(data);
          this.reload()
          this.addDialogVisible = false
          this.$message.success('添加商品成功')
        } else {
          let data = {
            ...this.ruleForm,
            configId: this.id,
            configType: this.configType
          }
          await this.$http.index.getIndexEdit(data)
          this.reload();
          this.addDialogVisible = false;
          this.$message.success('修改数据成功')
        }
      });
    },
  },
  mounted() {
    this.$bus.$on('getEditDialog', this.getEditDialog)
  },
};
</script>

<style>
</style>