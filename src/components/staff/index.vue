<template>
  <div>
    <el-dialog
      title="修改"
      :visible.sync="visible"
      :before-close="modalClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form">
        <el-form-item label="博客标题">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.sim_content" autocomplete="off" />
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="form.author" autocomplete="off" />
        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch v-model="form.is_enabled" autocomplete="off" />
        </el-form-item>
      </el-form>
      <wang :catch-data="getWangContent" :content="content" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalClose">取 消</el-button>
        <el-button type="primary" @click="todo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBoke, editList } from '@/api/table'
import wang from '../wang'
export default {
  name: 'UpdateDialog',
  components: {
    wang
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: '空'
    },
    simContent: {
      type: String,
      default: '空'

    },
    isEnabled: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: 'no'
    },

    author: {
      type: String,
      default: 'no'
    },
    flash: {
      type: Function,
      default: null
    },
    what: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        id: '',
        title: '',
        content: '',
        sim_content: '',
        author: '',
        is_enabled: 1
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.form.id = this.id
    this.form.title = this.title

    this.form.content = this.content
    this.form.sim_content = this.sim_content

    this.form.author = this.author
    this.form.is_enabled = this.isEnabled
    console.log(this.isEnabled)
  },

  methods: {
    modalClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    // 获取富文本编辑器内容
    getWangContent(content) {
      this.form.content = content
    },
    // 删除与修改
    todo() {
      console.log(this.what)
      switch (this.what) {
        case '修改':
          var data1 = {
            id: this.form.id,
            title: this.form.title,
            sim_content: this.form.sim_content,
            author: this.form.author,
            is_enabled: this.form.is_enabled ? 1 : 0,
            content: this.form.content
          }
          console.log(data1)
          editList(data1).then((res) => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.$emit('update:visible', false)
            this.flash(1)
          })
          break
        case '添加':
          var data = {
            title: this.form.title,
            sim_content: this.form.sim_content,
            author: this.form.author,
            is_enabled: this.form.is_enabled ? 1 : 0,
            content: this.form.content

          }
          addBoke(data).then(response => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$emit('update:visible', false)
            this.flash(1)
          })
          break
      }
    }
  }
}
</script>

<style>
</style>
