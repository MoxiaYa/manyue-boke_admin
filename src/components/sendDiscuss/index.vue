<template>
  <div>
    <el-dialog v-cloak title="评论" :visible.sync="visible">
      <el-form :model="discuss">
        <el-form-item label="评论：">
          <el-input v-model="discuss.text" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div v-cloak slot="footer" class="dialog-footer">
        <el-button v-cloak @click="modalClose">取 消</el-button>
        <el-button v-cloak type="primary" @click="sendDis">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sendDiscuss } from '@/api/table'
export default {
  name: 'SendDiscussDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    what: {
      type: String,
      default: '评论'
    },
    bokeId: {
      type: Number,
      default: null
    },
    fetchData: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      discuss: {
        text: ''
      }
    }
  },
  methods: {
    modalClose() {
      console.log('关闭')
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    // 发表评论或回复
    sendDis() {
      if (this.what === '评论') {
        sendDiscuss({
          boke_id: this.bokeId,
          account_id: 1,
          text: this.discuss.text
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '评论成功!'
          })
          this.fetchData()
          this.modalClose()
        })
      } else {
        sendDiscuss({
          to_account_id: this.what,
          boke_id: this.bokeId,
          account_id: 1,
          text: this.discuss.text
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '评论成功!'
          })
          this.fetchData()
          this.modalClose()
        })
      }
    }
  }
}
</script>

<style>

</style>
