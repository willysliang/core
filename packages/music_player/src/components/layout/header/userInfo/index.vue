<script setup lang="ts">
import { Lock, Iphone } from '@element-plus/icons-vue'
import { reactive, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import type { FormInstance, FormRules } from 'element-plus'
import { LoginQrcode } from './index'
import { avactor } from '@/assets/images'

const { isLogin, profile, showLogin } = storeToRefs(useUserStore())
const { login, checkLogin } = useUserStore()

onMounted(() => {
  checkLogin()
})

/***
 * 控制弹层模块切换
 */
const dialogCurrent = ref<number>(0)
const loginType = ['扫码登录', '手机验证码登录', '账号密码登录'] as const

/***
 * 表单信息
 * 表单提交
 */
interface IForm {
  phone: string
  password: string
}
const loginForm = reactive<IForm>({} as IForm)
const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  phone: [{ required: true, message: 'Please input phone', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please input pawword', trigger: 'blur' },
    {
      min: 3,
      max: 15,
      message: 'Password length should be 3 to 15',
      trigger: 'blur',
    },
  ],
})
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      login(loginForm.phone, loginForm.password)
    }
  })
}
</script>

<template>
  <div v-if="isLogin" class="text-sm flex flex-row items-center mx-2">
    <el-avatar
      :src="profile?.avatarUrl || avactor"
      class="mr-1 object-scale-down"
    />
    <span> {{ profile?.nickname ?? 'willysliang' }}</span>
  </div>
  <span v-else class="text-sm mx-2" @click="showLogin = true">点击登录</span>

  <el-dialog
    v-model="showLogin"
    append-to-body
    center
    draggable
    align-center
    destroy-on-close
  >
    <template #header="{ titleId, titleClass }">
      <div
        :id="titleId"
        class="flex flex-row justify-around items-center"
        :class="titleClass"
      >
        <div
          v-for="(item, index) in loginType"
          :key="index"
          :class="{
            'border-b-2 border-solid border-red-600': dialogCurrent === index,
            'px-4 py-2 text-lg': true,
          }"
          @click="dialogCurrent = index"
        >
          {{ item }}
        </div>
      </div>
    </template>
    <!-- 二维码登录 -->
    <LoginQrcode v-if="dialogCurrent === 0" />

    <div v-show="dialogCurrent === 1" class="max-w-sm m-auto h-60"></div>

    <div v-show="dialogCurrent === 2" class="max-w-sm m-auto h-60">
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            placeholder="手机号码"
            clearable
            :prefix-icon="Iphone"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="登录密码"
            show-password
            autocomplete="off"
            clearable
            maxlength="15"
            :prefix-icon="Lock"
          />
        </el-form-item>
      </el-form>
      <button
        class="button flex justify-center items-center w-full mt-5 py-5"
        @click="handleSubmit(loginFormRef)"
      >
        登录
      </button>
    </div>
  </el-dialog>
</template>
