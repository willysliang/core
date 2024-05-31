<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-02 17:36:08
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-02 17:38:09
 * @ Description: 富文本编辑器
 -->

<script setup lang="ts">
import { ref } from 'vue'
import Wangeditor from './Wangeditor.vue'

const editorValue = ref('')
</script>

<template>
  <Wangeditor v-model="editorValue" />
</template>
