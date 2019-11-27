<template>
  <div class="app-container">
    <div style="display: flex;margin-bottom:20px;">
      <div style="width:40%;">
        <!-- <el-input v-model="keywords" placeholder="部门名称" clearable style="width:50%;">
          <template slot="prepend">输入搜索</template>
        </el-input> -->
        <el-input
          v-model="keywords"
          placeholder="搜索博客标题"
          clearable
          style="width:50%;"
        />
        <el-button icon="el-icon-search" circle @click="search" />
        <el-button type="primary" @click="cancelSearch">取消</el-button>
      </div>
      <div style="width: 80%;padding-left: 10%;">
        <div style="float: right;">
          <el-button type="primary" @click="toAdd">新增</el-button>
          <el-button type="danger" @click="delMore">批量删除</el-button>
        </div>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="changeFun"
    >
      <el-table-column type="selection" width="50" />

      <el-table-column label="博客编号" align="center" width="100">
        <template slot-scope="scope" prop="id">{{ scope.row.id }}</template>
      </el-table-column>

      <el-table-column label="博客标题" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="博客简述" align="center">
        <template slot-scope="scope">{{ scope.row.sim_content }}</template>
      </el-table-column>

      <el-table-column class-name="博客内容" label="更新时间" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column> -->

      <el-table-column label="博客作者" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.author }}</template>
      </el-table-column>

      <el-table-column label="创建时间" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>

      <el-table-column align="center" label="是否启用" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_enabled" active-color="#13ce66" inactive-color="#ff4949" @change="changeEnabled(scope.row.id)" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <a class="blue_a" @click.prevent="openDiscuss(scope.row.id)">评论列表</a>
          <a class="blue_a" @click.prevent="update(scope.row.id)">修改</a>
          <a class="blue_a" @click.prevent="toDelete(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next, jumper"
      :total="num"
      :page-size="10"
      z
      :current-page.sync="nowPage"
      style="text-align:center;"
      @next-click="isSearch ? next(2) : next(1)"
      @prev-click="isSearch ? prev(2) : prev(1)"
      @current-change="go"
    />

    <update-dialog
      v-if="addOrderVisible"
      :id="tid"
      ref="orderAdd"
      :visible.sync="addOrderVisible"
      :title="ttitle"
      :sim_content="tsim_content"
      :content="tcontent"
      :author="tauthor"
      :is-enabled="tis_enabled"
      :flash="fetchData"
      :what="twhat"
    />
    <discuss-dialog
      v-if="discussesVisable"
      :id="did"
      ref="discuss"
      :visible.sync="discussesVisable"
    />

  </div>
</template>

<script>
import { getList, searchList, delList, delMoreList, editEnabled } from '@/api/table'

import updateDialog from '../../components/staff/index'
import discussDialog from '../../components/discuss/index'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    updateDialog, discussDialog
  },
  data() {
    return {
      allList: [], // 总的lits
      list: [], // 当前页面显示的list
      num: 0, //  一共有多少个
      listLoading: true,
      checkBoxData: [], //  选中的list
      addOrderVisible: false, // 修改弹框可见
      discussesVisable: false, // 评论弹框可见

      isSearch: false, // 是否正在搜索
      keywords: '', //  搜索关键字
      list2: [], // 搜索结果
      nowPage: 1, // 当前页数

      // 向评论弹框传值
      did: 0,

      // 向修改弹框的传值
      tid: '',
      ttitle: '',
      tsim_content: '',
      tcontent: '',
      tauthor: '',
      tis_enabled: 1,
      twhat: ''
    }
  },
  watch: {
    // 监视双向绑定的数据数组
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    changeEnabled(id) {
      var index = this.list.findIndex(item => {
        if (item.id === id) {
          return true
        }
      })
      var is_enabled = this.list[index].is_enabled
      var data = {
        id: id,
        is_enabled: is_enabled ? 1 : 0
      }
      editEnabled(data).then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    },
    goPage(page = 1) {
      // 第一页：0-9 2:10-19 3:20-29 总结：10*(page-1)-->10*page - 1
      var allList = this.allList
      this.list = allList.slice(10 * (page - 1), 10 * page)
    },
    fetchData(page) {
      this.listLoading = true
      getList().then(response => {
        this.allList = response.data
        this.num = (response.data.length)
        this.goPage(page)
        this.listLoading = false
      })
    },
    fetchSearch(page) {
      this.listLoading = true
      this.list = this.list2.slice((page - 1) * 10, page * 10)
    },
    changeFun(val) {
      this.checkBoxData = val
    },
    // 搜索
    search() {
      this.isSearch = true
      searchList({ title: this.keywords }).then(response => {
        this.list2 = response.data.bokes
        if (this.list2.length < 11) {
          this.list = this.list2
          this.listLoading = false
          this.num = response.data.bokes.length
        } else {
          this.fetchSearch(1)
          this.nowPage = 1
          this.num = response.data.bokes.length
          this.listLoading = false
        }
      })
    },
    // 取消搜索
    cancelSearch() {
      this.isSearch = false
      this.fetchData(1)
    },
    // 打开评论弹框
    openDiscuss(id) {
      this.did = id
      this.discussesVisable = true
    },
    // 打开修改弹框
    update(id) {
      var index = this.list.findIndex(item => {
        if (item.id === id) {
          return true
        }
      })
      this.ttitle = this.list[index].title
      this.tid = this.list[index].id
      this.tsim_content = this.list[index].sim_content

      this.tcontent = this.list[index].content
      this.tauthor = this.list[index].author
      this.tis_enabled = this.list[index].is_enabled

      this.twhat = '修改'
      this.addOrderVisible = true
    },

    // 下一页
    next(x) {
      this.nowPage++
      switch (x) {
        case 1: // 未在搜索
          console.log('未在搜索，下一页')
          this.goPage(this.nowPage)
          break
        case 2: // 还在搜索
          this.fetchSearch(this.nowPage)
      }
    },
    // 上一页
    prev(x) {
      this.nowPage--
      switch (x) {
        case 1:
          this.goPage(this.nowPage)
          break
        case 2:
          this.fetchSearch(this.nowPage)
      }
    },
    // 直接点击
    go(val) {
      this.nowPage = val
      this.goPage(this.nowPage)
    },
    // 打开确认删除弹框
    toDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delList(id)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fetchData(1)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '删除失败'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 打开添加弹框
    toAdd() {
      this.ttitle = ''
      this.tid = null
      this.tsim_content = ''

      this.tcontent = ''
      this.tauthor = ''
      this.tis_enabled = ''

      this.twhat = '添加'
      this.addOrderVisible = true
    },
    // 批量删除
    delMore() {
      console.log(this.checkBoxData.length)
      if (this.checkBoxData.length === 0) {
        // 未选择
        this.$message({
          showClose: true,
          message: '请先选择需要删除的数据',
          type: 'error'
        })
      } else {
        // 弹框
        this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var ids = []
            this.checkBoxData.forEach((item, i) => {
              ids.push(item.id)
            })
            console.log(ids)
            delMoreList(ids)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.fetchData(1)
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '删除失败'
                })
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>

<style>
.blue_a {
  color: #409eff;
  margin: 0 10px;
}

.blue_a:hover {
  text-decoration: underline;
}
</style>
