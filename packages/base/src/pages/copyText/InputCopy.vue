<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-21 15:38:28
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-22 09:55:57
 * @ Description: 长文本内容复制场景
 -->

<script setup lang="ts">
import { ref } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'
import { useI18nHooks } from '@/hooks/useI18n'

const { t } = useI18nHooks()

const inputContent = ref('')

/** 使用 execCommand 复制文本 */
const handleCopyAsExecCommand = (text) => {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  ElMessage.success(t('util.copySuccess'))
  document.body.removeChild(input)
}

/**
 * @description 使用 clipboardjs 复制文本
 * @bug 不能通过参数来传递复制的文本，否做会造成获取上一次事件的文本内容
 */
const handleCopyAsClipboardjs = (event: any) => {
  const clipboard = new Clipboard(event.target, {
    text: () => inputContent.value,
  })
  clipboard.on('success', () => {
    ElMessage.success(t('util.copySuccess'))
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    ElMessage.error(t('util.copyError'))
    clipboard.destroy()
  })
}
</script>

<template>
  <!-- 长文本内容复制场景 -->
  <el-row>
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <span class="text-base">长文本内容复制场景</span>
            <div class="flex-1 flex flex-row items-center justify-end">
              <el-button
                type="success"
                plain
                @click="handleCopyAsExecCommand(inputContent)"
              >
                复制(execCommand)
                <el-tooltip
                  effect="dark"
                  :content="$t('demo.copyText.execCommandCopyTextTip')"
                  placement="top-start"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </el-button>

              <el-button
                type="success"
                plain
                @click="handleCopyAsClipboardjs($event)"
              >
                复制(clipboardjs)
                <el-tooltip
                  effect="dark"
                  :content="$t('demo.copyText.clipboardjsCopyTextTip')"
                  placement="top-start"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </el-button>
            </div>
          </div>
        </template>

        <el-input
          v-model="inputContent"
          type="textarea"
          placeholder=""
          :autosize="{ minRows: 4, maxRows: 10 }"
          clearable
        />
      </el-card>
    </el-col>
  </el-row>
</template>
