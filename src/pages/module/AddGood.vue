<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
      >
        <el-form-item label="商品分类" prop="name">
          <el-cascader
            :props="prop"
            @change="handleChange"
            style="width: 300px"
            :placeholder="defaultCate"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input
            style="width: 300px"
            v-model="ruleForm.goodsName"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input
            type="textarea"
            style="width: 300px"
            v-model="ruleForm.goodsIntro"
            placeholder="请输入商品简介(100字)"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="originalPrice">
          <el-input
            type="number"
            min="0"
            style="width: 300px"
            v-model="ruleForm.originalPrice"
            placeholder="请输入商品价格"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input
            type="number"
            min="0"
            style="width: 300px"
            v-model="ruleForm.sellingPrice"
            placeholder="请输入商品售价"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input
            type="number"
            min="0"
            style="width: 300px"
            v-model="ruleForm.stockNum"
            placeholder="请输入商品库存"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tag">
          <el-input
            style="width: 300px"
            v-model="ruleForm.tag"
            placeholder="请输入商品小标签"
          ></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="goodsSellStatus">
          <el-radio-group v-model="ruleForm.goodsSellStatus">
            <el-radio label="0">上架</el-radio>
            <el-radio label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品主图">
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
            <img
              v-if="ruleForm.goodsCoverImg"
              :src="ruleForm.goodsCoverImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情内容">
          <div ref="editor"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import editor from "wangeditor";
export default {
  name: "AddGood",
  data() {
    return {
      // 请求头
      token: window.sessionStorage.getItem("token"),
      // query携带的数据
      id: this.$route.query.id,
      categoryId: 0,
      ed: null,
      defaultCate: "",
      ruleForm: {
        goodsName: "",
        goodsIntro: "",
        originalPrice: "",
        sellingPrice: "",
        stockNum: "",
        tag: "",
        goodsSellStatus: "0",
        goodsCoverImg: "",
      },
      rules: {
        goodsName: [
          { required: "true", message: "请填写商品名称", trigger: ["blur"] },
        ],
        originalPrice: [
          { required: "true", message: "请填写商品价格", trigger: ["blur"] },
        ],
        sellingPrice: [
          { required: "true", message: "请填写商品售价", trigger: ["blur"] },
        ],
        stockNum: [
          { required: "true", message: "请填写商品库存", trigger: ["blur"] },
        ],
      },
      // 懒加载
      prop: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          // console.log(this);
          const { level = 0, value } = node;
          this.$http
            .get("/categories", {
              params: {
                pageNumber: 1,
                pageSize: 1000,
                categoryLevel: level + 1,
                parentId: value || 0,
              },
            })
            .then((res) => {
              const list = res.data.data.list;
              // console.log(res);
              const nodes = list.map((item) => ({
                value: item.categoryId,
                label: item.categoryName,
                leaf: level > 1,
              }));
              resolve(nodes);
            });
        },
      },
    };
  },
  methods: {
    handleChange(val) {
      this.categoryId = val[2] || 0
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
      this.ruleForm.goodsCoverImg = response.data || "";
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleFormRef.resetFields()
    },
    // 提交表单
    submitForm() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
        // 默认新增用 post 方法
        let ajax = this.$http.post;
        let params = {
          goodsCategoryId: this.categoryId,
          goodsCoverImg: this.ruleForm.goodsCoverImg,
          goodsDetailContent: this.ed.txt.html(),
          goodsIntro: this.ruleForm.goodsIntro,
          goodsName: this.ruleForm.goodsName,
          goodsSellStatus: this.ruleForm.goodsSellStatus,
          originalPrice: this.ruleForm.originalPrice,
          sellingPrice: this.ruleForm.sellingPrice,
          stockNum: this.ruleForm.stockNum,
          tag: this.ruleForm.tag,
        };
        if (this.id) {
          params.goodsId = this.id
          ajax = this.$http.put
        }
        const {data: res} = await ajax('/goods', params)
        if (res.resultCode !== 200) return this.$message.error(id ? '修改失败' : '添加失败')
        this.$message.success(this.id ? '修改成功' : '添加成功')
        this.$router.push('/good')
      });
    },
  },
  mounted() {
    const ed = new editor(this.$refs.editor)
    this.ed = ed;
    ed.config.showLinkImg = false;
    ed.config.showLinkImgAlt = false;
    ed.config.showLinkImgHref = false;
    ed.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    ed.config.uploadFileName = "file";
    ed.config.uploadImgHeaders = {
      token: this.token,
    };
    // 图片返回格式不同，需要自定义返回格式
    ed.config.uploadImgHooks = {
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        console.log("result", result);
        // result 即服务端返回的接口
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        if (result.data && result.data.length) {
          result.data.forEach((item) => insertImgFn(item));
        }
      },
    };
    ed.config.uploadImgServer =
      "http://backend-api-02.newbee.ltd/manage-api/v1/upload/files";
    ed.create();
    if (this.id) {
      // console.log(this);
      this.$http.get(`/goods/${this.id}`).then((response) => {
        const res = response.data.data;
        const { goods, firstCategory, secondCategory, thirdCategory } = res;
        this.ruleForm = {
          goodsName: goods.goodsName,
          goodsIntro: goods.goodsIntro,
          originalPrice: goods.originalPrice,
          sellingPrice: goods.sellingPrice,
          stockNum: goods.stockNum,
          goodsSellStatus: String(goods.goodsSellStatus),
          goodsCoverImg: goods.goodsCoverImg,
          tag: goods.tag,
        };
        this.categoryId = goods.goodsCategoryId;
        this.defaultCate = `${firstCategory.categoryName}/${secondCategory.categoryName}/${thirdCategory.categoryName}`;
        if (ed) {
          // 初始化商品详情 html
          ed.txt.html(goods.goodsDetailContent);
        }
      });
    }
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