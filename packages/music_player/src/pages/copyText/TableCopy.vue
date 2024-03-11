<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-21 15:38:28
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-22 10:00:04
 * @ Description: 多数据拼接复制场景
 -->

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { vClip } from './useClipboardDirective'

const tableData = reactive([
  {
    province: '上海市',
    city: '浦东新区',
    name: '王小虎1',
    address: '上海市普陀区金沙江路 1518 弄',
    edit: false,
  },
  {
    province: '上海市',
    city: '浦东新区',
    name: '王小虎2',
    address: '上海市普陀区金沙江路 1517 弄',
    edit: true,
  },
])

/**
 * @description  useXXX写法,代替mixin有待改进的地方
 * */
const checkEmpty = (row: any) => {
  const result = Object.keys(row).some((key) => row[key] === '')
  return result
}
const handleSave = (index: any, row: any): boolean => {
  if (checkEmpty(row)) {
    ElMessage.warning('保存前请完善信息！')
    return false
  }
  tableData[index].edit = false
  tableData[index] = row
  return true
}
/**
 * @description 新增一条记录
 * */
const handleAddRecord = () => {
  tableData.push({
    province: '',
    city: '',
    name: '',
    address: '',
    edit: true,
  })
}
</script>

<template>
  <!-- 多数据拼接复制场景 -->
  <el-row>
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <span class="text-base">多数据拼接复制场景</span>
            <el-button type="primary" plain round @click="handleAddRecord">
              + 新增记录
            </el-button>
          </div>
        </template>

        <el-table
          :data="tableData"
          style="width: 100%"
          fit
          highlight-current-row
        >
          <el-table-column label="姓名" width="180" fixed>
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top">
                <template #default>
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                </template>
                <template #reference>
                  <el-input v-if="scope.row.edit" v-model="scope.row.name" />
                  <el-tag v-else>{{ scope.row.name }}</el-tag>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
            <template #default="scope">
              <el-input v-if="scope.row.edit" v-model="scope.row.province" />
              <span v-else>{{ scope.row.province }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="city" label="市区">
            <template #default="scope">
              <el-input v-if="scope.row.edit" v-model="scope.row.city" />
              <span v-else>{{ scope.row.city }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="详细地址" show-overflow-tooltip>
            <template #default="scope">
              <el-input v-if="scope.row.edit" v-model="scope.row.address" />
              <span v-else>{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <el-button
                v-if="scope.row.edit"
                type="danger"
                plain
                @click="handleSave(scope.$index, scope.row)"
              >
                <el-icon><check /></el-icon>
                保存
              </el-button>
              <el-button
                v-else
                v-clip:copy="
                  `姓名:${scope.row.name},详细地址:${scope.row.address}`
                "
                type="success"
                plain
              >
                <el-icon><copy-document /></el-icon>
                复制
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
