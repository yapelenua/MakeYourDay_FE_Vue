<template>
  <div class="w-[50vw] h-[50vh] mx-auto p-6">
    <ElForm :model="kanbanForm" label-position="top" @submit.prevent="createKanban">
      <ElFormItem label="Board Name" required>
        <ElInput v-model="kanbanForm.name" placeholder="Enter board name" required clearable />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">Create Board</ElButton>
      </ElFormItem>
    </ElForm>

    <div
      v-if="user?.kanbans && user.kanbans.length > 0"
      class="w-full flex gap-[20px] flex-wrap justify-center"
    >
      <ElCard
        v-for="kanban in user.kanbans"
        :key="kanban.id"
        class="w-[200px] relative bg-white flex flex-col items-center p-4 shadow-md rounded-lg cursor-pointer"
        @click.stop="navigateToKanban(kanban.id)"
      >
        <el-icon
          class="absolute top-2 right-2"
          @click.stop="deleteKanban(kanban.id)"
        >
          <Delete />
        </el-icon>
        <p class="font-bold truncate w-full" :title="kanban.name">
          {{ kanban.name }}
        </p>
      </ElCard>
    </div>

    <ElEmpty v-else description="No boards available" class="max-w-[700px]" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGeneralStore } from '@/store/modules/general.store'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/supabase'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const generalStore = useGeneralStore()
const { user } = storeToRefs(generalStore)
const router = useRouter()
const kanbanForm = ref({
  name: ''
})

interface IKanban {
  id: string
  name: string
  data: []
}

const createKanban = async () => {
  try {
    if (!kanbanForm.value.name.trim()) {
      alert('Please enter a board name.')
      return
    }

    const newKanban = {
      id: uuidv4(),
      name: kanbanForm.value.name,
      data: []
    }

    if (user.value && user.value.kanbans) {
      user.value.kanbans.push(newKanban)

      const { error } = await supabase
        .from('profiles')
        .update({ kanbans: user.value.kanbans })
        .eq('id', user.value.id)

      if (error) throw error
    }

    kanbanForm.value.name = ''
    alert('Board created successfully.')
  } catch (error) {
    console.error('Error creating kanban:', error)
  }
}

const deleteKanban = async (kanbanId: string) => {
  try {
    if (user.value && user.value.kanbans) {
      const kanbanIndex = user.value.kanbans.findIndex((k: IKanban) => k.id === kanbanId)

      if (kanbanIndex !== -1) {
        user.value.kanbans.splice(kanbanIndex, 1)

        const { error } = await supabase
          .from('profiles')
          .update({ kanbans: user.value.kanbans })
          .eq('id', user.value.id)

        if (error) throw error

        alert('Board deleted successfully.')
      } else {
        console.error('Kanban not found.')
      }
    }
  } catch (error) {
    console.error('Error deleting kanban:', error)
  }
}

const navigateToKanban = (tableId: string) => {
  router.push({ name: 'kanban-detail', params: { id: tableId } })
}
</script>

<style scoped>
</style>
