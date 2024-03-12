<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-12 18:00:40
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-15 21:17:56
 * @ Description: IndexedDB 本地数据库
 -->
<template>
  <div class="px-8">
    <div class="flex justify-between py-8">
      <el-input
        v-model="searchName"
        placeholder="请输入需要查询的姓名"
        style="width: 20rem"
      />
      <div>
        <el-button type="success" circle :icon="Plus" @click="addUser" />
        <el-button type="primary" circle :icon="Search" @click="getList" />
      </div>
    </div>
    <el-table :data="tableData" :border="true">
      <el-table-column v-for="(col, index) in tableCol" :key="index" :="col" />
      <el-table-column label="操作" :align="'center'">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="updateRow(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="deleteRow(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="showForm"
      width="500px"
      :title="isEdit ? '编辑' : '新增'"
    >
      <el-form ref="formRef" :model="userForm" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userForm.age" type="number" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="userForm.sex" class="w-full">
            <el-option value="男" />
            <el-option value="女" />
          </el-select>
        </el-form-item>
        <div class="flex justify-around">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button tpye="danger" @click="reset">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { add, readAll, update, remove, searchByName } from './goDB'
/* import {
  add,
  // read,
  readAll,
  update,
  remove,
  // getDB,
  searchByName,
} from './indexedDB' */

// table列
const tableCol = [
  { label: 'ID', prop: 'id', width: 60, align: 'center' },
  { label: '姓名', prop: 'name', width: 'auto', align: 'center' },
  { label: '年龄', prop: 'age', width: 'auto', align: 'center' },
  { label: '性别', prop: 'sex', width: 'auto', align: 'center' },
]
const tableData = ref<any[]>([])

const userForm = reactive({
  age: 0,
  name: '',
  sex: '男',
})

const formRef = ref()
const showForm = ref(false)
const isEdit = ref(false)
const editId = ref(null)

// 获取列表信息
const searchName = ref('')
const getList = async () => {
  if (searchName.value) {
    const res = await searchByName(searchName.value)
    tableData.value = [res]
  } else {
    const res = await readAll()
    tableData.value = res as any[]
  }
}

getList()

// 删除
const deleteRow = async (row) => {
  remove(row.id).then(() => {
    ElMessage.success('删除成功')
    getList()
  })
}

// 新增
const addUser = () => {
  isEdit.value = false
  showForm.value = true
  userForm.age = 0
  userForm.name = ''
  userForm.sex = ''
}

// 编辑
const updateRow = (row) => {
  isEdit.value = true
  showForm.value = true
  const { age, name, sex } = row
  Object.assign(userForm, { age, name, sex })
}

// 保存
const submitForm = async () => {
  const type = isEdit.value ? '编辑' : '新增'
  try {
    if (isEdit.value) {
      await update({ ...userForm, id: editId.value })
    } else {
      await add(userForm)
    }
    ElMessage.success(`${type}成功`)
    getList()
  } catch {
    ElMessage.error(`${type}失败`)
  }
  showForm.value = false
}

// 重置表单
const reset = () => formRef.value.resetFields()
</script>
