<template>
  <div class="dis-box">
    <el-dialog
      title="评论列表"
      :visible.sync="visible"
      :before-close="modalClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div v-for="(item) in discusses" :key="item.id" class="discuss">
        <div class="discuss-left">
          <img v-cloak :src="item.account_avatar">
        </div>
        <div class="discuss-right">
          <div class="dis-top">
            <!--名字-->
            <div class="name">
              <span v-cloak>{{ item.account_name }}</span>
            </div>
            <div v-cloak v-if="item.to_account_name" id="to">
              <span>回复</span>
            </div>
            <!--回复的人-->
            <div v-if="item.to_account_name" class="who">
              <span v-cloak>{{ item.to_account_name }}</span>
            </div>：
          </div>
          <div class="dis-bottom">
            <!--评论详情-->
            <div class="text">
              <span v-cloak>{{ item.text }}</span>
            </div>
          </div>
        </div>
        <div class="dis-del-box">
          <div>
            <el-button @click="goDiscuss(item.account_id)">回复</el-button>
            <el-button type="danger" @click="goDel(item.id)">删除</el-button>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goDiscuss('评论')">发表评论</el-button>
        <el-button type="danger" @click="modalClose">关闭</el-button>
      </div>

    </el-dialog>
    <send-discuss-dialog
      v-if="sendDiscussVisible"
      :visible.sync="sendDiscussVisible"
      :what="dwhat"
      :boke-id="id"
      :fetch-data="fetchData"
    />
  </div>
</template>

<script>
import { getDiscusses, delDiscuss } from '@/api/table'
import sendDiscussDialog from '../../components/sendDiscuss/index'
export default {
  name: 'DiscussDialog',
  components: {
    sendDiscussDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      discusses: [],
      sendDiscussVisible: false,
      dwhat: '评论'
    }
  },
  created() {
    getDiscusses({ id: this.id }).then(res => {
      this.discusses = res.data.discusses
    })
  },
  methods: {
    modalClose() {
      console.log('关闭')
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    fetchData() {
      getDiscusses({ id: this.id }).then(res => {
        this.discusses = res.data.discusses
      })
    },
    goDel(id) {
      // 打开确认删除弹框
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDiscuss({ id: id }).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          getDiscusses({ id: this.id }).then(res => {
            this.discusses = res.data.discusses
          })
        }).catch((e) => {
          console.error(e)
          this.$message({
            type: 'info',
            message: '删除失败'
          })
        })
      })
    },
    goDiscuss(x) {
      this.dwhat = x
      this.sendDiscussVisible = true
    }
  }
}
</script>

<style lang="scss">
.dis-box {
  .discuss {
    display: flex;
    width: 100%;
    border: 1px solid cadetblue;
    margin: 5px 0;
    padding: 5px;
    height: 100%;
  }
  .discuss-left {
    width: 15%;
    text-align: center;
    padding: 3px;
    height: 86px;
  }
  .discuss-left img {
    width: 80px;
    height: 80px;
    border: 3px solid skyblue;
    box-sizing: border-box;
  }

  .dis-top {
    display: flex;
    align-items: center;
    margin: 8px 0;
  }
  .discuss-box .dis-title #tip1 {
    font-size: 18px;
    font-weight: 600;
    margin: 10px 0;
  }
  .discuss-box .dis-title {
    width: 100%;
    position: relative;
  }
  .discuss-box .dis-title #tip2 {
    position: absolute;
    right: 100px;
  }

  .discuss-box .dis-title #tip3 {
    position: absolute;
    right: 10px;
  }

  .dis-top .name,
  .dis-top .who {
    font-size: 18px;
    font-weight: 200;
  }
  #to {
    margin: 0 5px;
  }
  .huifu {
    position: absolute;
    right: 10px;
  }
  .discuss-right {
    width: 50%;
    position: relative;
  }
  .dis-del-box {
    width: 35%;
    height: 86px;
    display: flex;
    align-items: center;
    div{
        width: 100%;
        text-align: center;
    }
  }
}
</style>
