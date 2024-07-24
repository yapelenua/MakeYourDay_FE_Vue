<template>
  <ElCard class="register-card mim-w-[320px] w-[450px] h-[400px] flex justify-center items-center">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <ElForm :model="loginForm" label-position="top" class="space-y-4 w-[250px]" @submit.prevent="register">
      <ElFormItem label="Email" required>
        <ElInput v-model="registerForm.email" type="email" required clearable placeholder="Enter your email" />
      </ElFormItem>
      <ElFormItem label="Password" required>
        <ElInput v-model="registerForm.password" type="password" required clearable placeholder="Enter your password" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit" class="w-full">Register</ElButton>
      </ElFormItem>
      <div class="mt-4 text-center">
        <span>Already have an account? </span>
        <router-link to="/auth/login" class="primary">Sign in</router-link>
      </div>
    </ElForm>
  </ElCard>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import 'element-plus/dist/index.css'
import { router } from '@/router'

const registerForm = ref({
  email: '',
  password: ''
})

const register = async () => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email: registerForm.value.email,
      password: registerForm.value.password
    })
    if (error) {
      throw error
    } else {
      alert('User registered successfully, check your email')
      console.log('User registered successfully:', user)
      router.push('/auth/login')
    }
  } catch (error) {
    alert('Registration error: ' + error.message)
    console.error('Registration error:', error.message)
  }
}
</script>
<style scoped>
.register-card {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  animation: fadeInUp 1.5s ease-out;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
