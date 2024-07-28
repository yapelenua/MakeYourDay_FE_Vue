<template>
  <ElCard class="auth-card mim-w-[320px] w-[450px] h-[400px] flex justify-center items-center">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <ElForm
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
import 'element-plus/dist/index.css'
import { useRouter } from 'vue-router'

const registerForm = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const confirmPasswordValidator = (_: any, value: string, callback: any) => {
  if (value !== registerForm.value.password) {
    callback(new Error('Password does not match'))
  } else {
    callback()
  }
}

const signUpRules = reactive({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)],
  confirmPassword: [
    useRequiredRule(),
    { validator: confirmPasswordValidator, trigger: 'blur' }
  ]
})

const router = useRouter()

const register = async () => {
  try {
    const valid = await (this.$refs.form as any).validate()
    if (!valid) {
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: registerForm.value.email,
      password: registerForm.value.password
    })

    if (error) {
      throw error
    } else {
      const { user } = data
      alert('User registered successfully, check your email')
      console.log('User registered successfully:', user)
      router.push('/auth/login')
    }
  } catch (error) {
    alert('Registration error: ' + error.message)
    console.error('Registration error:', error)
  }
}
</script>
