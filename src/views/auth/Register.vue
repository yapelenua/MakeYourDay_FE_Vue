<template>
  <ElCard class="auth-card rounded-xl min-w-[320px] w-[450px] h-[400px] flex justify-center items-center">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <ElForm
      ref="registerFormRef"
      :model="registerForm"
      :rules="signUpRules"
      label-position="top"
      class="space-y-4 w-[250px]"
      @submit.prevent="register"
    >
      <ElFormItem label="Email" prop="email" required>
        <ElInput v-model="registerForm.email" type="email" clearable placeholder="Enter your email" />
      </ElFormItem>
      <ElFormItem label="Password" prop="password" required>
        <ElInput v-model="registerForm.password" type="password" clearable placeholder="Enter your password" />
      </ElFormItem>
      <ElFormItem label="Confirm Password" prop="confirmPassword" required>
        <ElInput
          v-model="registerForm.confirmPassword"
          type="password"
          clearable
          placeholder="Confirm your password"
        />
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

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { supabase } from '@/supabase'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const registerFormRef = ref()
const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const confirmPasswordValidator = (_: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error('Passwords do not match'))
  } else {
    callback()
  }
}

const signUpRules = reactive({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)],
  confirmPassword: [useRequiredRule(), { validator: confirmPasswordValidator, trigger: 'blur' }]
})

const router = useRouter()

const register = () => {
  registerFormRef.value?.validate(async (isValid: boolean) => {
    if (isValid) {
      try {
        const { email, password } = registerForm
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })

        if (error) throw error

        const { user } = data
        ElNotification({
          title: 'Success',
          message: 'User registered successfully, check your email',
          type: 'success'
        })
        console.log('User registered successfully:', user)
        router.push('/auth/login')
      } catch (error: any) {
        ElNotification({
          title: 'Error',
          message: `Registration error: ${error.message}`,
          type: 'error'
        })
        console.error('Registration error:', error)
      }
    } else {
      ElNotification({
        title: 'Error',
        message: 'Please fill in all fields',
        type: 'error'
      })
    }
  })
}
</script>
