<template>
  <el-card class="box-card" shadow="always">
    <el-form ref="form" :model="info" label-width="120px">

      <el-form-item label="账号">
        <el-input v-model="info.id" :disabled="true" />
      </el-form-item>

      <el-form-item label="昵称">
        <el-input v-model="info.name" :disabled="!isEdit" />
      </el-form-item>

      <el-form-item label="博客空间名称">
        <el-input v-model="info.boke_name" :disabled="!isEdit" />
      </el-form-item>

      <el-form-item label="博客头像">

        <el-upload
          class="avatar-uploader"

          action="http://193.112.79.84:80/file-server/upload/img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="!isEdit"
        >
          <img v-if="info.avatar" :src="info.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>

      </el-form-item>

      <el-form-item label="博客副标题（为空则不显示）">
        <el-input v-model="info.index_one" :disabled="!isEdit" />
      </el-form-item>

      <el-form-item label="博客次标题1（为空则不显示）">
        <el-input v-model="info.index_two" :disabled="!isEdit" />
      </el-form-item>

      <el-form-item label="博客次标题2（为空则不显示）">
        <el-input v-model="info.index_three" :disabled="!isEdit" />
      </el-form-item>

    </el-form>
    <el-button @click="isEdit=!isEdit">{{ isEdit ? "取消" : '修改' }}</el-button>
    <el-button v-if="isEdit" @click="edit">确认</el-button>
  </el-card>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getInfo } from '@/api/user'
export default {
  name: 'Dashboard',
  data() {
    return {
      isEdit: false, // 是否可修改 true:可修改 false:不可修改
      info: {
        name: '',
        avatar: '',
        boke_name: '',
        id: ''
      }
    }
  },
  computed: {
    // ...mapGetters(['name', 'avatar', 'token'])
  },
  created() {
    getInfo().then((res) => {
      this.info = res.data
    }).catch((e) => {
      console.log(e)
    })
  },
  mounted() {
    // this.fw.addRouters()
    // this.fw.elAlert(this, { title: 'hello', text: '你确定要删除吗', type: 'warning' }).then(() => {
    //   console.log('选择了删除')
    // }).catch(() => {
    //   console.log('选择了取消')
    // })
  },
  methods: {
    edit() {
      this.$store.dispatch('user/updateInfo', this.info).then(() => {
        this.isEdit = !this.isEdit
      }).catch(() => {
        this.$message.error('错误')
      })
    },
    handleAvatarSuccess(res, file) {
      console.log('来到了这里')
      console.log(res)
      if (res.code === 200) {
        // this.info.avatar = URL.createObjectURL(file.raw)
        this.info.avatar = res.img
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG / png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return (isJPG || isPNG) && isLt2M
    }
  }
}
</script>

<style lang="scss">
.box-card {
  width: 96%;
  padding: 20px 20px;
  margin: 20px 2%;
  min-height: 600px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

</style>
