<template>
  <ElCard
    v-for="kanban in user.kanbans"
    :key="kanban.id"
    class="w-[200px] bg-white flex flex-col shadow-md rounded-lg cursor-pointer p-4"
    @click.stop="emitNavigateToKanban(kanban.id)"
  >
    <el-icon
      class="self-end cursor-pointer text-gray-500 hover:text-red-500"
      @click.stop="emitDeleteKanban(kanban.id)"
    >
      <Delete />
    </el-icon>
    <p class="truncate-multiline font-bold mt-2" :title="kanban.name">
      {{ kanban.name }}
    </p>
  </ElCard>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue'

const { user } = useGeneral()

const emit = defineEmits(['navigateToKanban', 'deleteKanban'])

const emitNavigateToKanban = (kanbanId: string) => {
  emit('navigateToKanban', kanbanId)
}

const emitDeleteKanban = (kanbanId: string) => {
  emit('deleteKanban', kanbanId)
}
</script>
