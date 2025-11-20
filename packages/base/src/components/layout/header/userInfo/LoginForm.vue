<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-05-26 16:36:36
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 18:02:17
 * @ Description: 账号登录表单
 -->

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { Lock, Iphone, Message } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/user'

/**
 * 用户信息获取 & 校验
 */
const { login, checkLogin } = useUserStore()
onMounted(checkLogin)

/**
 * 表单校验规则
 */
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
  code: [
    {
      min: 6,
      max: 6,
      message: 'code length should be 6',
      trigger: 'blur',
    },
  ],
})

/**
 * 登录方式
 */
const loginType = ref<'password' | 'code'>('password')
const handleCheckLoginType = () => {
  loginType.value = loginType.value === 'password' ? 'code' : 'password'
}

/**
 * 登录表单提交
 */
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  phone: '',
  password: '',
  code: '',
})
const handleSubmit = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate((valid) => {
    if (valid) {
      login(loginForm.phone, loginForm.password)
    }
  })
}
</script>

<template>
  <div class="box-border px-4 min-h-10 select-none">
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
      <el-form-item v-if="loginType === 'password'" prop="password">
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
      <el-form-item v-if="loginType === 'code'" prop="code">
        <el-input
          v-model="loginForm.code"
          placeholder="手机验证码"
          autocomplete="off"
          clearable
          maxlength="6"
          :prefix-icon="Message"
        >
          <template #append>
            <el-button>发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div
          class="w-full cursor-pointer text-xs text-right text-blue-500 hover:text-red-500"
          @click="handleCheckLoginType"
        >
          切换{{ loginType === 'code' ? '密码' : '手机验证码' }}登录
        </div>
      </el-form-item>
    </el-form>

    <button
      class="button flex justify-center items-center w-full"
      @click="handleSubmit"
    >
      登录
    </button>
  </div>
</template>
