<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-01 10:10:46
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-25 10:10:55
 * @ Description: 锁屏主界面
 -->

<script setup lang="ts">
import { useAppStore } from '@store/app'
import { Unlock, CloseWifi, Wifi, Api, RightTwo } from '@icon-park/vue-next'
import IconPark from '@comp/common/IconPark.vue'
import { reactive, toRefs } from 'vue'
import { useTimeHooks } from '@/hooks/useTime'
import { useOnlineHooks } from '@/hooks/useOnline'
import { useUserStore } from '@store/user'
import { ElLoading, ElMessage } from 'element-plus'
import { ChargeXiaomi, ChargeHuawei } from './index'
import { useBatteryHooks } from '@/hooks/useBattery'

const { setLockscreen } = useAppStore()

/** 获取本地时间 */
const { year, month, week, day, hour, minute, second } = useTimeHooks()

/** 检测系统当前网络状态 */
const { online } = useOnlineHooks()
/** 电池信息 */
const { battery, batteryStatus } = useBatteryHooks()

/** 随机显示充电组件 */
const randomChargeComp = Math.random() > 0.5 ? ChargeXiaomi : ChargeHuawei

/***
 * 用户信息
 */
/** 获取用户名 */
const { profile } = toRefs(useUserStore())

/** 登录的用户信息 */
const state = reactive({
  /** 展现登录框 */
  isShowLogin: false,
  /** 登录密码 */
  password: '',
})

/** 解锁登录 */
const handleShowLogin = (status: boolean) => (state.isShowLogin = status)

/** 登录 */
const handleLogin = () => {
  if (state.password === '') return ElMessage.warning('请填写登录密码！')
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
    setLockscreen(false)
    ElMessage.success('重新登录成功~')
  }, 1000)
}

/** 重新登录 */
const navToLogin = () => {
  setLockscreen(false)
}
</script>

<template>
  <div
    class="lockscreen"
    :class="{ unLockLogin: state.isShowLogin }"
    @mousedown.stop
    @contextmenu.prevent
  >
    <template v-if="!state.isShowLogin">
      <!-- 头部 - 解锁 -->
      <div class="lock-box">
        <IconPark
          :icon="Unlock"
          size="32"
          :stroke-width="3"
          class="hover-text"
          @click="handleShowLogin(true)"
        />
        <h5 class="cursor-pointer text-3xl mt-2">点击解锁</h5>
      </div>

      <!-- 随机显示充电组件 -->
      <component
        :is="randomChargeComp"
        :battery="battery"
        :battery-status="batteryStatus"
      />
    </template>

    <template v-if="state.isShowLogin">
      <div class="login-box">
        <el-avatar :size="90" class="mb-3">
          <template #default>
            <el-icon :size="70"><UserFilled /></el-icon>
          </template>
        </el-avatar>
        <div class="mb-3">{{ profile?.nickname ?? 'willysliang' }}</div>
        <div class="flex flex-row items-center justify-between h-10 mb-2">
          <el-input
            v-model="state.password"
            placeholder="请输入密码"
            autofocus
            clearable
            show-password
            class="flex-1 h-full"
          />
          <div class="bg-blue-500 p-2 h-full rounded-tr rounded-br">
            <IconPark
              :icon="RightTwo"
              size="24"
              theme="filled"
              :stroke-width="3"
              class="bg-blue-500 text-gray-200 h-full"
              @click="handleLogin"
            />
          </div>
        </div>
        <a class="text-white text-base mt-2" @click="navToLogin">重新登录</a>
      </div>
    </template>

    <template v-if="!state.isShowLogin">
      <!-- 本地时间 -->
      <div class="local-time">
        <span class="text-3xl mb-3 text-center">星期{{ week }}</span>
        <span class="text-3xl text-center mb-3"
          >{{ year }}年{{ month }}月{{ day }}号</span
        >
        <span class="text-6xl text-center"
          >{{ hour }} : {{ minute }} : {{ second }}</span
        >
      </div>

      <!-- 系统状态 -->
      <div class="computer-status">
        <IconPark
          :icon="online ? Wifi : CloseWifi"
          size="24"
          :stroke-width="3"
          class="hover-text text-white"
        />
        <IconPark
          :icon="Api"
          size="24"
          :stroke-width="3"
          class="hover-text text-white ml-4"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.lockscreen {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	overflow: hidden;
	color: white;
	background-color: black;
	font-family: helvetica;

	&.unLockLogin {
		background-color: rgb(25 28 34 / 78%);
		backdrop-filter: blur(7px);
	}

	// 头部解锁
	.lock-box {
		position: absolute;
		top: 9vh;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	// 登录
	.login-box {
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
	}

	// 本地时间
	.local-time {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 3rem;
		left: 2rem;
		cursor: pointer;
	}

	// 计算机状态
	.computer-status {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		position: absolute;
		right: 2rem;
		bottom: 3rem;
	}
}
</style>
