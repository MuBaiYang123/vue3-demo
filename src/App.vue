<template>
  <div class="table-box">
    <!-- 标题 -->
    <div class="title">
      <h2>最简单的 CRUD DEMO</h2>
    </div>
    <!-- query -->
    <div class="query-box">
      <el-input class="input-text" v-model="queryInput" placeholder="输入姓名搜索" />
      <div class="button-list">
        <el-button type="primary" @click="handleDialog">增加</el-button>
        <el-button type="danger" @click="handleDelList" v-if="multipleSelection.length > 0">删除多选
        </el-button>
      </div>
    </div>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border ref="multipleTableRef"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleRowClick(scope.row)" style="color: #F56C6C">删除
          </el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
      <el-form :model="tableForm">
        <el-form-item label="姓名" :label-width="80">
          <el-input v-model="tableForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="80">
          <el-input v-model="tableForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="80">
          <el-input v-model="tableForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="80">
          <el-input v-model="tableForm.state" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="80">
          <el-input v-model="tableForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue';


// 数据
let queryInput = $ref()
let multipleSelection = $ref([])
let dialogFormVisible = $ref(false)

let tableForm = $ref({
  name: '',
  email: '',
  phone: '',
  state: '',
  address: ''
})

let tableData = $ref([
  {
    id: '1',
    name: 'Tom',
    email: '123@qq.com',
    phone: "12233",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2',
    name: 'Tom',
    email: '123@qq.com',
    phone: "12233",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '3',
    name: 'Tom',
    email: '123@qq.com',
    phone: "12233",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  }
])

let dialogType = $ref('add')
//方法
//编辑
const handleEdit = (row) => {
  dialogFormVisible = true
  dialogType = 'edit'
  tableForm = { ...row }
}
//删除一条
const handleRowClick = ({ id }) => {

  //1.通过id获取对应的索引值【数组下标】
  let index = tableData.findIndex(item => item.id === id)
  console.log(index)
  //2.通过索引值进行删除条目
  tableData.splice(index, 1)
}

//选中
const handleSelectionChange = (val) => {
  // multipleSelection = val
  multipleSelection = []
  val.forEach(item => {
    multipleSelection.push(item.id)
  })
}
//处理弹窗-新增
const handleDialog = () => {
  dialogFormVisible = true;
  dialogType = 'add'
  tableForm = {}
}

//新增成功--确认
const dialogConfirm = () => {
  dialogFormVisible = false;

  //1.判断新增，还是编辑
  if (dialogType === 'add') {
    //1.拿到数据
    //2.添加到table
    tableData.push({
      id: (tableData.length + 1).toString(),
      ...tableForm
    })
  } else {
    //1.获取到正在修改的这条索引值
    let index = tableData.findIndex(item => item.id === tableForm.id)
    //2.替换当前索引值对应的数据
    tableData[index] = tableForm

  }

}

//删除多条
const handleDelList = () => {
  multipleSelection.forEach(id => {
    handleRowClick({ id })
  })
  multipleSelection = []
}


</script>

<style scoped>
.table-box {
  width: 800px;
  margin: 200px auto;
}

.title {
  text-align: center;
}

.query-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-text {
  width: 200px;
}
</style>
