<template>
  <ElCard class="auth-card rounded-xl h-[400px] flex justify-center items-center">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <ElForm :model="loginForm" label-position="top" class="space-y-4 w-[250px]" @submit.prevent="login">
      <ElFormItem label="Email" required>
        <ElInput v-model="loginForm.email" type="email" required clearable placeholder="Enter your email" />
      </ElFormItem>
      <ElFormItem label="Password" required>
        <ElInput v-model="loginForm.password" type="password" required clearable placeholder="Enter your password" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit" class="w-full">Login</ElButton>
      </ElFormItem>
      <div class="mt-4 text-center">
        <span>Don`t have an account? </span>
        <router-link to="/auth/sign-up" class="primary">Sign up</router-link>
      </div>
    </ElForm>
  </ElCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput } from 'element-plus'
const { isHeaderAvaiable } = useGeneral()

const loginForm = ref({
  email: '',
  password: ''
})
const router = useRouter()

const login = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.value.email,
      password: loginForm.value.password
    })
    if (error) {
      throw error
    } else {
      console.log('User logged in successfully')
      router.push('/dashboard')
      isHeaderAvaiable.value = true
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: `${error}`,
      type: 'error'
    })
  }
}
</script>
