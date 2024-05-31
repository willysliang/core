<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-15 09:43:32
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-16 18:04:33
 * @ Description: excel
 -->

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import * as XLSX from 'xlsx'
import UploadExcel from './UploadExcel.vue'

interface ExcelTypes {
  tableData: {
    date: string
    name: string
    province: string
    city: string
    address: string
    zip: number
  }[]
  form: {
    fileName: string
    bookType: XLSX.BookType
  }
}

export default defineComponent({
  name: 'Excel',
  components: {
    UploadExcel,
  },
  setup () {
    const state = reactive<ExcelTypes>({
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
        },
      ],
      form: {
        fileName: 'excel名称',
        bookType: 'xlsx',
      },
    })

    const fileTypes = [
      {
        value: 'xlsx',
        code: 'xlsx',
      },
      {
        value: 'xls',
        code: 'xls',
      },
      {
        value: 'csv',
        code: 'csv',
      },
      {
        value: 'txt',
        code: 'txt',
      },
    ]

    const tableColumn = [
      {
        prop: 'date',
        fixed: true,
        width: '150',
        label: '日期',
      },
      {
        prop: 'name',
        fixed: false,
        width: '120',
        label: '姓名',
      },
      {
        prop: 'province',
        fixed: false,
        width: '120',
        label: '省份',
      },
      {
        prop: 'city',
        fixed: false,
        width: '120',
        label: '市区',
      },
      {
        prop: 'address',
        fixed: false,
        width: '400',
        label: '地址',
      },
      {
        prop: 'zip',
        fixed: false,
        width: '120',
        label: '邮编',
      },
    ]

    /** 导出 EXCEL 表 */
    const handleExportExcel = async (isArray: boolean) => {
      const formatJson = (filterVal: any[], jsonData: any[]) =>
        jsonData.map((v) => filterVal.map((j) => v[j]))
      const filterArrayProp = (arrayObj: any[], prop: string | number) => {
        const tempArray: any = []
        for (let i = 0; i < arrayObj.length; i++) {
          tempArray.push(arrayObj[i][prop])
        }
        return tempArray
      }

      try {
        const excel = await import('./useExportExcel')
        const table = state.tableData
        const tHeader = filterArrayProp(tableColumn, 'label')
        const filterVal = filterArrayProp(tableColumn, 'prop')
        const data = formatJson(filterVal, table)

        if (isArray) {
          excel.exportArrayJSONExcel([
            {
              multiHeader: [],
              merges: [],
              header: tHeader,
              data,
              filename: state.form.fileName,
              autoWidth: true,
              bookType: state.form.bookType,
              sheetName: '导出表1',
            },
            {
              multiHeader: [],
              merges: [],
              header: tHeader,
              data,
              filename: state.form.fileName,
              autoWidth: true,
              bookType: state.form.bookType,
              sheetName: '导出表2',
            },
          ])
        } else {
          excel.exportJsonToExcel({
            multiHeader: [],
            merges: [],
            header: tHeader,
            data,
            filename: state.form.fileName,
            autoWidth: true,
            bookType: state.form.bookType,
            sheetName: '导出表',
          })
        }
      } catch {}
    }

    const dialogVisible = ref<boolean>(false)

    return {
      ...toRefs(state),
      fileTypes,
      tableColumn,
      handleExportExcel,
      dialogVisible,
    }
  },
})
</script>

<template>
  <el-row :gutter="10" class="justify-end excel-row" style="width: 95%; margin: auto">
    <el-col :span="6">
      <el-button type="warning" plain class="w-full" @click="dialogVisible = true"> 上传文件 </el-button>
    </el-col>
    <el-col :span="6">
      <el-select
        v-model="form.bookType"
        clearable
        placeholder="请选择导出的文件类型"
        class="w-full"
      >
        <el-option
          v-for="item in fileTypes"
          :key="item.value"
          :label="item.value"
          :value="item.code"
        />
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-button
        type="success"
        plain
        class="w-full"
        @click="handleExportExcel(false)"
      >
        导出存在单个工作表的文件
      </el-button>
    </el-col>
    <el-col :span="6">
      <el-button
        type="success"
        plain
        class="w-full"
        @click="handleExportExcel(true)"
      >
        导出存在多个工作表的文件
      </el-button>
    </el-col>
  </el-row>

  <el-table
    :data="tableData"
    border
    highlight-current-row
    style="width: 95%; margin: auto; margin-top: 1rem"
  >
    <el-table-column
      v-for="item in tableColumn"
      :key="item.prop"
      :fixed="item.fixed"
      :prop="item.prop"
      :label="item.label"
    />
  </el-table>

  <el-dialog
      v-model="dialogVisible"
      :title="'上传EXCEL'"
      width="80%"
      center
      destroy-on-close
    >
    <UploadExcel />
  </el-dialog>
</template>
